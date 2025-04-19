import { useState } from 'react';
import { useEffect } from 'react';
import Question from './question';
import './GetQuestion.css';

function GetQuestion({tokenJson, formData}) {
    // To store error messages that will be displayed to the user
    const [error, updateError] = useState("");

    // Updates when a question is successfully fetched. Calles Question component to display the question.
    const [success, updateSuccess] = useState("");

    // Used to display the "Try Again" button if the question was not successfully fetched.
    const [errorTryAgain, updateErrorTryAgain] = useState(false);

    // Used as a dependency for the useEffect hook - tells useEffect to try getting another question when the user clicks the "Try Again" button.
    const [retry, updateRetry] = useState(false);

    // When user clicks "Try Again" button, countdown timer for fetching a new question will be displayed to user.
    const [countdown, updateCountdown] = useState("");

    // Used to add the "active" class to the "Try Again" button when it is clicked to indicate processing
    const [activeBtn, updateActiveBtn] = useState("");

    // useEffect hook for fetching a question with "retry" as a dependency
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

                // Sorts the choices in alphabetical order so that the correct answer is not always last
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

    // Used to handle the "Try Again" button being clicked
    const handleClick = () => {
        updateActiveBtn("active");

        // Used to display a countdown to users until the question appears
        let count = 3;
        let counter = setInterval(() => {
            updateCountdown(String(count--));
        }, 1000);

        // Waits 4 seconds before trying to fetch data to prevent calling the API too many times
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