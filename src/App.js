import {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';


const App = () => {
  const [counter, setCounter] = useState(0);
  const [buttons, setButtons] = useState([{name: '++'} ,{name: '--'} , {name: 'reset'}]);
  const [users, setUsers] = useState([
  {name: 'serega',age: '21',job: 'Programmer'},
  {name: 'igor',age: '23',job: 'Operator'},
  {name: 'eugene',age: '26',job: 'President'}
  ])
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [job, setJob] = useState('');
  const [countUsers, setCountUsers] = useState();
  const [timeout, setTime] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setTime(timeout + 1);
    }, 1000);
    return () => clearInterval()
  })

  const changeNumber = (event) => {
    switch (event) {
      case '++':
        setCounter(counter + 1)
        break;
      case '--':
        setCounter(counter - 1)
          break;
      case 'reset':
        setCounter(0)
          break;
    
      default:
        break;
    }
  }

  const button = buttons.map(item => {
    return <button name = {item.name} onClick={(event) => changeNumber(event.target.name)}>{item.name}</button>
  })

  const user = users.map(us => {
    return <div>Имя: {us.name},Возраст: {us.age},Работа: {us.job}</div>
  })

  const addUser = () => {
    setUsers([...users, {name, age, job}]);
    setName('');
    setAge('');
    setJob('');
    setCountUsers(users.length+1);
  }

  
  return (
    <div className="App">
      <header className="App-header">
        {counter}
        {button}
        <div>Количество пользователей {countUsers} </div>
        {user}
        <input value = {name} placeholder = 'Введите имя' onChange = {(event) => setName(event.target.value)}></input>
        <input value = {age} placeholder = 'Введите возраст' onChange = {(event) => setAge(event.target.value)}></input>
        <input value = {job} placeholder = 'Введите работу' onChange = {(event) => setJob(event.target.value)}></input>
        <button onClick = {(event) => addUser()}>addUser</button>
        <div>Количество счастливых людей на планете {timeout}</div>
      </header>
    </div>
  );
}

export default App;
