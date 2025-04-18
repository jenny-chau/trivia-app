import './App.css'
import InitialForm from './components/InitialForm';
import { useState } from 'react';

function App() {
  const [instructions, setInstructions] = useState("");
  const [buttonClass, setButtonClass] = useState("");

  const handleClick = () => {
    if (instructions === "") {
      setButtonClass("active");
      setInstructions(
        <p className={"instructions"}>
          <b>1.</b> Enter your name<br/>
          <b>2.</b> Select the trivia question category <br/>
          <b>3.</b> Select the difficulty <br/>
          <b>4.</b> Click "Start" and the trivia question will appear <br/>
          <b>5.</b> Choose your answer<br/>
          <b>6.</b> Click submit to see if you got it right<br/>
          <b>7.</b> Click "New Question" for another question in the same category<br/><br/>
          Have Fun!!
        </p>
      )
    } else {
      setButtonClass("");
      setInstructions("");
    }
    return;
  }

  return (
    <>
      <h1>It's time for some<br/><strong>~TRIVIA!~</strong></h1>
      <button onClick={handleClick} className={buttonClass + " instructionsBtn"}>Click Here for Instructions</button>
      {instructions && <div>{instructions}</div>}
      <InitialForm />
    </>
  )
}

export default App
