# import os
from flask_sqlalchemy import SQLAlchemy
import datetime
import uuid
from flask_bcrypt import Bcrypt
from config import ApplicationConfig

bcrypt = Bcrypt()
db = SQLAlchemy()


def connect_db(app):
    """Connect database to Flask app."""
    app.config.from_object(ApplicationConfig)

    app.app_context().push()
    db.app = app
    db.init_app(app)


class User(db.Model):
    """User in the system."""

    __tablename__ = 'users'

    id = db.Column(
        db.Integer,
        primary_key=True,
    )

    username = db.Column(
        db.String(30),
        nullable=False,
        unique=True,
    )

    password = db.Column(
        db.String,
        nullable=False,
    )

    commodities_followed_by_user = db.relationship(
        'Commodity', secondary='commodities_followed_by_users', backref='users', order_by='Commodity.ticker_symbol')

    def __repr__(self):
        return f"<User #{self.id}: {self.username}, {self.password}>"

    @classmethod
    def signup(cls, username, password):
        """Sign up user. Hashes password and adds user to session."""

        hashed_pwd = bcrypt.generate_password_hash(password).decode('UTF-8')

        user = User(
            username=username,
            password=hashed_pwd
        )

        db.session.add(user)
        return user

    @classmethod
    def authenticate(cls, username, password):
        """Find user with `username` and `password`.

        This is a class method (call it on the class, not an individual user.)
        It searches for a user whose password hash matches this password
        and, if it finds such a user, returns that user object.

        If this can't find matching user (or if password is wrong), returns
        False.
        """

        user = cls.query.filter_by(username=username).one_or_none()

        if user:
            is_auth = bcrypt.check_password_hash(user.password, password)
            if is_auth:
                return user

        return False





class Commodity(db.Model):
    """Store information for an individual commodity represented by a symbol."""

    __tablename__ = "commodities"

    # Using ticker_symbol as primary key for now, might consider changing to use id later.
    # id = db.Column(
    #     db.Integer,
    #     primary_key=True,
    #     autoincrement=True
    # )
    ticker_symbol = db.Column(
        db.String,
        primary_key=True,
        nullable=False
    )
    name = db.Column(
        db.String,
        nullable=False
    )
    currency = db.Column(
        db.String,
        nullable=True
    )
    stock_exchange_symbol = db.Column(
        db.String,
        nullable=True
    )
    stock_exchange_name = db.Column(
        db.String,
        nullable=True
    )

    # def __init__(self, ticker_symbol, name, currency, stock_exchange_symbol, stock_exchange_name):
    #     self.ticker_symbol = ticker_symbol
    #     self.name = name
    #     self.currency = currency
    #     self.stock_exchange_symbol = stock_exchange_symbol
    #     self.stock_exchange_name = stock_exchange_name


    # users_following_commodity = db.relationship(
    #     'User', secondary='commodities_followed_by_users', backref='commodities')

    # @classmethod
    # def get_commodity(cls, ticker_symbol):
    #     """Gets a commodity and all of its basic info."""
    #     commodity = db.session.query(Commodity).filter(Commodity.ticker_symbol == ticker_symbol)
    #     return commodity



class CommodityHistoricalData(db.Model):
    """Standings and other statistics from a single commodity."""

    __tablename__ = "commodities_historical_data"

    id = db.Column(
        db.Integer,
        primary_key=True,
        autoincrement=True
    )

    # Commodity ticker symbol.
    ticker_symbol = db.Column(
        db.String,
        db.ForeignKey("commodities.ticker_symbol", ondelete="CASCADE"),
        primary_key=False,
    )

    # Date of data record for selected commodity.
    date = db.Column(
        db.Date,
        primary_key=False,
        nullable=False
    )

    # Opening Price for the day.
    open_price = db.Column(
        db.Float,
        nullable=False
    )

    # Closing Price for the day.
    close_price = db.Column(
        db.Float,
        nullable=False
    )

    # High Price for the day.
    high_price = db.Column(
        db.Float,
        nullable=False
    )

    # Low Price for the day.
    low_price = db.Column(
        db.Float,
        nullable=False
    )

    # Adjusted Close Price for the day.
    adj_close_price = db.Column(
        db.Integer,
        nullable=False
    )

    # Trading Volume for the day.
    volume = db.Column(
        db.Integer,
        nullable=False
    )

    # Adjusted Close Price for the day.
    amount_change = db.Column(
        db.Float,
        nullable=False
    )

    # Adjusted Close Price for the day.
    percentage_change = db.Column(
        db.Float, # TODO: Possibly will want to adjust to decimal type.
        nullable=False
    )

    # VWAP (Volume Weighted Average Price) for the day.
    vwap = db.Column(
        db.Float,
        nullable=False
    )


class CustomIndex(db.Model):
    """Stores the name and id of a custom index created by a user."""

    __tablename__ = "custom_indices"

    id = db.Column(
        db.Integer,
        primary_key=True,
        autoincrement=True
    )

    name = db.Column(
        db.String,
        unique=True,
        nullable=False
    )

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False
    )



class CommoditiesInCustomIndex(db.Model):
    """Through table, joins a custom index with every commodity being tracked in that custom index."""

    __tablename__ = "commodities_in_custom_indices"

    id = db.Column(
        db.Integer,
        primary_key=True,
        autoincrement=True
    )

    custom_index_id = db.Column(
        db.Integer,
        db.ForeignKey("custom_indices.id", ondelete="CASCADE"),
        nullable=False
        # primary_key=True,
    )

    commodity_ticker_symbol = db.Column(
        db.String,
        db.ForeignKey("commodities.ticker_symbol", ondelete="CASCADE"),
        nullable=False
        # primary_key=False,
    )

    # user_id = db.Column(
    #     db.Integer,
    #     db.ForeignKey("users.id", ondelete="CASCADE"),
    #     primary_key=True,
    # )





class CommoditiesFollowedByUser(db.Model):
    """Stores the id of each team that is being followed by a user."""

    __tablename__ = "commodities_followed_by_users"

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id", ondelete="CASCADE"),
        primary_key=True,
    )

    ticker_symbol = db.Column(
        db.String,
        db.ForeignKey("commodities.ticker_symbol", ondelete="CASCADE"),
        primary_key=True,
    )

    @classmethod
    def follow_commodity(cls, user_id, ticker_symbol):
        """Follows a commodity to be included in the user's custom page."""
        commodity_follow = CommoditiesFollowedByUser(user_id=user_id, ticker_symbol=ticker_symbol)

        db.session.merge(commodity_follow)
        db.session.commit()
        return commodity_follow.ticker_symbol

    @classmethod
    def unfollow_commodity(cls, user_id, ticker_symbol):
        """Unfollows a team that was included in the user's custom team page."""
        # print("unfollow_team", team_id, user_id)
        commodity_unfollow = CommoditiesFollowedByUser.query.filter(CommoditiesFollowedByUser.ticker_symbol == ticker_symbol).filter(
            CommoditiesFollowedByUser.user_id == user_id)

        commodity_unfollow.delete()
        db.session.commit()

        return {
            "Deleted": True,
            user_id: user_id,
            ticker_symbol: ticker_symbol
        }


# Next steps for refining database functionality:
#   - Add another table to enable the creation of custom indices within which a user can select and add/remove different commodities.
#   - User needs to be able to 1) create custom indices and 2) toggle on/off different commodities and indices in your custom page.