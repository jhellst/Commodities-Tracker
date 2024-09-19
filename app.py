import os
from flask import Flask, render_template, request, redirect, session, render_template, url_for, g, flash
import requests
from dotenv import load_dotenv
from flask_cors import CORS, cross_origin


import json
from models import db, connect_db, User, Commodity, CommodityHistoricalData, CommoditiesFollowedByUser
# from dataClasses import
from datetime import datetime, timedelta, timezone
from helpers import get_commodities_list, update_historical_prices

from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
# from flask_jwt_extended import create_access_token
# from flask_jwt_extended import create_refresh_token
# from flask_jwt_extended import get_jwt_identity
# from flask_jwt_extended import jwt_required


load_dotenv()
CURR_USER_KEY = "curr_user"

app = Flask(__name__)
CORS(app, supports_credentials=True)

# bcrypt = Bcrypt(app)

app.config['CORS_HEADERS'] = 'Content-Type'
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['DATABASE_URI']
app.config['SQLALCHEMY_ECHO'] = True
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = True
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

app.config['SECRET_KEY'] = os.environ['SECRET_KEY']
# app.config["JWT_SECRET_KEY"] = os.environ['SECRET_KEY']
# app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)

# jwt = JWTManager(app)

# @jwt.expired_token_loader
# def my_expired_token_callback(expired_token, date):
#     # print("Hello from jwt_expired_decorator")
#     return redirect(url_for('logout_user'))


connect_db(app)


# Routes below -> just to see content of backend API calls pre-db update.

@app.route('/')
def index():
    # Fetch commodities data (list of all commodities being tracked in the database)
    """Fetch a list of all tracked commodities via the FMP API."""

    commodities = get_commodities_list()
    print(commodities)
    return render_template('index.html', commodities=commodities)



@app.route('/commodities/historical/<string:symbol>')
def get_historical_prices(symbol):
    """Fetch historical data for the provided ticker symbol."""

    historical_data = update_historical_prices(symbol)
    print(historical_data)

    # TODO: REMOVE
    # historical_data_2 = db.session.query(CommodityHistoricalData).filter(CommodityHistoricalData.ticker_symbol == symbol)
    # print("historical_data_2@", historical_data_2)


    return render_template('historical.html', data=historical_data)


# TODO: Fix this route to test database retrieval.

# Route to retrieve a commodities' historical prices via the database.
# @app.route('/commodities/<string:symbol>')
@app.route('/commodities/historical_2/<string:symbol>')
def get_historical_prices_from_db(symbol):
    """Fetch historical data for the provided ticker symbol."""

    print("SYMBOL!", symbol)
    print("PRE historical_data_2!")
    historical_data = db.session.query(CommodityHistoricalData).filter(CommodityHistoricalData.ticker_symbol == symbol).all()

    if not historical_data:
        # Handle the case where no data is found for the symbol
        print(f"No historical data found for symbol: {symbol}")
        return render_template('historical_2.html', symbol=symbol, data=None)

    print("historical_data_2!", historical_data[0])

    return render_template('historical_2.html', symbol=symbol, data=historical_data)




@app.route('/check_db')
def check_db():
    """A simple route to check database connectivity and data retrieval."""
    try:
        # Query the database for any data (e.g., from the 'CommodityHistoricalData' table)
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





# Error route.
@app.errorhandler(404)
def page_not_found(e):
    """Show 404 NOT FOUND page."""

    return render_template('404.html'), 404



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
