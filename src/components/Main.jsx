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
  const [numOfRolls, setNumOfRolls] = useState(0);
  const [highest, Sethighest] = useState(
    () => parseInt(localStorage.highest) || "NA"
  );

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
    }
  }, [dice]);

  useEffect(() => {
    if (numOfRolls !== 0 && (highest > numOfRolls || highest == "NA")) {
      Sethighest(numOfRolls);
      localStorage.setItem("highest", JSON.stringify(numOfRolls));
    }
    // console.log(parseInt(highest), numOfRolls, highest);
  }, [tenzies]);

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
    if (!tenzies) {
      const newDice = allNewDice();
      setDice((oldDice) =>
        oldDice.map((die, i) => (die.isHeld ? die : newDice[i]))
      );
      setNumOfRolls((prev) => prev + 1);
    } else {
      setDice(allNewDice());
      setTenzies(false);
      setNumOfRolls(0);
    }
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
        <div className="counter">
          <span>
            Number of rolls: <strong>{numOfRolls}</strong>
          </span>
          <span>
            highest score: <strong>{highest}</strong>
          </span>
        </div>
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
