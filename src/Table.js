 
import React from 'react'
import './Table.css'
import { sortData } from "./util";

const Table = ({ data, casesType }) => {
   
const sortedData = sortData(data, casesType);
  return (
   <>
    <h3>Live {casesType} by Country</h3>
     <br/> 
    <div className='table'> 
    <table >
      {sortedData.map((country) => (
        <tbody key={country.country}>
        <tr >
          <td><img src={country.flag}  width='40' height='30' alt={country.country} /> {country.country}</td>
          <td><strong>{country[casesType]}</strong></td>
        </tr>
        </tbody>
      ))}
    </table>
    </div>
    </>
  );
}

export default Table;
