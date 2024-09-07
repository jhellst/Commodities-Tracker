from app import db
from models import db, User, Commodity, CommodityHistoricalData, CommoditiesFollowedByUser

from flask_bcrypt import Bcrypt




# Logic to populate database with all historical commodities data
#   - Will populate the database with every commodity pulled from high-level API request.
#       - From start of historical data, the pulled data will contain (for each commodity):
#           - Date, Open Price, High, Low, Close, Adj. Close, Volume, Change ($), Change (%), VWAP (Volume Weighted Average Price)


# First, pull all commodities from the high-level route.
#   - Store all of the information for each commodity.

# Second, for each commodity, we will pull historical data (from earliest available date until today's date).
#   - Store all information in a separate db table
#   - Join this table using id or symbol as the foreign key.

# Another db table needed to contain "custom_commodities_index" -> This will group commodities together in a single index to track.
#   Will have all included commodities, will also have type of distribution ($ or %).

# Chron job (not part of seeding):
#   - Every day, update the database to include the most recent day of trading for each commodity we are tracking.




# Frontend Steps:
#   - Create React frontend with routing and tokens properly shared across frontend/backend.