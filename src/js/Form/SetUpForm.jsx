import React from 'react'
import { useGlobalContext } from '../component/Context.jsx'

function SetUpForm() {
    const {quiz, handleChange, handleSubmit, errors} = useGlobalContext();
  return (
    <main>
        <section className='quiz quiz-small'>
            <form className='setup-form'>
                <h2>Quiz of the Day!</h2>
                <p>Test your movie knowledge...</p>
                {errors && <p className='error'>Can't generate questions, please try again.</p>}
                <button type='submit' className='submit-btn' onClick={handleSubmit}>Start</button>
            </form>

        </section>
    </main>
  )
}

export default SetUpForm