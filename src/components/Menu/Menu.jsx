import React from 'react';
import './Menu.css';
const Menu = (props) => {
  function handleClick(e) {
    console.log(e.target.id);
    console.log(e.target.value);
    let event = new Event("changedSection");
    event.detail = { "section": e.target.value || e.target.id };
    document.dispatchEvent(event);
  }
  return (
    <ul className='menu-list'>
      
      <li className='menu-item' id="coeffs" onClick={handleClick}>Вагові коефіцієнти</li>
      <li className='menu-item' id="marks" onClick={handleClick}>Оцінки</li>
      <li className='menu-item' id="criteria" onClick={handleClick}>Критерії оцінювання</li>
      <li className='menu-item' id="quality" onClick={handleClick}>Якість ПЗ</li>
      <li>
        <select className='menu-item' onChange={(e) => handleClick(e)} >
          <option value={" "}>
            Діаграми
          </option>
          <option data-id="area" value={"area"} >
            Діаграма для експертів галузі
          </option>
          <option data-id="usability" value={"usability"}>
            Діаграма для експертів з usability
          </option>
          <option data-id="programming" value={"programming"}>
            Діаграма для експертів з програмування
          </option>
          <option data-id="users" value={"users"}>
            Діаграма для потенційних користувачів
          </option>
          <option data-id="total" value={"total"}>
            Діаграма зведених показників
          </option>
        </select>
      </li>

    </ul>
  );
};

export default Menu;