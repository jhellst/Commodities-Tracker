import os
from flask import Flask, render_template
import requests
from dotenv import load_dotenv

app = Flask(__name__)
load_dotenv()

# Replace with your actual API key and endpoint
FMP_API_KEY = os.getenv('FMP_API_KEY')

# TODO: Adjust this to allow for more flexible API calls.
BASE_URL = f"https://financialmodelingprep.com/api/v3/" # TODO: Adjust and use later for other routes.
COMMODITIES_URL = f"https://financialmodelingprep.com/api/v3/symbol/available-commodities?apikey={FMP_API_KEY}"


@app.route('/')
def index():
    # Fetch commodities data
    FULL_URL = BASE_URL + "symbol/available-commodities?apikey=" + FMP_API_KEY


    response = requests.get(FULL_URL)
    # response = requests.get(COMMODITIES_URL)


    commodities = response.json()  # Assuming it returns a JSON list of commodities
    print("commodities: ", commodities)

    # specific_commodity_symbol = "GCUSD"  # Symbol for Gold Futures
    # specific_commodity = next((item for item in commodities if item["symbol"] == specific_commodity_symbol), None)
    # print("specific_commodity: ", specific_commodity)

    # Pass the commodities data to the frontend
    return render_template('index.html', commodities=commodities)



@app.route('/commodities/historical/<string:symbol>')
def get_historical_prices(symbol):

    # Fetch commodities data

    FULL_URL = BASE_URL + "historical-price-full/" + symbol + "?apikey=" + FMP_API_KEY

    URL = "https://financialmodelingprep.com/api/v3/historical-price-full/ZOUSX?apikey=rvd4e9wGk2OIWqd3iQof3hRyiWy2j5bY"
    # response = requests.get(FULL_URL)
    response = requests.get(URL)



    historical_data = response.json()  # Assuming it returns a JSON list of commodities
    print("Historical Data: ", historical_data)

    return render_template('historical.html', data=historical_data)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
