import React from "react"

export default function Challenge(props) {
    const challenge = props.challenge
    const answerElements = challenge.shuffledAnswers.map((answer, index) => {
        let answerClass = ""
        if (props.answersCheck) {
            if(challenge.correct_answer === answer) {
                answerClass = "correct"
            }
            else if(challenge.selected === answer) {
                answerClass = "wrong"
            }
            else {
                answerClass = "unselected"
            }
        }
        return (
            <div className="option" key={`${challenge.id}-${index}`}>
                <input 
                    type="radio"  
                    value={answer} 
                    name={challenge.id}
                    id={`${challenge.id}-${index}`}
                    checked={challenge.selected === answer}
                    onChange={() => props.selectAnswer(challenge.id,answer)}
                />
                <label htmlFor={`${challenge.id}-${index}`} className={answerClass}><span dangerouslySetInnerHTML={{ __html: answer }} /></label>
            </div>
        )
    })

    return (
        <div className="question">
            <h3 dangerouslySetInnerHTML={{ __html: challenge.question }} />
            <ul className="answer-options">
                {answerElements}
            </ul>
        </div>
    )
}