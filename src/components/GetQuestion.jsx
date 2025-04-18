import { useState } from 'react';
import { useEffect } from 'react';
import Question from './Question';
import './GetQuestion.css';

function GetQuestion({tokenJson, formData}) {
    const [error, updateError] = useState("");
    const [success, updateSuccess] = useState("");
    const [errorTryAgain, updateErrorTryAgain] = useState(false);
    const [retry, updateRetry] = useState(false);
    const [countdown, updateCountdown] = useState("");
    const [activeBtn, updateActiveBtn] = useState("");

    useEffect(() => {
        const getQuestion = async () => {
            try {
                const question = await fetch(`https://opentdb.com/api.php?amount=1&category=${formData.category}&difficulty=${formData.difficulty}&type=multiple&token=${tokenJson.token}&encode=url3986`);
                const questionJson = await question.json();

                if (questionJson.response_code !== 0) {
                    updateError("Cannot retrieve the question at this time.");
                    updateErrorTryAgain(true);
                    updateSuccess("");
                    throw new Error("Failed to retrieve a question.");
                }

                let choices = ([...questionJson.results[0].incorrect_answers, questionJson.results[0].correct_answer]);
                let sortedChoices = [...choices].sort();

                updateSuccess(
                    <Question q={questionJson.results[0]} choices={sortedChoices} formData={formData} tokenJson={tokenJson}/>
                );
                
                updateErrorTryAgain(false);
                updateError("");

            } catch (error) {
                console.log(error);
            }
        }

        getQuestion();
    }, [retry]);

    const handleClick = () => {
        updateActiveBtn("active");

        let count = 3;
        let counter = setInterval(() => {
            updateCountdown(String(count--));
        }, 1000);

        setTimeout(() => {
            updateRetry(true);
            clearInterval(counter);
            updateCountdown("");
            updateErrorTryAgain(false);
            updateError("");
        }, 4000);
    }
    

    return (
        <div className={"getQuestion"}>
            {error && <div style={{color: "red"}}>{error}</div>}
            {errorTryAgain && <button onClick={handleClick} className={activeBtn + " tryAgainBtn"}>Try Again</button>}
            {countdown && 
                <div>
                    <p>Getting Question in:</p>
                    <p>{countdown}</p>
                </div>
            }
            {success && <div>{success}</div>}
        </div>
    )
}

export default GetQuestion;