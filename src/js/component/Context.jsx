import React, {useContext, useState, createContext} from "react"
import axios from "axios"

const table = {
    sports: 21,
    history: 23,
    politics: 24
}

const AppContext = createContext()
const AppProvider = ({children}) => {
const [waiting, setWaiting] = useState(true)
const [loading, setLoading] = useState(false)
const [questions, setQuestions] = useState([])
const [index, setIndex] = useState(0)
const [correct, setCorrect] = useState(0)
const [errors, setErrors] = useState(false)
const [quiz, setQuiz] = useState({
    difficulty: 'easy',
})
const [modal, setModal] = useState(false)

const fetchQuestions = async(url) => {
    setLoading(true)
    setWaiting(false)

    const resp = await axios(url).catch((err) => console.log(err))
    
    if(resp){
        const data = resp.data.results;
        
        if(data.length > 0){
            setQuestions(data)
            setLoading(false)
            setWaiting(false)
            setErrors(false)
        }else{
            setWaiting(true)
            setLoading(true)      
        }
    }else{
        setWaiting(true)
    }
} 

const openModal = () => {
    setModal(true)
}

const closeModal = () => {
    setModal(false)
    setWaiting(true)
    setCorrect(0)
}

const nextQuestion = () =>{
    setIndex((oldIndex) => {
        const index = oldIndex + 1;
        if(index > questions.length-1){
            openModal()
            return 0
        }else{
            return index
        }
    })
};

const checkAnswers = (value) => {
    if(value) {
        setCorrect((oldState) => oldState + 1)
    }
    nextQuestion()
}

const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setQuiz({...quiz, [name]: value})

}

const handleSubmit = (event) => {
    event.preventDefault()
    const {amount, difficulty, category} = quiz 
    const url = `https://opentdb.com/api.php?amount=10&category=11&difficulty=${difficulty}&type=multiple`
    fetchQuestions(url)
};

return (
    <AppContext.Provider value={{waiting, loading, questions, index, correct, errors, modal, nextQuestion, closeModal, checkAnswers, quiz, handleChange, handleSubmit}}>
        {children}
    </AppContext.Provider>
    )
}

export const useGlobalContext =() =>{
    return useContext(AppContext)
}

export {AppContext, AppProvider}