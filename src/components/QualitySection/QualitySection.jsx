import React from 'react';
import ExpertsImportance from '../../textInfo/expertsImportance.json';
import Criteria from '../../textInfo/creteria.json';
import { useState } from 'react';
import { useEffect } from 'react';
import './QualitySection.css';
const QualitySection = (props) => {
  const [complexIndicator, setComplexIndicator] = useState(getComplexIndicators());

  useEffect(() => {
    window.complexIndicator = [...complexIndicator];
  }, [complexIndicator])
  function getComplexIndicators() {
    let complexIndicators = [];
    for (let i = 0; i < 10; i++) {
      let complexArr = [];
      for (let j = 0; j < 3; j++) {
        complexArr.push(window.coeffs[i][j] * window.expertsMarks[i][j])
      }
      complexArr.push((window.coeffs[i][3] * window.usersMarks[i][20]).toFixed(2));
      complexIndicators.push(complexArr);
    }
    return complexIndicators;
  }
  function getImportanceTable() {
    return (
      <table className='importance-table'>
        <tr>
          <th>Типи експертів</th>
          <th>Абсолютний коефіцієнт вагомості</th>
          <th>Відносний коефіцієнт вагомості</th>
        </tr>
        <tr>
          <td>Експерт галузі</td>
          <td>{ExpertsImportance[0]}</td>
          <td>{ExpertsImportance[0] / 10}</td>
        </tr>
        <tr>
          <td>Експерт юзабіліті</td>
          <td>{ExpertsImportance[1]}</td>
          <td>{ExpertsImportance[1] / 10}</td>
        </tr>
        <tr>
          <td>Експерт з програмування</td>
          <td>{ExpertsImportance[2]}</td>
          <td>{ExpertsImportance[2] / 10}</td>
        </tr>
        <tr>
          <td>Потенційні користувачі</td>
          <td>{ExpertsImportance[3]}</td>
          <td>{ExpertsImportance[3] / 10}</td>
        </tr>
      </table>
    )
  }
  function getAverageIndicator(index) {
    let importanceSum = 0;
    let indicatorSum = 0;
    for (let i = 0; i < ExpertsImportance.length; i++) {
      importanceSum += (Number(ExpertsImportance[i]) / 10);
      indicatorSum += Number(ExpertsImportance[i]) / 10 * Number(complexIndicator[index][i]);
    }
    return (indicatorSum / importanceSum).toFixed(2);
  }
  function getComplexResTable() {
    return (
      <table>
        <tr>
          <td>№</td>
          <td>Критерії оцінювання якості ПЗ</td>
          <td>Оцінки експертів галузі</td>
          <td>Оцінки експертів юзабіліті</td>
          <td>Оцінки експертів програмування</td>
          <td>Оцінки користувачів</td>
          <td>Усереднені значення показника</td>
          <td>Усередненні значення оцінок</td>
        </tr>
        <tr>
          <td></td>
          <td>Коефіцієнти вагомості</td>
          <td>{ExpertsImportance[0] / 10}</td>
          <td>{ExpertsImportance[1] / 10}</td>
          <td>{ExpertsImportance[2] / 10}</td>
          <td>{ExpertsImportance[3] / 10}</td>
          <td></td>
          <td></td>
        </tr>
        {
          Criteria.map((criteria, i) => {
            return (
              <tr>
                <td>{i + 1}</td>
                <td>{Criteria[i]}</td>
                {
                  (() => {
                    let tdArr = [];
                    for (let j = 0; j <= 3; j++) {
                      tdArr.push(
                        <td>{complexIndicator[i][j]}</td>
                      )
                    }
                    tdArr.push(
                      <td>{getAverageIndicator(i)}</td>
                    )
                    tdArr.push(
                      <td>{(getAverageIndicator(i) / window.coeffAver[i]).toFixed(2)}</td>
                    )
                    return tdArr;
                  })()
                }

              </tr>
            )
          })
        }
      </table>
    )
  }
  return (
    <div className='quality-section table-div'>
      <p>Типи експертів і їх вагомості</p>
      {
        getImportanceTable()
      }
      <p>Результати розрахунку комплексих показників якості ПЗ та їхні усереднені значення</p>
      {
        getComplexResTable()
      }
    </div>
  );
};

export default QualitySection;