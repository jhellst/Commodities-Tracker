import os
from flask import Flask, render_template
# from flask import Flask, jsonify, request, flash, redirect, session, render_template, url_for, g
import requests
from dotenv import load_dotenv

from flask_cors import CORS, cross_origin
import json
# from models import db, connect_db, User, Team, League, StatisticsForLeague, TeamsFollowedByUser, LeaguesFollowedByUser
# from dataClasses import LeagueInfo, TeamInfoForLeague
# from soccerScraper import retrieveLeagueInfo, TeamInfo
from datetime import datetime, timedelta, timezone



app = Flask(__name__)
CORS(app, supports_credentials=True)
load_dotenv()

# Replace with your actual API key and endpoint
FMP_API_KEY = os.getenv('FMP_API_KEY')

# TODO: Adjust this to allow for more flexible API calls.
BASE_URL = f"https://financialmodelingprep.com/api/v3/" # TODO: Adjust and use later for other routes.
COMMODITIES_URL = f"https://financialmodelingprep.com/api/v3/symbol/available-commodities?apikey={FMP_API_KEY}"


@app.route('/')
def index():
    # Fetch commodities data (list of all commodities being tracked in the database)
    url = BASE_URL + "symbol/available-commodities?apikey=" + FMP_API_KEY
    response = requests.get(url)

    commodities = response.json()  # Assuming it returns a JSON list of commodities
    print("commodities: ", commodities)

    # Pass the commodities data to the frontend
    return render_template('index.html', commodities=commodities)



@app.route('/commodities/historical/<string:symbol>')
def get_historical_prices(symbol):
    """Fetch historical data for the provided ticker symbol."""

    url = BASE_URL + "historical-price-full/" + symbol + "?apikey=" + FMP_API_KEY
    response = requests.get(url)
    historical_data = response.json()

    return render_template('historical.html', data=historical_data)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
