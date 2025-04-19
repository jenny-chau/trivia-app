import { useState } from 'react';
import GetQuestion from './GetQuestion';
import './Question.css';

function Question ({q, choices, formData, tokenJson}) {
    // To store error messages that will be displayed to the user
    const [error, updateError] = useState("");

    // Updates when the user answers the question and displays a "New Question" button to retrieve another question.
    const [success, updateSuccess] = useState("");

    // Stores the user's answer
    const [answer, updateAnswer] = useState("");

    // rightWrong: Stores a message telling the user if they answered correctly. Gets displayed to the user.
    // rightWrongClass: Stores whether the message should be displayed as red/green text if answered incorrectly/correctly (updates the class of the html)
    const [correct, updateCorrect] = useState({
        rightWrong: "",
        rightWrongClass: ""
    });

    // Updates when the user clicks the New Question button. Calls GetQuestion component to get another question.
    const [newQuestion, updateNewQuestion] = useState("");

    // Used to hide the submit button once the user selects the correct answer
    const [hideSubmitBtn, updateHideSubmitBtn] = useState("");

    // Used to hide the current question when retrieving the next question.
    const [display, updateDisplay] = useState(true);

    // Used to update the color of the question options when the user submits their answer (red for wrong answer, green for correct).
    const [choicesChosen, updateChoicesChosen] = useState(Array(choices.length).fill(""));

    // Checks if the user selected an answer
    const formValidation = () => {
        if (answer === "") {
            updateError("Please choose an answer");
            updateSuccess("");
            return false;
        }

        updateError("");
        return true;
    }

    // Updates answer everytime user clicks an option
    const handleChange = (event) => {
        updateAnswer(event.target.value);
    }

    // Called when the user clicks New Question button
    const handleClick = () => {
        updateError("");
        updateSuccess("");
        updateAnswer("");
        updateCorrect("");
        updateNewQuestion(<GetQuestion tokenJson={tokenJson} formData={formData}/>);
        updateDisplay(false);
    }

    // Checks if answer submitted by user is correct.
    const checkAnswer = (event) => {
        event.preventDefault();

        if(!formValidation()) {
            return;
        }

        if (answer === q.correct_answer) {
            updateCorrect({
                rightWrong: `That's correct! Great job, ${formData.name}!`,
                rightWrongClass: "correct"
            });
        } else {
            updateChoicesChosen(prev => {
                const newChoicesChosen = [...prev];
                newChoicesChosen[choices.indexOf(answer)] = "wrong";
                return newChoicesChosen;
            });
            updateCorrect({
                rightWrong: (
                <p>{`Nice try, ${formData.name}`} <br/> {`Correct answer is: ${decodeURIComponent(q.correct_answer)}.`}</p>),
                rightWrongClass: "wrong"
            });
        }

        updateChoicesChosen(prev => {
            const newChoicesChosen = [...prev];
            newChoicesChosen[choices.indexOf(q.correct_answer)] = "correct";
            return newChoicesChosen;
        });

        updateSuccess(
            <div>
                <button onClick={() => handleClick()}>New Question</button>
            </div>
        )

        updateHideSubmitBtn("hideBtn");
    }

    return (
        <div>
            {newQuestion&&<div>{newQuestion}</div>}
            {display && 
                <div>
                    <form className={"questionForm"} onSubmit={checkAnswer}>
                        <p className={"question"}>{decodeURIComponent(q.question)}</p>
                        <div>
                            <div className={"choicesList"}> 
                                {
                                    choices.map((option) => (
                                        <div key={option} className={"optionInputs " + choicesChosen[choices.indexOf(option)]}>
                                            <input type="radio" id={option} name={"options"} value={option} onChange={handleChange}/>
                                            <label htmlFor={option}>{decodeURIComponent(option)}</label>
                                            <br/>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <button className={"submitBtn " + hideSubmitBtn} type="submit">Submit</button>
                    </form>
                    
                    {error && <div style={{color: "red"}}>{error}</div>}
                    {correct && <div className={correct.rightWrongClass + " response"}>{correct.rightWrong}</div>}
                    {success && <div className={"newQuestion"}>{success}</div>}
                </div>
            }
        </div>
    )
}

export default Question;