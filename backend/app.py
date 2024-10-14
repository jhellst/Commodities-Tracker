import os
from flask import Flask, render_template, request, redirect, session, render_template, url_for, g, flash
import requests
from dotenv import load_dotenv
from flask_cors import CORS, cross_origin

import json
from flask import jsonify
from models import db, connect_db, User, Commodity, CommodityHistoricalData, CommoditiesFollowedByUser, CustomIndex, CommoditiesInCustomIndex
from dataClasses import CommodityInfo, CommodityHistoricalInfo, CustomIndexInfo
from datetime import datetime, timedelta, timezone
from helpers import get_commodities_list, update_historical_prices

from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_jwt_extended import create_access_token
from flask_jwt_extended import create_refresh_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required


load_dotenv()
CURR_USER_KEY = "curr_user"

# basedir = os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__)
CORS(app, supports_credentials=True)
# CORS(app, resources={r"/*": {"origins": "*"}})

bcrypt = Bcrypt(app)

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['DATABASE_URI']
# app.config['SQLALCHEMY_DATABASE_URI'] =\
#         'postgresql:///' + os.path.join(basedir, os.getenv())

app.config['CORS_HEADERS'] = 'Content-Type'
app.config['SQLALCHEMY_ECHO'] = True
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = True
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

app.config['SECRET_KEY'] = os.environ['SECRET_KEY']
app.config["JWT_SECRET_KEY"] = os.environ['SECRET_KEY']
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)

jwt = JWTManager(app)

@jwt.expired_token_loader
def my_expired_token_callback(expired_token, date):
    # print("Hello from jwt_expired_decorator")
    return redirect(url_for('logout_user'))


connect_db(app)

##############################################################################
# User signup/login/logout

@app.route("/register", methods=["POST"])
def register_user():
    username = request.json["username"]
    password = request.json["password"]

    user_exists = User.query.filter_by(username=username).first() is not None

    if user_exists:
        return jsonify({"error": "User already exists"}), 409
    hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")

    new_user = User(username=username, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    user_info = {"username": username, "user_id": new_user.id}
    access_token = create_access_token(identity=json.dumps(user_info))
    # print("access_token@@@register", access_token)
    return jsonify(access_token=access_token)


@app.route("/login", methods=["POST"])
def login_user():
    username = request.json.get("username", None)
    password = request.json.get("password", None)

    user = User.query.filter_by(username=username).one_or_none()

    # Checks if user exists.
    if user is None:
        return jsonify({"error": "Unauthorized"}), 401

    # Checks if the password is the same as hashed password
    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Unauthorized"}), 401

    # access_token = create_refresh_token(identity=username)
    user_info = {"username": username, "user_id": user.id}
    access_token = create_access_token(identity=json.dumps(user_info))
    # print("access_token@@@login", access_token)
    return jsonify(access_token=access_token)


@app.route("/token/<username>", methods=["GET"])
@jwt_required()
def get_token(username):
    user_info = User.query.filter_by(username=username).one_or_none()
    access_token = create_access_token(identity=json.dumps(user_info))
    # print("current_user@token", current_user)
    return jsonify(access_token=access_token)


# TODO: Figure out this route with jwt library.
@app.route("/logout", methods=["POST"])
def logout_user():
    # print("session@@logout", session)
    session.pop("user_id")
    return "200"


@app.route("/users", methods=["GET"])
def get_all_users():
    user_id = session["user_id"]

    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    all_users = User.query.all()
    users = [{"user_id": user.id, "username": user.username}
             for user in all_users]

    return jsonify(users)


@app.route("/users/<int:user_id>", methods=["GET"])
def get_user(user_id):

    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    user = User.query.filter_by(id=user_id).one_or_none()
    print("user!", user)

    if not user:
        return jsonify({"error": "Unauthorized"}), 401

    return jsonify({
        "username": user.username,
        "user_id": user.id
    })



# Routes below -> just to see content of backend API calls pre-db update.


@app.route('/')
def index():
    # Fetch commodities data (list of all commodities being tracked in the database)
    """Fetch a list of all tracked commodities via the FMP API."""

    commodities = get_commodities_list()
    print(commodities)
    return render_template('index.html', commodities=commodities)


@app.route('/check_db')
def check_db():
    """A simple route to check database connectivity and data retrieval."""
    try:
        # Query the database for any data (e.g., from the 'CommodityHistoricalData' table)
        # test_data = db.session.query(CommodityHistoricalData).first()
        print("check_db@try")
        test_data = db.session.query(CommodityHistoricalData).first()

        if test_data:
            # If data is found, return it as a simple response
            return f"Database connection successful. First record: {test_data.ticker_symbol}"
        else:
            # If no data is found, indicate that the table is empty
            return "Database connection successful, but no data found."

    except Exception as e:
        # If an error occurs, return the error message
        return f"Database connection failed: {e}"



@app.get("/commodities")
@cross_origin()
def get_all_commodities():
    """Returns basic info for each commodity in the database."""

    all_commodities = db.session.query(
        Commodity.ticker_symbol, Commodity.name, Commodity.currency, Commodity.stock_exchange_symbol, Commodity.stock_exchange_name)

    commodities = [CommodityInfo(commodity.ticker_symbol, commodity.name, commodity.currency, commodity.stock_exchange_symbol, commodity.stock_exchange_name) for commodity in all_commodities]
    return commodities


# Route to retrieve a commodities' historical prices via the database.
@app.get("/commodities/<string:symbol>")
@cross_origin()
def get_historical_prices(symbol):
    """Returns historical data for a specified commodity in the database."""

    raw_historical_data = db.session.query(CommodityHistoricalData).filter_by(ticker_symbol=symbol).all()
    historical_data = [CommodityHistoricalInfo(day.ticker_symbol, day.date, day.open_price, day.high_price, day.low_price, day.close_price, day.adj_close_price, day.volume, day.amount_change, day.percentage_change, day.vwap) for day in raw_historical_data]
    return historical_data


@app.get("/custom_index")
@cross_origin()
def get_all_custom_indices():
    """Returns all custom indices for the specified user."""

    # TODO: Make this flexible based on user.
    all_custom_indices = db.session.query(CustomIndex.id, CustomIndex.name)

    custom_indices = [CustomIndexInfo(index.id, index.name) for index in all_custom_indices]
    return custom_indices


@app.get("/custom_index/<int:id>")
@cross_origin()
def get_custom_index(id):
    """Returns a list of commodities included in a specified custom index."""
    custom_index_commodities = CommoditiesInCustomIndex.query.filter_by(custom_index_id=id).join(Commodity, CommoditiesInCustomIndex.commodity_ticker_symbol == Commodity.ticker_symbol).all()

    commodities = [CommodityInfo(commodity.ticker_symbol, commodity.name, commodity.currency, commodity.stock_exchange_symbol, commodity.stock_exchange_name) for commodity in custom_index_commodities]
    return commodities





# TODO:
# Add routes to create an index, and to add/remove comoddities from that index.
# Add a route to retrieve a user's custom indices.
# Add a route to view data for a specified list of commodities and indices, and to filter the data by date.


# Error route.
@app.errorhandler(404)
def page_not_found(e):
    """Show 404 NOT FOUND page."""

    return render_template('404.html'), 404



# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=5001)
