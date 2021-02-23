import React from 'react'
import { Card, CardContent, Typography } from "@material-ui/core";
import "./InfoBox.css";
import { prettyPrintStat } from "./util";

const InfoBox = ({ title, isRed, isPurple, isGreen, isBlue, cases, total, active, updated, population,...props }) => {

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
        <h6 className={
          `infoBox__cases ${!isRed && !isPurple && !isBlue && "infoBox__cases--green"}
          ${isPurple && "infoBox__cases--purple"} ${isBlue && "infoBox__cases--blue"}` 
          }>
          {total!==undefined ? prettyPrintStat(total)+' Total' : 'No data'} 
        </h6>
        <Typography className="infoBox__little" color="textSecondary">
          {population!==undefined && cases!==undefined  ? prettyPrintStat(total*100/population)+'% population' : 'No data'} 
        </Typography>
        <Typography className="infoBox__little" color="textPimary">
          {cases!==undefined ? '+'+prettyPrintStat(cases)+' new Today' : 'No data'}  
        </Typography>
        <Typography className="infoBox__little" color="textSecondary">
          {updated!==undefined ? new Date(updated).toUTCString() : 'No data'} 
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox