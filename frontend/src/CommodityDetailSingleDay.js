import { useContext, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
// import "./stylesheets/LeagueList.css";
// import "./stylesheets/SimpleLeagueList.css";

// import CommoditiesListRow from "./CommoditiesListRow";


// function SimpleLeagueList({ user, leagues, title }) {
function CommodityDetailSingleDay({ adjClose, amountChange, close, date, high, low, open, percentChange, tickerSymbol, volume, vwap }) {

  return (

    <tr className="CommodityDetailSingleDay">
      <td>{tickerSymbol}</td>
      <td>{adjClose}</td>
      <td>{amountChange}</td>
      <td>{close}</td>
      <td>{date}</td>
      <td>{high}</td>
      <td>{low}</td>
      <td>{open}</td>
      <td>{percentChange}</td>
      <td>{volume}</td>
      <td>{vwap}</td>
    </tr>

  );
};


export default CommodityDetailSingleDay;
