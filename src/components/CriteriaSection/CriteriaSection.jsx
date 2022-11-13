import React from 'react';
import './CriteriaSection.css';
import Criteria from '../../textInfo/creteria.json';
const CriteriaSection = () => {
  return (
    <div className='criteria-section table-div'>
      <table className='criteria-table'>
        <tr>
          <th>№</th>
          <th>Критерії оцінювання якості ПЗ</th>
          <th>Експерт галузі</th>
          <th>Експерт зручності</th>
          <th>Експерт з програмування</th>
          <th>Узагальнені користувачі</th>
          <th>Відношення</th>
        </tr>
        {
          window.expertsMarks.map((arr, i) => {
            let colArr = [];
            for (let j = 0; j < 3; j++) {
              colArr.push(
                <td >
                  <input type="text"  data-i={i} data-j={j} value={window.coeffs[i][j]+'/'+window.expertsMarks[i][j]} />
                </td>
              )
            }
            colArr.push(
              <td >
                <input type="text"  data-i={i} data-j={3} value={window.coeffs[i][3]+'/'+window.usersMarks[i][20]} />
              </td>
            );
            colArr.push(
              <td >
                <input type="text"  data-i={i} data-j={3} value={window.coeffAver[i]+'/'+window.exMarksAver[i].toFixed(2)} />
              </td>
            )
            return (
              <tr>
                <td>{i + 1}</td>
                <td>{Criteria[i]}</td>
                {
                  colArr
                }
              </tr>
            );
          })
        }
        <tr>
          <td>11</td>
          <td>Загальна/середня кількість балів</td>
          <td>
            {
              (()=>{
                let res='';
                let averCoeff,averMark;
                let sumCoeff=0,sumMark=0;
                for(let i=0;i<10;i++){
                  sumCoeff+=Number(window.coeffs[i][0]);
                  sumMark+=Number(window.expertsMarks[i][0]);
                }
                averCoeff=(sumCoeff/10).toFixed(2);
                averMark=(sumMark/10).toFixed(2);
                res=averCoeff+'/'+averMark;
                return res;

              })()
            }
          </td>
          <td>
            {
              (()=>{
                let res='';
                let averCoeff,averMark;
                let sumCoeff=0,sumMark=0;
                for(let i=0;i<10;i++){
                  sumCoeff+=Number(window.coeffs[i][1]);
                  sumMark+=Number(window.expertsMarks[i][1]);
                }
                averCoeff=(sumCoeff/10).toFixed(2);
                averMark=(sumMark/10).toFixed(2);
                res=averCoeff+'/'+averMark;
                return res;
              })()
            }
          </td>
          <td>
            {
              (()=>{
                let res='';
                let averCoeff,averMark;
                let sumCoeff=0,sumMark=0;
                for(let i=0;i<10;i++){
                  sumCoeff+=Number(window.coeffs[i][2]);
                  sumMark+=Number(window.expertsMarks[i][2]);
                }
                averCoeff=(sumCoeff/10).toFixed(2);
                averMark=(sumMark/10).toFixed(2);
                res=averCoeff+'/'+averMark;
                return res;
              })()
            }
          </td>
          <td>
            {
              (()=>{
                let res='';
                let averCoeff,averMark;
                let sumCoeff=0,sumMark=0;
                for(let i=0;i<10;i++){
                  sumCoeff+=window.coeffs[i][3];
                  sumMark+=Number(window.usersMarks[i][20]);
                }
                averCoeff=(sumCoeff/10).toFixed(2);
                averMark=(sumMark/10).toFixed(2);
                res=averCoeff+'/'+averMark;
                return res;
              })()
            }
          </td>
          <td>
            {
              (()=>{
                let res='';
                let averCoeff,averMark;
                let sumCoeff=0,sumMark=0;
                for(let i=0;i<10;i++){
                  sumCoeff+=Number(window.coeffAver[i]);
                  sumMark+=window.exMarksAver[i];
                }
                averCoeff=(sumCoeff/10).toFixed(2);
                averMark=(sumMark/10).toFixed(2);
                res=averCoeff+'/'+averMark;
                return res;
              })()
            }
          </td>
        </tr>
      </table>
    </div>
  );
};

export default CriteriaSection;