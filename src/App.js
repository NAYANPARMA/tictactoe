import React, { useState } from 'react';
import './App.css';
import Game from './Game/Game';
import Selectmode from './Selectmode';

function App() {

  const [choose, setChoose] = useState(false)
  const [choosex, setChoosex] = useState(false)
  const [chooseo, setChooseo] = useState(false)
  const [select, setSelect] = useState(false) 
  const [ai, setAi] = useState(false)
  const [friend, setfriend] = useState(false) 

  const handleContinue = () => {
    setChoose(true)
  }

  const handleSelect = (mode) => {
    if(mode == 'AI')
    {
      setAi(true)
    } else {
      setfriend(true)
    }
    setSelect(true)
  }

  
  return (
    <div className="app">
     { !select ?  <Selectmode select={handleSelect}/> : 
      (
        choose ? <Game x={choosex} o={chooseo} mode={ai ? 'AI':'FRIEND'}/>
       : 
      <div className='app__firstpage'>
        <h1>Pick your side</h1>
        <div className = 'app__sign'>
          <div className='app__x'>
            <label for="male">X</label>
            <input type="radio" id="X" name="sign" value="X" onClick={()=> setChoosex(!choosex)}/>
            
          </div>
          <div className='app__o'>
            <label for="O">O</label>
            <input type="radio" id="O" name="sign" value="O" onClick={() => setChooseo(!chooseo)}/>
       
          </div>
          </div>
        <button className='app__continue' onClick={handleContinue}>Continue</button>
      </div>
      )}
     
    </div>
  );
}

export default App;


