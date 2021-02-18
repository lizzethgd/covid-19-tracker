import React from 'react'
import { Card, CardContent, Typography } from "@material-ui/core";
import "./InfoBox.css";
import { sortData, prettyPrintStat } from "./util";
import numeral from "numeral";

const InfoBox = ({ title, isRed, isPurple, isGreen, isBlue, cases, total, active, updated,...props }) => {

  return (
    <Card
      onClick={props.onClick}
      className={
        `infoBox ${active && "infoBox--selected"} 
        ${isRed && "infoBox--red"} 
        ${isGreen && "infoBox--green"}
        ${isPurple && "infoBox--purple"}
        ${isBlue && "infoBox--blue"}` 
      }>
      <CardContent>
        <Typography color="textPrimary" gutterBottom>
          {title}
        </Typography>
        <h2 className={
          `infoBox__cases ${!isRed && !isPurple && !isBlue && "infoBox__cases--green"}
          ${isPurple && "infoBox__cases--purple"} ${isBlue && "infoBox__cases--blue"}` 
          }>
         {total!==undefined ? numeral(total).format("0.0a")+' Total' : 'No data'} 
        </h2>
        <Typography className="infoBox__total" color="textPrimary">
        {cases!==undefined ? prettyPrintStat(cases)+' Today' : 'No data'}  
        </Typography>
        <Typography className="infoBox__total" color="textSecondary">
        {updated!==undefined ? new Date(updated).toUTCString() : 'No data'} 
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox