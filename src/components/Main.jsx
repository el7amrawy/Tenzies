import { useState } from "react";
import Die from "./Die";

const Main = () => {
  /**
   * States
   */
  const [dice, setDice] = useState(() => allNewDice());
  //   console.log(dice);

  /**
   * Functions
   */
  function allNewDice() {
    const arr = [];
    for (let i = 0; i < 10; i++) {
      const randomNum = Math.floor(Math.random() * 6) + 1;
      arr.push(randomNum);
    }
    return arr;
  }

  function rollDice() {
    setDice(allNewDice());
  }
  /**
   *
   */
  const diceElems = dice.map((num) => <Die num={num} />);

  return (
    <div className="main">
      <div>
        <h2>Tenzies</h2>
        <p>
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="nums">{diceElems}</div>
        <button onClick={rollDice}>Roll</button>
      </div>
    </div>
  );
};

export default Main;
