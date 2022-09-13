const Die = (props) => {
  return (
    <div
      className="die"
      style={props.isHeld ? { backgroundColor: "#59e391" } : {}}
      onClick={props.holdDice}
    >
      {props.num}
    </div>
  );
};

export default Die;
