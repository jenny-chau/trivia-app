import { useState } from 'react';
import GetQuestion from './GetQuestion';
import './InitialForm.css';

function InitialForm() {
    const [formData, updateFormData] = useState({
        name: "",
        category: "",
        difficulty: ""
      });
    
    const [error, updateError] = useState("");
    const [success, updateSuccess] = useState("");

    const handleReset = () => {
        updateFormData({
            name: "",
            category: "",
            difficulty: ""
        });
        updateError("");
        updateSuccess("");
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        updateFormData((previous) => ({
            ...previous,
            [name]: value
        }))
    }

    const formValidation = () => {
        const {name, category, difficulty} = formData;

        if (name.trim() === "" || category.trim() === "" || difficulty.trim() === "") {
            updateError("Empty field detected! Please double check all fields are inputted. Thank you!");
            updateSuccess("");
            return false;
        }

        updateSuccess("");
        updateError("");
        return true;
    }

    const formCheck = async (event) => {
        event.preventDefault();

        if(!formValidation()) {
            return;
        }

        try {
            const token = await fetch('https://opentdb.com/api_token.php?command=request');
            const tokenJson = await token.json();

            if (tokenJson.response_code !== 0) {
                throw new Error("Failed to connect to the question database.");
            }

            updateSuccess(
                <GetQuestion tokenJson={tokenJson} formData={formData}/>
            );

        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div className={"container"}>
            <div className={"formContainer"}>
                <form onSubmit={formCheck} className={"formForQuestion"}>
       
                        <label htmlFor="name">Name: </label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />



       
                        <label htmlFor="category">Choose a trivia category:</label>
                        <select id="category" name="category" value={formData.category} onChange={handleChange}>
                            <option value="">--</option>
                            <option value="9">General Knowledge</option>
                            <option value="27">Animals</option>
                            <option value="30">Science: Gadgets</option>
                            <option value="17">Science & Nature</option>
                        </select>
              
    
                  
                        <label htmlFor="difficulty">Choose a difficulty:</label>
                        <select id="difficulty" name="difficulty" value={formData.difficulty} onChange={handleChange}>
                            <option value="">--</option>
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
               


                    <button id={"submitBtn"} type='submit'>Start</button>
                </form>
                
                {error && <div style={{color: "red"}}>{error}</div>}
            </div>
            <div className={"questionContainer"}>
                {success && <div>{success}</div>}
            </div>
            <button id={"reset"} onClick={handleReset}>Reset</button>
        </div>
    )
}

export default InitialForm;