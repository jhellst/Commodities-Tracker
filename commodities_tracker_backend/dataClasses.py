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
    """Class to hold all historical info for a single commodity."""
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

@dataclass
class CustomIndexInfo:
    """Class to hold info for a single custom index."""
    id: int
    name: str

@dataclass
class CommoditiesInCustomIndexInfo:
    """Through table - connects a custom index with all commodities added to that index."""
    id: int
    name: str