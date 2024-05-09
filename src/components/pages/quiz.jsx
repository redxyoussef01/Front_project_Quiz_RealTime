import React, { useRef, useState } from 'react'
import './quiz.css'
import { data } from '../../assets/data';
const Quiz = () => {
    let [index,setIndex]= useState(0);
    let [question,setQuestion]=useState(data[index]);
    let[lock,setLock] =useState(false);

    let option1=useRef(null);
    let option2=useRef(null);
    let option3 =useRef(null);

let option_array=[option1,option2,option3];
let[score,setScore]= useState(0);
let[result,setResult] = useState(false);

const checkAns =(e,Ans)=>{
    if(lock === false){
if(question.ans===Ans){
e.target.classList.add("correct");

setLock(true);
setScore(prev=>prev+1);
}else{
     e.target.classList.add("wrong");
     setLock(true);
     option_array[question.ans-1].current.classList.add("correct");
}
    }

    }
    const next=()=>{
        if(lock == true){
            if(index === data.length -1){
setResult(true);
     return 0;
            }
            setIndex(++index);
            setQuestion(data[index]);
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
        const shuffledData = data.sort(() => Math.random() - 0.5);
        // Set the index to 0 and update the question
        setIndex(0);
        setQuestion(shuffledData[0]);
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
        <h2>{index+1}. {question.question}</h2>
        <ul>
            <li ref={option1} onClick={(e)=>{checkAns (e,1)}}>{question.option1}</li>
            <li ref={option2} onClick={(e)=>{checkAns (e,2)}}>{question.option2}</li>
            <li ref={option3} onClick={(e)=>{checkAns (e,3)}}>{question.option3}</li>
        </ul>
        <button onClick={next}>next</button>
        <div className="index"> {index+1}of {data.length} questions</div>
        </>}
        {result?<>
        <h2>You Scored {score} out of {data.length}</h2>
        <button onClick={reset}>Reset </button>
        </>:<></>}
    </div>
  )
}

export default Quiz



