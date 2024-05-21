import React, { useRef, useState, useEffect } from 'react';
import './quiz.css';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { data } from '../assets/data';
import { Link } from 'react-router-dom';
const Quiz = () => {
    const location = useLocation();
  const id = location.pathname.split('/').pop();
  
      let [index,setIndex]= useState(0);
    const [question,setQuestions]=useState([]);
    const [sizeOf , setSize] = useState([]);

    useEffect(() => {
    fetchQuestion(id);
  }, [index]);

  const fetchQuestion = async (quizId) => {
    try {
      const response = await axios.get(`http://localhost:4000/listQuestion/${id}`);
      const filteredQuestions = response.data.map(question => {
        const { quiz, ...rest } = question;
      
        return rest;
      });
      setQuestions(filteredQuestions[index]);
      setSize(filteredQuestions);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };
    
    const [lock,setLock] =useState(false);

    let option1=useRef(null);
    let option2=useRef(null);
    let option3 =useRef(null);
    let option4 =useRef(null);
let option_array=[option1,option2,option3 , option4];
let[score,setScore]= useState(0);
let[result,setResult] = useState(false);

const checkAns =(e,Ans)=>{
    if(lock === false){
if(question.answeris===Ans){
e.target.classList.add("correct");
setLock(true);
setScore(prev=>prev+1);
}else{
     e.target.classList.add("wrong");
     setLock(true);
     option_array[question.answeris-1].current.classList.add("correct");
}
    }

    }

const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:4000/createNote', {
        quizId: 1, 
        userId: 8, 
        note: score
      });
      // Handle success (e.g., show a success message)
    } catch (error) {
      console.error('Error creating note:', error);
      // Handle error (e.g., show an error message)
    }
  };
    const next=()=>{
        if(lock == true){
            if(index === sizeOf.length-1){
              
              console.log(question);
            setResult(true);
             setIndex(0); 
     return 0;
            }
            console.log(question);
            setIndex(++index);
            setQuestions(question);
            setLock(false);
            option_array.map((Option)=>{
                Option.current.classList.remove("wrong");
                Option.current.classList.remove("correct");
                return null;
            })
        }
    }
    const reset = () => {
        // Shuffle the questions array
        const shuffledData = question.sort(() => Math.random() - 0.5);
        // Set the index to 0 and update the question
        console.log(question)
        setIndex(0);
        setQuestions(shuffledData[0]);
        // Reset other state variables
        setScore(0);
        setLock(false);
        setResult(false);
    };
    
  return (
    <div className='container'>
        <h1> quiz app</h1>
        <hr/>
        {result?<></>:<>
        <h2>{index+1}. {question.qst}</h2>
        <ul>
            <li ref={option1} onClick={(e)=>{checkAns (e,1)}}>{question.option1}</li>
            <li ref={option2} onClick={(e)=>{checkAns (e,2)}}>{question.option2}</li>
            <li ref={option3} onClick={(e)=>{checkAns (e,3)}}>{question.option3}</li>
            <li ref={option4} onClick={(e)=>{checkAns (e,4)}}>{question.option4}</li>
        </ul>
        <button onClick={next}>next</button>
        <div className="index"> {index+1} of questions</div>
        </>}
        {result?<>
        <h2>You Scored {score} out of {sizeOf.length} </h2>
        <button onClick={handleSubmit}>Send</button>
        </>:<></>}
    </div>
  )
}

export default Quiz



