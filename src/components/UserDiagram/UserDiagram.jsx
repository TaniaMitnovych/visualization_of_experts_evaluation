import React, { useEffect } from 'react';
import { useState } from 'react';
import Criteria from '../../textInfo/creteria.json';
import AnyChart from 'anychart-react';
import './UserDiagram.css';
const UserDiagram = () => {
  let isChartCreated=false;
  const [degrees, setDegrees] = useState([...calcDegrees()]);
  let sum = 0;
  function calcDegrees() {
    let deg = [];
    for (let i = 0; i < 10; i++) {
      deg.push((window.coeffs[i][3] / getCoeffsSum(3) * 360).toFixed(3))
    }
    return deg;
  }
  function getCoeffsSum(column) {
    let sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += Number(window.coeffs[i][column]);
    }
    return sum;
  }
  function getDataForDiagram(){
    let data=[];
    let sum=0;
    data.push(
      {x:Number(sum),value:window.complexIndicator[0][3]}
    )
    for(let i=0;i<9;i++){
      data.push(
        {x:sum+=Number(degrees[i]),value:window.complexIndicator[i+1][3]}
      )
    }
    window.data4=data;
    return data;
  }
  function setDiagram() {
    if(!isChartCreated){
      window.anychart.onDocumentReady(function () {
        var data_1 = getDataForDiagram();
        console.log(getDataForDiagram())
        var chart = window.anychart.polar();
        var series1 = chart.polygon(data_1);
        chart.xScale().maximum(360);
        chart.xScale().ticks().interval(10);
        chart.yScale().ticks().interval(10);
        chart.container("user");

        chart.draw();
      });
      isChartCreated=true;
    }
    
  }
  useEffect(()=>{
    setDiagram();
  },[])
  return (
    <div className='user-diagram table-div'>
      <table>
        <tr>
          <th>Критерії оцінювання</th>
          <th>Усередненні оцінки</th>
          <th>Зміна кута</th>
          <th>Кут</th>
        </tr>
        {
          Criteria.map((criteria, i) => {
            return (
              <tr>
                <td>{Criteria[i]}</td>
                <td>{window.complexIndicator[i][3]}</td>
                <td>{degrees[i]}</td>
                <td>{(() => { let res = sum.toFixed(2); sum += Number(degrees[i]); return res })()}</td>
              </tr>
            )
          })
        }
      </table>
      <div id='user'></div>
    </div>
  );
};

export default UserDiagram;