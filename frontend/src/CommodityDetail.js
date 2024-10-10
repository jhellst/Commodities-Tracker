import { useContext, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
// import "./stylesheets/LeagueList.css";
// import "./stylesheets/SimpleLeagueList.css";
import CommoditiesListRow from "./CommoditiesListRow";
import CommodityDetailSingleDay from "./CommodityDetailSingleDay";



// function SimpleLeagueList({ user, leagues, title }) {
function CommodityDetail({ title, commodities, getCommodityHistoricalData }) {
  // const [isLoaded, setIsLoaded] = useState(false);
  const [commodityTickerSymbol, setCommodityTickerSymbol] = useState(useParams().ticker_symbol);
  const [commodityHistoricalData, setCommodityHistoricalData] = useState();

  useEffect(() => {
    async function setCurrentCommodityHistoricalData() {
      const historicalData = await getCommodityHistoricalData(commodityTickerSymbol);
      setCommodityHistoricalData(historicalData);
    }
    setCurrentCommodityHistoricalData();
  }, commodityTickerSymbol);

  console.log(commodityHistoricalData);

  return (

    <div className="CommodityDetail">

      <h1 className="CommodityDetail-title">{title}</h1>
      <table className="CommodityDetailTable">
        <thead>
          <tr>
            <th className="CommodityDetail-Column"></th>

            <th scope="col" className="CommodityDetail-Column"></th>
            <th scope="col" className="CommodityDetail-Column">Ticker Symbol</th>
            <th scope="col" className="CommodityDetail-Column">Adjusted Close</th>
            <th scope="col" className="CommodityDetail-Column">Amount Change</th>
            <th scope="col" className="CommodityDetail-Column">Close</th>
            <th scope="col" className="CommodityDetail-Column">Date</th>
            <th scope="col" className="CommodityDetail-Column">High</th>
            <th scope="col" className="CommodityDetail-Column">Low</th>
            <th scope="col" className="CommodityDetail-Column">Open</th>
            <th scope="col" className="CommodityDetail-Column">Percent Change</th>
            <th scope="col" className="CommodityDetail-Column">Volume</th>
            <th scope="col" className="CommodityDetail-Column">VWAP</th>

          </tr>
        </thead>

        <tbody>

          {commodityHistoricalData && commodityHistoricalData.map((day, idx) => (
            <CommodityDetailSingleDay key={idx} adjClose={day.adj_close} amountChange={day.amount_change} close={day.close} date={day.date} high={day.high} low={day.low} open={day.open} percentChange={day.percent_change} tickerSymbol={day.ticker_symbol} volume={day.volume} vwap={day.vwap} />
          ))}

        </tbody>

      </table>
    </div>

  );
}

export default CommodityDetail;
