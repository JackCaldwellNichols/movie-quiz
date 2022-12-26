import React from 'react'
import SetUpForm from './Form/SetUpForm.jsx';
import Modal from './component/Modal.jsx'
import LoadingScreen from './Loading/LoadingScreen.jsx'
import { useGlobalContext } from './component/Context.jsx';


const App = () => {
    const {waiting, loading, questions, index, correct, nextQuestion, checkAnswers} = useGlobalContext()
    if(waiting){
        return (
            <SetUpForm />
        )
    }
    if(loading){
        return (
            <LoadingScreen />
        )
    }

    const {incorrect_answers, correct_answer, question} = questions[index]
    let answers = [...incorrect_answers]
    const temp_index = Math.floor(Math.random()*4)
        if (temp_index === 3){
            answers.push(correct_answer)
        }else{
            answers.push(answers[temp_index])
            answers[temp_index] = correct_answer;
        }

    
    return (
        <main>
            <Modal />
            <section className='quiz'>
           
                <p className='correct-answers'>Correct answers: {correct}/{index}</p>
                <article className='container'>
                    <h2 dangerouslySetInnerHTML={{__html: question}}/>
                    <div className='btn-container'>
                        {
                        answers.map((answer, index) => {
                            return (
                                <button key={index} className='answer-btn' onClick={() => checkAnswers(correct_answer === answer)} dangerouslySetInnerHTML={{__html:answer}} />
                            )
                        })
                    }
                    </div>
                    <button className='next-question' onClick={nextQuestion}>Next Question</button>
                </article>
            </section>
            
        </main>
    );
};

export default App;
