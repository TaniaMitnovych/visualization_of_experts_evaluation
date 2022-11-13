import React, {useState,useEffect} from 'react';
import Coeffs from '../../textInfo/coeffs.json';
import Criteria from '../../textInfo/creteria.json';
import './CoeffsSection.css';
const CoeffsSection = (props) => {
  let [coeffs, setCoeffs] = useState([...Coeffs]);
  let classEl = "", value;
  
  function calcAverage(e) {
    let i = Number(e.target.dataset.i);
    let j = Number(e.target.dataset.j);
    let collection = document.querySelectorAll(".row" + (i + 1));
    let sum = 0;
    for (let k = 0; k < collection.length; k++) {
      sum += Number(collection[k].value);
    }
    value = sum / 4;
    window.coeffAver[i]=value.toFixed(2);
    classEl = "rowN" + (i + 1);
    document.querySelector("." + classEl).value = value.toFixed(2);
    setCoeffs([...coeffs, coeffs[i][j] = e.target.value]);
    let event=new Event("probChanged");
    document.dispatchEvent(event);

  }
  useEffect(() => {
    let event=new Event("changedMatrix");
    event.detail={"matrix":coeffs};
    document.dispatchEvent(event);
    setAverage();
    window.coeffs=[...coeffs];
  }, [coeffs])

  function setAverage() {
    window.coeffAver=[]
    for (let i = 1; i <= 10; i++) {
      let collection = document.querySelectorAll(".row" + (i));
      let sum = 0;
      for (let k = 0; k < collection.length; k++) {
        sum += Number(collection[k].value);
      }
      value = sum / 4;
      window.coeffAver.push(value.toFixed(2));
      classEl = "rowN" + (i);
      let el=document.querySelector("." + classEl);
      el.value = value.toFixed(2);
    }
  }
  function createTable(coeffs) {
    return (
      Criteria.map((item, i) => {
        return (
          <tr>
            <td>{item}</td>
            {((i) => {
              let colArr = [];
              for (let j = 0; j < 4; j++) {
                colArr.push(
                  <td >
                    <input className={`row${i}`} type="number" min="0" max="10" step="1" data-i={i - 1} data-j={j} value={coeffs[i - 1][j]} onChange={calcAverage} />
                  </td>
                )
              }
              return colArr;
            })(i + 1)
            }
            <td >
              <input className={`average rowN${i + 1}`} type="number" min="0" max="10" step="1" />
            </td>
          </tr>
        )
      })
    )
  }
  return (
    <div className='coeffs-section table-div'>
      <table>
        <tr>
          <th>Критерії</th>
          <th>Експерт галузі</th>
          <th>Експерт зручності</th>
          <th>Експерт з програмування</th>
          <th>Потенційні користувачі</th>
          <th>Середнє значення</th>
        </tr>
        {
          createTable(coeffs)
        }
      </table>

    </div>
  );
};

export default CoeffsSection;