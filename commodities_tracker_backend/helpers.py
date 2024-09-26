import requests
import os
from dotenv import load_dotenv

load_dotenv()

FMP_API_KEY = os.getenv('FMP_API_KEY')
BASE_URL = os.getenv('FMP_BASE_URL')


def get_commodities_list():
    base_url = BASE_URL
    fmp_api_key = FMP_API_KEY
    url = base_url + "symbol/available-commodities?apikey=" + fmp_api_key
    response = requests.get(url)

    commodities = response.json()  # Assuming it returns a JSON list of commodities
    # print("commodities: ", commodities)
    return commodities


def update_historical_prices(symbol):
    base_url = BASE_URL
    fmp_api_key = FMP_API_KEY
    url = base_url + "historical-price-full/" + symbol + "?apikey=" + fmp_api_key
    response = requests.get(url)

    historical_data = response.json()
    # print("historical data: ", historical_data)

    return historical_data
