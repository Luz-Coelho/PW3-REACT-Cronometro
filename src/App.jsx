import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function TimerApp() {
  const [temporizador, setTemporizador] = useState(0);
  const [status, setStatus] = useState(false);
  const [lista, setLista] = useState([]);
  const [nome, setNome] = useState('');

  useEffect(() => {
    let interval;

    if (status == true) {
      interval = setInterval(() => {
        setTemporizador((prev) => prev + 1);
      }, 1000);
    } else { clearInterval(interval); }

    return() => clearInterval(interval);
  }, [status]);

  const habilitar = () => {
    setStatus(!status);
  };

  const resetar = () => {
    setTemporizador(0);
    setStatus(false);
  };

  const formatacao = () => {
    const minuto = Math.floor(temporizador / 60);
    const segundos = temporizador % 60;
    return (minuto < 10 ? '0' + minuto : minuto) + ':' + (segundos < 10 ? '0' + segundos : segundos);
  };
  
  const registrarNome = (event) => {
    setNome(event.target.value);
  };

  const registrarItem = () => {
    setLista((prevLista) => [...prevLista,"Nome:" + nome + " Tempo: " + formatacao()]);
    setTemporizador(0);
    setStatus(false);
  };

  return (
    <div className="clContainer">
      <input type="text" placeholder="Digite seu nome aqui" id="inputNome" value={nome} onChange={registrarNome} />

      <div className="clFuncoes">
        <div className="clTemporizador">
          {formatacao()}
        </div>
        
        <div className="clBtnContainer">
          <button className="clBotao" onClick={habilitar}>{status ? 'Parar' : 'Iniciar'}</button>
          <button className="clBotao" onClick={resetar}>Resetar</button>
          <button className="clBotao" onClick={registrarItem}>Salvar</button>
        </div>

        <div className="clLista">
          <select name="" id="">
            {lista.map((item, index) => {
              return <option key={index}>{item}</option>
            })}
          </select>
        </div>      
      </div>
    </div>
  )
}

function Home() {
  return (
    <div>
      <h1>Bem-vindo ao Cronômetro</h1>
      <p>Navegue para a página do cronômetro para começar</p>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter basename="/PW3-REACT-Cronometro">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/timer" element={<TimerApp />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App