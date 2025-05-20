import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getQuiz, submitquiz } from '../../pages/api/api';

function AttemptQuiz() {
    const { courseId } = useParams();
    const [quiz, setQuiz] = useState(null);
    const [answer, setAnswer] = useState([]);

    useEffect(() => {
        const fetchQuiz = async () => {
            const data = await getQuiz(courseId);
            setQuiz(data);
            setAnswer(new Array(data.questions.length).fill(""));
        };
        fetchQuiz();
    }, [courseId]);

    const handleOption = (index, option) => {
        setAnswer((prevAnswers) => {
            const updatedAnswers = [...prevAnswers];
            updatedAnswers[index] = option; // Update the answer for the specific question
            return updatedAnswers;
        });
    };

    const handleSubmit = async () => {
        const submitted = await submitquiz({ courseId, answer });
        alert(`Your score: ${submitted.score}`);
    };

    if (!quiz) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>Attempt Quiz</h1>
            {quiz.questions.map((q, index) => (
                <div key={index}>
                    <p>{q.questionText}</p>
                    {q.options.map((opt, opIndex) => (
                        <button
                            key={opIndex}
                            onClick={() => handleOption(index, opt)}
                        >
                            {opt}
                        </button>
                    ))}
                </div>
            ))}
            <button onClick={handleSubmit}>Submit Quiz</button>
        </div>
    );
}

export default AttemptQuiz;


/**
 * import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getQuiz, submitquiz } from '../../pages/api/api';


function AttemptQuiz() {
    const { courseId } = useParams();
    const [quiz, setQuiz] = useState(null);
    const [answer, setAnswer] = useState([]);

    useEffect(() => {
        const fetchQuiz = () => {
            const data = getQuiz(courseId)
            setQuiz(data);
            setAnswer(new Array(data.quiestions.length).fill(""))
        }
        fetchQuiz()
    }, [courseId]);

    const handleOption = (index , option)=>{
        setAnswer([...answer.slice(0, index),option, ...answer.slice(index + 1)])
    }

    const handleSubmit = () => {
        const submitted = submitquiz({courseId , answer});
        alert(`Your score : ${submitted.score}`)

    }
    return (
        <div>
            <h1>AttemptQuiz</h1>
            {quiz.quiestions.map((q, index)=>(
               <div>
                 (<div key={index}>
                    <p>{q.questionText}</p>
                    {q.options.map((opt)=>(
                        <button key={opt} onClick={handleOption(index , opt)} >
                            {opt}

                        </button>
                    ))}

                    <button onSubmit={handleSubmit}>submit quiz</button>
                    

                </div>): ( <p>loadung</p> )
               </div>
            ))}
        </div>
    )
}

export default AttemptQuiz
 */