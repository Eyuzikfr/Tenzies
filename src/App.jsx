import "./App.css";
import Die from "./components/Die";
import Confetti from "react-confetti";
import { useState, useRef, useEffect } from "react";
import { nanoid } from "nanoid";

export default function App() {
  const [dieObjects, setDieObjects] = useState(
    new Array(10).fill(null).map(() => ({
      value: "-",
      id: nanoid(),
      isHeld: false,
    }))
  );
  const buttonRef = useRef(null);

  const gameWon =
    dieObjects.every((die) => die.isHeld) &&
    dieObjects.every((die) => die.value === dieObjects[0].value);

  useEffect(()=>{
    buttonRef.current.focus();
  }, [gameWon])
    
  const hold = (id) => {
    setDieObjects((oldDice) =>
      oldDice.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  };

  const dieNumberItems = dieObjects?.map((dieObj) => (
    <Die
      key={dieObj.id}
      value={dieObj.value}
      isHeld={dieObj.isHeld}
      hold={() => hold(dieObj.id)}
    />
  ));

  const newGame = () => {
    setDieObjects(
      new Array(10).fill(null).map(() => ({
        value: "-",
        id: nanoid(),
        isHeld: false,
      }))
    );
  };

  const generateAllNewNumbers = () => {
    setDieObjects((prevState) =>
      prevState.map((die) =>
        die.isHeld
          ? die
          : { ...die, id: nanoid(), value: Math.ceil(Math.random() * 6) }
      )
    );
  };

  return (
    <main>
      {gameWon && <Confetti />}
      <div aria-live="polite" className="sr-only">
        {gameWon && (
          <o>Congratulations. You won. press new game to go again.</o>
        )}
      </div>
      <div className="main-container">
        <div className="inner-container">
          <h1 id="tenzies-title">Tenzies</h1>
          <p id="title-paragraph">
            Roll until all dice are the same. Click each die to freeze it at its
            current value between rolls.
          </p>
          <div className="dice-container">{dieNumberItems}</div>
          <button
            ref={buttonRef}
            className="roll-btn"
            onClick={gameWon ? newGame : generateAllNewNumbers}
          >
            {gameWon ? "New Game" : "Roll"}
          </button>
        </div>
      </div>
    </main>
  );
}
