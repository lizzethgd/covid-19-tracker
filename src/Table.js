 
import React from 'react'
import './Table.css'
//import numeral from 'numeral'

const Table = ({ countries }) => {
    console.log(countries )
  return (
    <div className='table'>
    <table >
      {countries.map(({country, cases, flag}) => (
        <tbody key={country}>
        <tr >
          <td><img src={flag}  width='40' height='30'/> {country}</td>
          <td><strong>{cases}</strong></td>
        </tr>
        </tbody>
      ))}
    </table>
    </div>
  );
}

export default Table;
