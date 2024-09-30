from dataclasses import dataclass
import datetime



@dataclass
class CommodityInfo:
    """Class to hold info for a commodity."""
    ticker_symbol: str
    name: str
    currency: str
    stock_exchange_symbol: str
    stock_exchange_name: str
    # last_updated_date: datetime.datetime

@dataclass
class CommodityHistoricalInfo:
    """Class to hold historical all info for a single commodity."""
    ticker_symbol: str
    date: datetime.datetime
    open: float
    high: float
    low: float
    close: float
    adj_close: float
    volume: int
    amount_change: float
    percent_change: float
    vwap: float

