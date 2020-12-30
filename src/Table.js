 
import React from 'react'
//import './Table.css'
//import numeral from 'numeral'

function Table({ countries }) {
    console.log(countries )
  return (
    <div className="table">
      {countries.map(({country, cases, i}) => (
        <tr key={country}>
          <td>{country}</td>
          <td><strong>{cases}</strong></td>
        </tr>
      ))}
    </div>
  );
}

export default Table;

// <strong>{numeral(country.cases).format("0,0")}</strong>