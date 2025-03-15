export default function Die(props) {
  return (
    <>
      <button
        className="die"
        style={{ backgroundColor: props.isHeld ? "#59E391" : "#fff" }}
        onClick={props.hold}
        aria-pressed={props.isHeld}
        aria-label={`Die with value ${props.value}, ${
          props.isHeld ? "held" : "not held"
        }`}
      >
        {props.value}
      </button>
    </>
  );
}
