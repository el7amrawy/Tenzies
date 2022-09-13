import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Die from "./Die";
import Confetti from "react-confetti";

const Main = () => {
  /**
   * States
   */
  const [dice, setDice] = useState(() => allNewDice());
  const [tenzies, setTenzies] = useState(false);

  /**
   * Effects
   */

  useEffect(() => {
    let n = 0;
    const value = dice[0].value;
    dice.map((die) => {
      if (die.isHeld && die.value === value) {
        n++;
      }
    });
    if (n === dice.length) {
      setTenzies((prev) => !prev);
      // alert("u won");
    }
  }, [dice]);

  /**
   * Functions
   */
  function allNewDice() {
    const arr = [];
    for (let i = 0; i < 10; i++) {
      const randomNum = Math.floor(Math.random() * 6) + 1;
      arr.push({ id: nanoid(), value: randomNum, isHeld: false });
    }
    return arr;
  }

  function rollDice() {
    const newDice = allNewDice();
    setDice((oldDice) =>
      oldDice.map((die, i) => (die.isHeld ? die : newDice[i]))
    );
  }

  function holdDice(id) {
    // console.log(id);
    setDice((oldDice) =>
      oldDice.map((die) => {
        if (die.id === id) {
          die.isHeld = !die.isHeld;
        }
        return die;
      })
    );
  }

  /**
   *
   */
  const diceElems = dice.map((die) => (
    <Die
      key={die.id}
      num={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  return (
    <div className="main">
      <div>
        <h2>Tenzies</h2>
        <p>
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="nums">{diceElems}</div>
        <button onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
      </div>
      {tenzies && <Confetti />}
    </div>
  );
};

export default Main;
