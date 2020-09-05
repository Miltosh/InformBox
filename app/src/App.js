import React, { useState, useEffect } from 'react';
import './App.css';
import TableItem from './TableItem.jsx'

function App() {

  const useLocalStorageList = (key, defaultValue) => {
    const [state, setState] = useState(() => JSON.parse(localStorage.getItem(key) || true))
    useEffect(() => {
      localStorage.setItem(key, JSON.stringify(state))
    }, [state])
    return [state, setState]
  }
  const [resId, setIdRes] = useLocalStorageList('resId', 'true')
  const [resName, setNameRes] = useLocalStorageList('resName', 'true')
  const [resYear, setYearRes] = useLocalStorageList('resYear', 'true')
  const [resColor, setColorRes] = useLocalStorageList('resColor', 'true')
  const [resValue, setValueRes] = useLocalStorageList('resValue', 'true')



  const setAllValuesTrue = () => {
    setIdRes(true);
    setNameRes(true);
    setYearRes(true);
    setColorRes(true);
    setValueRes(true);
  }
  let resetButton = document.getElementsByClassName('button')[0];
  const allResValues = [resId, resName, resYear, resColor, resValue];

  const [tableItems, setTableItems] = useState([]); // контент всех ячеек выносим в state

  const toggleIdRes = () => {
    setIdRes(resId => !resId);
    resetButton.className = 'button active'
  }
  const toggleNameRes = () => {
    setNameRes(resName => !resName)
    resetButton.className = 'button active'
  }
  const toggleYearRes = () => {
    setYearRes(resYear => !resYear)
    resetButton.className = 'button active'
  }
  const toggleColorRes = () => {
    setColorRes(resColor => !resColor)
    resetButton.className = 'button active'
  }
  const toggleValueRes = () => {
    setValueRes(resValue => !resValue)
    resetButton.className = 'button active'
  }

  useEffect(() => {
    (async () => {
      let response = await fetch('https://reqres.in/api/unknown?per_page=12');
      let content = await response.json();
      setTableItems([...tableItems, ...content.data]); // когда получили ответ из запроса, записываем его в state
    })();
  }, []);

  const reset = () => {
    if (allResValues.includes(false)) {
      setAllValuesTrue();
      resetButton.classList.remove('active');
    }
  }

  let checkClass = 'button';
  if (allResValues.includes(false)) {
    checkClass = 'button active'
  }

  return (
    <div className="mainContainer">
      <span className="tableHeader">
        <h1>Pantone Colors</h1>
        <button className={checkClass} onClick={reset}>&#x27F2;Reset</button>
      </span>

      <table className="table">
        <tbody className='items'>
          <tr >
            {resId && <th><input type="checkbox" onChange={toggleIdRes} defaultChecked />id </th>}
            {resName && <th><input className='name' type="checkbox" onChange={toggleNameRes} defaultChecked />Name </th>}
            {resYear && <th><input type="checkbox" onChange={toggleYearRes} defaultChecked />Year </th>}
            {resColor && <th><input type="checkbox" onChange={toggleColorRes} defaultChecked />Color </th>}
            {resValue && <th><input type="checkbox" onChange={toggleValueRes} defaultChecked />Pantone value </th>}
          </tr>
          {
            !!tableItems.length && // проверяем есть ли хоть что-то в tableItems
            tableItems.map(item => ( // если есть, то перебираем весь массив и отрисовываем каждую ячейку. но лучше какждую ячейку вынести как отдельный компонент
              <TableItem
                key={item.id}
                id={item.id}
                name={item.name}
                year={item.year}
                color={item.color}
                pantone_value={item.pantone_value}
                resId={resId}
                resName={resName}
                resYear={resYear}
                resColor={resColor}
                resValue={resValue}
              />
            ))
          }
        </tbody>
      </table>
    </div >
  );
}

export default App;