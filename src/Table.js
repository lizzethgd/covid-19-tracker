 
import React from 'react'
import './Table.css'
//import numeral from 'numeral'

const Table = ({ countries }) => {
    console.log(countries )
  return (
    <div className='table'>
    <table >
      {countries.map(({country, cases, i}) => (
        <tbody key={country}>
        <tr >
          <td>{country}</td>
          <td><strong>{cases}</strong></td>
        </tr>
        </tbody>
      ))}
    </table>
    </div>
  );
}

export default Table;

// <strong>{numeral(country.cases).format("0,0")}</strong>