import './App.css'
import InitialForm from './components/InitialForm';
import { useState } from 'react';

function App() {
  // instructions state for toggling the instructions on/off based on when the instructions button is clicked
  const [instructions, setInstructions] = useState("");

  // buttonClass for setting the instructions button class as "active" when the instructions are shown
  const [buttonClass, setButtonClass] = useState("");

  // handles showing/hiding the instructions when the instructions button is clicked
  const handleClick = () => {
    if (instructions === "") {
      setButtonClass("active");
      setInstructions(
        <p className={"instructions"}>
          1. Enter your name<br/>
          2. Select the trivia question category <br/>
          3. Select the difficulty <br/>
          4. Click "Start" and the trivia question will appear <br/>
          5. Choose your answer<br/>
          6. Click submit to see if you got it right<br/>
          7. Click "New Question" for another question in the same category<br/><br/>
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
