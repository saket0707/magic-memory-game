import { useEffect, useState } from 'react';
import './App.css';

import SingleCard from './components/SingleCard';
import Win from './components/Win';



const cardImages = [
  { "src": "/img/helmet-1.png", matched: false },
  { "src": "/img/potion-1.png", matched: false },
  { "src": "/img/ring-1.png", matched: false },
  { "src": "/img/scroll-1.png", matched: false },
  { "src": "/img/shield-1.png", matched: false },
  { "src": "/img/sword-1.png", matched: false },
]

function App() {

  const [cards,setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setchoiceOne] = useState(null)
  const [ choiceTwo, setchoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)
  const [pairs,setPairs] = useState(1)
  const [win,setWin] = useState(false)
 

  //shufflecards
  const shuffleCards = ()=>{
    const shuffledCards = [...cardImages,...cardImages]
      .sort(()=>Math.random() - 0.5)
      .map((card)=>({...card, id: Math.random()}))

    setchoiceOne(null);
    setchoiceTwo(null);
    setCards(shuffledCards)
    setTurns(0)
    setPairs(1)
    setWin(false)
  }
 
  //handle a choice
  const handleChoice = (card) =>{
    if(choiceOne && (card.id===choiceOne.id)){
      return;
    }
    choiceOne ? setchoiceTwo(card) : setchoiceOne(card);
    
  }
  
  //check for match
  useEffect(()=>{
    if(choiceOne && choiceTwo){
      console.log(pairs)
      if(pairs===6){
        setWin(true)
      }
      setDisabled(true)
      if(choiceOne.src===choiceTwo.src) {
        setPairs(prevPairs => prevPairs + 1)
        setCards(prevCards => {
          return prevCards.map(card => {
            if(card.src === choiceOne.src){
              
              return {...card , matched:true}
            }
            else{
              return card;
            }
          })
        })
        resetTurn();
        
      }
      else{
        setTimeout(() => {
          resetTurn()
        }, 1000);
        
      }
      
    }
  },[choiceOne,choiceTwo])

 //starting game on 1st render
 useEffect(()=>{
    shuffleCards();
 },[]);

  const resetTurn = ()=>{
    setchoiceOne(null)
    setchoiceTwo(null)
    setTurns(prevTurns => prevTurns +1 )
    setDisabled(false)
  }

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards} >New Game</button>
      <div className="card-grid">
      {cards.map(card => (
          <SingleCard 
          key={card.id} 
          card={card}
          handleChoice = {handleChoice}
          flipped = { card === choiceOne || card=== choiceTwo || card.matched}
          disabled = {disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
      {win && <Win/>}
    </div>
  );
}

export default App;
