from app import db
from models import User, Commodity, CommodityHistoricalData, CommoditiesFollowedByUser
# from flask_bcrypt import Bcrypt
from helpers import get_commodities_list, update_historical_prices


# bcrypt = Bcrypt()

# 1) Get commodities list and insert data into db.

# Add list of Commodities to database.

# commodities_list = get_commodities_list()
test_data = db.session.query(CommodityHistoricalData).first()

print(test_data, test_data.date, test_data.adj_close_price)