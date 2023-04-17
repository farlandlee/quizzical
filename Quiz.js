import React, { useState, useEffect } from "react"
import Challenge from "./Challenge"
import {nanoid} from "nanoid"

export default function Quiz() {
    const [quiz, setQuiz] = useState([])
    const [answersCheck, setAnswersCheck] = useState(false)
    const [games, setGames] = useState(1)
    const [score, setScore] = useState(0)

    useEffect(() => {
        function setupQuestions(questions) {
            let quiz = [];
            for(let question of questions) {
                let answers = question.incorrect_answers.concat(question.correct_answer);
                let shuffledAnswers = answers.sort(() => Math.random() - 0.5);
                quiz.push({
                    id: nanoid(),
                    ...question,
                    selected: null,
                    shuffledAnswers: shuffledAnswers
                })
            }
            setQuiz(quiz)
        }
        fetch("https://opentdb.com/api.php?amount=5&category=20")
            .then(res => res.json())    // convert to json
            .then(data => {
                console.log(data.results )
                setupQuestions(data.results)

            })
    }, [games])

    function checkAnswers() {
        if(!answersCheck) {
            setAnswersCheck(true)
            console.log("check the answers")
            setScore(quiz.filter(question => question.selected === question.correct_answer).length);
        }
        else {
            setAnswersCheck(false)
            setGames(oldGames => oldGames + 1)
            setScore(0)
        }
    }

    function selectAnswer(id,answer) {  
        setQuiz(oldQuiz => oldQuiz.map(question => question.id === id ? {...question, selected: answer} : question))
    }

    const quizElements = quiz.map((item) => {
        return <Challenge key={item.id} challenge={{...item}} selectAnswer={selectAnswer} answersCheck={answersCheck}  />
    });
    return (
        <section className="quiz--container">
            {quizElements}
            <footer className="quiz--footer">
                {answersCheck && <div className="quiz--score">You scored {score}/5 correct answers.</div>}
                <button className="button" onClick={checkAnswers}>{ answersCheck ? "Play again" : "Check Answers"}</button>
            </footer>
        </section>
    )
}