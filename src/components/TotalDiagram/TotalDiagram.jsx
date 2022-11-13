import React, {useEffect} from 'react';
import './TotalDiagram.css';
const TotalDiagram = () => {
  let isChartCreated=false;
  function setDiagram() {
    if(!isChartCreated){
      window.anychart.onDocumentReady(function () {
        var data1 = window.data1;
        var data2 = window.data2;
        var data3 = window.data3;
        var data4 = window.data4;
        var chart = window.anychart.polar();
        chart.legend().enabled(true).align('center');
        var series1 = chart.polygon(data1);
        series1.name('Діаграма для експерта галузі').markers(false);
        var series2 = chart.polygon(data2);
        series2.name('Діаграма для експерта з usability').markers(false);
        var series3 = chart.polygon(data3);        
        series3.name('Діаграма для експерта з програмування').markers(false);
        var series4 = chart.polygon(data4);
        series4.name('Діаграма для потенційних користувачів').markers(false);

        chart.xScale().maximum(360);
        chart.xScale().ticks().interval(10);
        chart.yScale().ticks().interval(10);
        chart.container("total");

        chart.draw();
      });
      isChartCreated=true;
    }
    
  }
  useEffect(()=>{
    setDiagram();
  },[])
  return (
    <div className='total-diagram'>
      <div id="total"></div>
    </div>
  );
};

export default TotalDiagram;