Trivia Web App

A website for fun trivia questions! It fetches the trivia questions from https://opentdb.com/ and displays it to the user. 

Languages and Libraries used:
- React (components; useState, useEffect hooks; )
- Javascript
- HTML & CSS

Components:
- App.jsx
    - Loads the heading and instructions (button that will display instructions once clicked)
    - Calls InitialForm component to load the form for users to input their name, question category and difficulty.

- InitialForm.jsx
    - Loads the form for users to fill out
    - Handles form inputs and submission (validates form for missing inputs)
    - Gets API token from the open trivia database
    - Reset button located at the bottom of the page to reset the form
    - Calls GetQuestion.jsx to fetch a question from the database

- GetQuestion.jsx
    - Recieves token and form data as props from parent
    - useEffect hook to run the getQuestion function (with a "retry" dependency to retry fetching a question if it fails)
        - Tries to fetch question from database
        - If unsuccessful, an error and a "Try Again" button pops up.
        - User clicks "Try Again" which calls getQuestion function after 4 seconds (this is to prevent too many API calls at once)
        - When successful, the question answer choices are sorted then passed to Question.jsx for display.

- Question.jsx
    - Recieves the question, question answer choices, initial form data (name, category, difficulty), and api token as props
    - Displays the question to the user
    - Submit button disappears once user clicks it
    - Answer is checked for correctness
        - If answer is correct, a "Great Job, [User]" message will display to the user in green. The answer choice selected will also change to green.
        - If answer is incorrect, a "Nice Try, [User]" with the correct answer message will display to the user in red. The incorrectly selected answer will change to red and the correct answer choice will change to green.
        - A "New Question" button will appear. If clicked, GetQuestion.jsx component will be called to fetch another question from the database.