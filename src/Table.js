 
import React from 'react'
import './Table.css'
import { sortData } from "./util";

//import numeral from 'numeral'

const Table = ({ data, casesType }) => {
   
const sortedData = sortData(data, casesType);
console.log(data)

  return (
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
  );
}

export default Table;
