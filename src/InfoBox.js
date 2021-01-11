import React from 'react'
import { Card, CardContent, Typography } from "@material-ui/core";
import "./InfoBox.css";

const InfoBox = ({ title, isRed, isPurple, isGreen, cases, total, active,  ...props }) => {
  console.log(title, active);
  return (
    <Card
      onClick={props.onClick}
      className={
        `infoBox ${active && "infoBox--selected"} 
        ${isRed && "infoBox--red"} 
        ${isGreen && "infoBox--green"}
        ${isPurple && "infoBox--purple"}` 
      }>
      <CardContent>
        <Typography color="textPrimary" gutterBottom>
          {title}
        </Typography>
        <h2 className={
          `infoBox__cases ${!isRed && !isPurple && "infoBox__cases--green"}
          ${isPurple && "infoBox__cases--purple"}`
          }>
          {cases}
        </h2>
        <Typography className="infoBox__total" color="textPrimary">
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox