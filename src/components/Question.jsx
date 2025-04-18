import { useState } from 'react';
import GetQuestion from './GetQuestion';
import './question.css';

function Question ({q, choices, formData, tokenJson}) {
    const [error, updateError] = useState("");
    const [success, updateSuccess] = useState("");
    const [answer, updateAnswer] = useState("");
    const [correct, updateCorrect] = useState({
        rightWrong: "",
        rightWrongClass: ""
    });
    const [newQuestion, updateNewQuestion] = useState(true);
    const [hideSubmitBtn, updateHideSubmitBtn] = useState("");
    const [display, updateDisplay] = useState(true);

    const [choicesChosen, updateChoicesChosen] = useState(Array(choices.length).fill(""));

    const formValidation = () => {
        if (answer === "") {
            updateError("Please choose an answer");
            updateSuccess("");
            return false;
        }

        updateError("");
        return true;
    }

    const handleChange = (event) => {
        updateAnswer(event.target.value);
    }

    const handleClick = () => {
        updateError("");
        updateSuccess("");
        updateAnswer("");
        updateCorrect("");
        updateNewQuestion(<GetQuestion tokenJson={tokenJson} formData={formData}/>);
        updateDisplay(false);
    }

    const checkAnswer = (event) => {
        event.preventDefault();

        if(!formValidation()) {
            return;
        }

        if (answer === q.correct_answer) {
            updateChoicesChosen(prev => {
                const newChoicesChosen = [...prev];
                newChoicesChosen[choices.indexOf(answer)] = "correct";
                return newChoicesChosen;
            });
            updateCorrect({
                rightWrong: `That's correct! Great job, ${formData.name}!`,
                rightWrongClass: "correct"
            });
            updateSuccess(
                <div>
                    <button onClick={() => handleClick()}>New Question</button>
                </div>
            )
            updateHideSubmitBtn("hideBtn");
        } else {
            updateChoicesChosen(prev => {
                const newChoicesChosen = [...prev];
                newChoicesChosen[choices.indexOf(answer)] = "wrong";
                return newChoicesChosen;
            });
            updateCorrect({
                rightWrong: `Oops, That's not quite, ${formData.name}. Please try again.`,
                rightWrongClass: "wrong"
            });
            updateSuccess("");
            updateHideSubmitBtn("");
        }

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