import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import ExpertsMarks from '../../textInfo/expertsMarks.json';
import UsersMarks from '../../textInfo/usersMarks.json';
import './MarksSection.css';
const MarksSection = (props) => {
  const USER_NUMBER = 20;
  const CRITERIA_NUMBER = 10;
  const [usersMarks, setUsersMarks] = useState([...calcUsersMarks()]);
  const [expertsMarks, setExpertsMarks] = useState([...ExpertsMarks]);

  function calcUsersMarks(){
    let matr = [];
    for (let i = 0; i < CRITERIA_NUMBER; i++) {
      let matr2 = [];
      for (let j = 0; j < USER_NUMBER; j++) {
        matr2.push(UsersMarks[i][j]);
      }
      matr2.push(getRandomInt(CRITERIA_NUMBER + 1));
      matr.push(matr2);
      matr[i][USER_NUMBER] = getAverage(matr[i]);
    }
    return matr;
  }
  function getRandomInt(maxNum) {
    return Math.floor(Math.random() * maxNum);
  }
  function getMatrix() {
    let matr = [];
    for (let i = 0; i < CRITERIA_NUMBER; i++) {
      let matr2 = [];
      for (let j = 0; j <= USER_NUMBER; j++) {
        matr2.push(getRandomInt(CRITERIA_NUMBER + 1));
      }
      matr.push(matr2);
      matr[i][USER_NUMBER] = getAverage(matr[i]);
    }
    return matr;
  }
  function getAverage(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length-1; i++) {
      sum += arr[i];
    }
    return (sum / (arr.length-1)).toFixed(2);
  }
  function calcAverage(e) {
    let i = Number(e.target.dataset.i);
    let j = Number(e.target.dataset.j);
    let collection = document.querySelectorAll(".ExRow" + i);
    let sum = 0;
    for (let k = 0; k < collection.length; k++) {
      sum += Number(collection[k].value);
    }
    let value = sum /4 ;
    window.exMarksAver[i]=value;
    let classEl = "ExRowN" + i;
    document.querySelector("." + classEl).value = value.toFixed(2);
  }
  function setAverage() {
    window.exMarksAver=[];
    for (let i = 0; i < 10; i++) {
      let collection = document.querySelectorAll(".ExRow" + (i));
      
      let sum = 0;
      for (let k = 0; k < collection.length; k++) {
        sum += Number(collection[k].value);
      }
      let value = sum / 4;
      window.exMarksAver.push(value);
      let classEl = "ExRowN" + (i);
      document.querySelector("." + classEl).value = value.toFixed(2);
    }
  }
  function setNewUsersMarks(e) {
    let i = Number(e.target.dataset.i);
    let j = Number(e.target.dataset.j);
    usersMarks[i][j] = Number(e.target.value);
    usersMarks[i][USER_NUMBER] = getAverage(usersMarks[i]);
    setUsersMarks([...usersMarks]);
    calcAverage(e);
  }
  function setNewExpertsValues(e) {
    let i = Number(e.target.dataset.i);
    let j = Number(e.target.dataset.j);
    expertsMarks[i][j] = Number(e.target.value);
    setExpertsMarks([...expertsMarks]);
    calcAverage(e);
  }
  useEffect(()=>{
    window.expertsMarks=[...expertsMarks];
  },[expertsMarks]);
  useEffect(()=>{
    window.usersMarks=[...usersMarks];
  },[usersMarks])
  function getUsersMarksTable(usersMarks) {
    return (
      <table className='users-marks-table'>
        <tr>
          <td>№</td>
          {
            (() => {
              let colArr = [];
              for (let j = 0; j < USER_NUMBER; j++) {
                colArr.push(
                  <td>{`User${j + 1}`}</td>
                )
              }
              return colArr;
            })()
          }
        </tr>
        {
          usersMarks.map((arr, i) => {
            let colArr = [];
            for (let j = 0; j < USER_NUMBER; j++) {
              colArr.push(
                <td >
                  <input className={`row${i}`} type="number" min="0" max="10" step="1" data-i={i} data-j={j} value={usersMarks[i][j]} onChange={setNewUsersMarks} />
                </td>
              )
            }
            return (
              <tr>
                <td>{i + 1}</td>
                {
                  colArr
                }
              </tr>
            );
          })
        }
      </table>
    );
  }
  function getExpertsMarksTable(expertsMarks) {
    return (
      <table className='experts-marks-table'>
        <tr>
          <th>№</th>
          <th>Експерт галузі</th>
          <th>Експерт зручності</th>
          <th>Експерт з програмування</th>
          <th>Узагальнені користувачі</th>
          <th>Середнє значення</th>
        </tr>
        {
          expertsMarks.map((arr, i) => {
            let colArr = [];
            for (let j = 0; j < 3; j++) {
              colArr.push(
                <td >
                  <input className={`ExRow${i}`} type="number" min="0" max="10" step="1" data-i={i} data-j={j} value={expertsMarks[i][j]} onChange={setNewExpertsValues} />
                </td>
              )
            }
            colArr.push(
              <td>
                <input className={`ExRow${i}`} type="number" min="0" max="10" step="1" data-i={i} data-j={USER_NUMBER} value={usersMarks[i][USER_NUMBER]} onChange={calcAverage}/>
              </td>
            )
            colArr.push(
              <td>
                <input className={`ExRowN${i}`} type="number" min="0" max="10" step="1"  />
              </td>
            )
            return (
              <tr>
                <td>{i + 1}</td>
                {
                  colArr
                }
              </tr>
            );
          })
        }
      </table>
    );
  }
  useEffect(()=>{
    setAverage();
  },[expertsMarks])
  return (
    <div className='marks-section table-div'>
      <p>Оцінки потенційних користувачів</p>
      {
        getUsersMarksTable(usersMarks)
      }
      <p>Оцінки експертів</p>
      {
        getExpertsMarksTable(expertsMarks)
      }
    </div>
  );
};

export default MarksSection;