from app import db
from models import User, Commodity, CommodityHistoricalData, CommoditiesFollowedByUser
from flask_bcrypt import Bcrypt
from helpers import get_commodities_list, update_historical_prices


bcrypt = Bcrypt()

db.drop_all()
db.create_all()


# 1) Get commodities list and insert data into db.

# Add list of Commodities to database.
commodities_list = get_commodities_list()
print("commodities_list: ", commodities_list)
# {'symbol': 'ESUSD', 'name': 'E-Mini S&P 500', 'currency': 'USD', 'stockExchange': 'CME', 'exchangeShortName': 'COMMODITY'}

for commodity in commodities_list:
    current_commodity = Commodity(ticker_symbol=commodity.symbol, name=commodity.name, currency=commodity.currency, stock_exchange_symbol=commodity.stockExchange, stock_exchange_name=commodity.exchangeShortName)
#   - Then, save the data for each commodity into the db.
    db.session.add(current_commodity)
    db.session.commit()

    # 2) For each commodity in the initial list, retrieve the historical data and update the db accordingly.
    current_commodity_historical_price_data = update_historical_prices(current_commodity.ticker_symbol)

    for one_day_price_data in current_commodity_historical_price_data:
        cur_day_price_data = CommodityHistoricalData(ticker_symbol=current_commodity.ticker_symbol,
                                                     date=one_day_price_data.date, open_price=one_day_price_data.open,
                                                     close_price=one_day_price_data.close, high_price=one_day_price_data.high,
                                                     low_price=one_day_price_data.low, adj_close_price=one_day_price_data.adjClose,
                                                     volume=one_day_price_data.volume, amount_change=one_day_price_data.change,
                                                     percentage_change=one_day_price_data.changePercent, vwap=one_day_price_data.vwap)
        db.session.add(cur_day_price_data)
        db.session.commit()


# [{'date': '2024-09-09', 'open': 350.5, 'high': 362.5, 'low': 349.75, 'close': 359.5, 'adjClose': 359.5, 'volume': 744, 'unadjustedVolume': 744, 'change': 9, 'changePercent': 2.57, 'vwap': 355.56, 'label': 'September 09, 24', 'changeOverTime': 0.0257}, {'date': '2024-09-08', 'open': 350.5, 'high': 359, 'low': 340.75, 'close': 353.75, 'adjClose': 353.75, 'volume': 900, 'unadjustedVolume': 900, 'change': 3.25, 'changePercent': 0.92724679, 'vwap': 351.17, 'label': 'September 08, 24', 'changeOverTime': 0.0092724679}]

    # db.session.add_all([])








# Logic to populate database with all historical commodities data
#   - Will populate the database with every commodity pulled from high-level API request.
#       - From start of historical data, the pulled data will contain (for each commodity):
#           - Date, Open Price, High, Low, Close, Adj. Close, Volume, Change ($), Change (%), VWAP (Volume Weighted Average Price)


# First, pull all commodities from the high-level route.
#   - Store all of the information for each commodity.

# Second, for each commodity that was added to Commodities table, we will pull historical data (from earliest available date until today's date) and save in a separate db table.
#   - Store all information in a separate db table
#   - Join this table using id or symbol as the foreign key.




# Another db table needed to contain "custom_commodities_index" -> This will group commodities together in a single index to track.
#   Will have all included commodities, will also have type of distribution ($ or %).




# Chron job (not part of seeding):
#   - Every day, update the database to include the most recent day of trading for each commodity we are tracking.




# Frontend Steps:
#   - Create React frontend with routing and tokens properly shared across frontend/backend.