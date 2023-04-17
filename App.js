import React, { useState }  from "react"
import Quiz from "./Quiz"

export default function App() {
    const [started, setStarted] = useState(false)

    function startGame() {
        setStarted(true)
    }

    return (
        <main>
            <div className="yellow-blob"></div>
            { 
                !started ?
                <section className="intro--container">
                    <h1 className="intro--title">Quizzical</h1>
                    <p>Take this 5 question quiz on mythology!</p>
                    <button className="button" onClick={startGame}>Start Quiz</button>
                </section>
                :
                <Quiz />
            }
            <div className="blue-blob"></div>   
        </main>
        
    )
}