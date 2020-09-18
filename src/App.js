import React , {useState, useEffect} from 'react'
import Face from './images/face.png'

function App() {

  const [simonSays, setSimonSays] = useState([]);
  const [started, setStarted] = useState(false);
  const [watching, setWatching] = useState(true);
  const [gameOver, setGameOver] = useState(0);
  const [guessArr, setGuessArr] = useState([]);
  const [displayColor, setDisplayColor] = useState('white');
  const colors = ['Red', 'Blue', 'Green', 'Yellow'];

  useEffect(() => {
    if(simonSays.length !== 0){
      setWatching(true)
      let currentLen = 0;
        let tick = setInterval(async () => {
            if(currentLen >= simonSays.length + 1){
              setWatching(false)
              clearInterval(tick)
            }else{
              setDisplayColor(simonSays[currentLen])
              currentLen++;
            }
        }, 1000)
     }
  }, [simonSays])

  useEffect(() => {
    if(simonSays.length !== 0){
      console.log()
      if(arrayEquals(simonSays, guessArr) && simonSays.length === guessArr.length){
        console.log(true);
          setGuessArr([]);
          setSimonSays(simonSays => [...simonSays, colors[Math.floor(Math.random(1) * 4)]  ])
      }else if(!arrayEquals(simonSays, guessArr)){
        //GAME OVER
        setGameOver(simonSays.length);
        setStarted(false);
        setSimonSays([]);
        setGuessArr([]);
      }
    }
  }, [guessArr, colors, simonSays])

  const startRound = (e) => {
    e.preventDefault();
   setSimonSays(simonSays => [...simonSays, colors[Math.floor(Math.random(1) * 4)]  ])
   setStarted(true)
   setGameOver(0);
  }

  function arrayEquals(a, b) {
  return Array.isArray(a) &&
    Array.isArray(b) &&
    b.every((val, index) => val === a[index]);
}

  const validateSequence = (e) => {
      e.preventDefault();
      setGuessArr([...guessArr, e.target.id])
      
  }
//testing switching to same colors as simon
  return (
    <div style ={{height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
      <div style ={{display: 'flex', flexDirection: 'column', alignItems:'center'}}>
        <h1 style ={{marginTop: '0px'}}>Simon Says</h1>
        {gameOver === 0 ? <h2>Round {simonSays.length}</h2> : <h2>GAME OVER - Score: {gameOver - 1}</h2>}
      </div>
      <div style = {{display: 'flex', justifyContent: 'center'}}>
      {!started ? <img src = {Face} style = {{width: '300px', height: '300px'}} alt = 'simon'/>: <div id = "simon" style ={{width: '300px', height: '300px',borderRadius: '50%', backgroundColor: displayColor}}>{/* {simonSays[simonSays.length - 1]} */}</div>}
      </div>
      {/* {simonSays.map((element) => <span id = "simon">{element},</span>)} */}
      <div style = {{display: 'flex', justifyContent: 'center', margin: '20px'}}>
      {!started ? 
      <button onClick = {startRound} style = {{backgroundColor: 'rgb(66,66,167)', cursor: 'pointer', color: 'white', border: 'none', borderRadius: '4px', padding: '10px 20px', width: '150px', height: '50px', fontSize: '20px'}}>start</button> :
      watching ?
      <></> :
      <div>
      <button id = 'Red' onClick = {validateSequence} style ={{borderRadius: '4px 0px 0px 4px', padding: '10px 20px', backgroundColor: 'red', color: 'white', cursor: 'pointer', border: 'none', width: '70px', height: '70px'}}></button>
      <button id = 'Yellow' onClick = {validateSequence} style ={{ padding: '10px 20px', backgroundColor: 'yellow', cursor: 'pointer', border: 'none', width: '70px', height: '70px'}}></button>
      <button id = 'Blue' onClick = {validateSequence} style ={{ padding: '10px 20px', backgroundColor: 'blue', color: 'white', cursor: 'pointer', border: 'none', width: '70px', height: '70px'}}></button>
      <button id = 'Green' onClick = {validateSequence} style ={{borderRadius: '0px 4px 4px 0px', padding: '10px 20px', backgroundColor: 'green', color: 'white', cursor: 'pointer', border: 'none', width: '70px', height: '70px'}}></button>
      </div>
      }
      </div>
    </div>
  )
}

export default App
