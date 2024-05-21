// src/Dashboard.js
import React, { useState, useEffect   } from 'react';
import './Dashboard.css'; // Assurez-vous d'importer le fichier CSS
import axios from 'axios';
import { Link } from 'react-router-dom'; 


const Dashboard = () => {
  
  const [quizData, setQuizData] = useState({
    title: '',
    description: '',
    makerId: '',
    time: '',
    score: '',
    questions: [
      { questionText: '', options: ['', '', '', ''], correctAnswer: '' },
    ],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuizData((prevQuiz) => ({
      ...prevQuiz,
      [name]: value,
    }));
  };

  const handleQuestionChange = (index, e) => {
    const { name, value } = e.target;
    const questions = [...quizData.questions];
    questions[index][name] = value;
    setQuizData((prevQuiz) => ({
      ...prevQuiz,
      questions,
    }));
  };

  const handleOptionChange = (questionIndex, optionIndex, e) => {
    const { value } = e.target;
    const questions = [...quizData.questions];
    questions[questionIndex].options[optionIndex] = value;
    setQuizData((prevQuiz) => ({
      ...prevQuiz,
      questions,
    }));
  };

  const handleCorrectAnswerChange = (questionIndex, e) => {
    const { value } = e.target;
    const questions = [...quizData.questions];
    questions[questionIndex].correctAnswer = value;
    setQuizData((prevQuiz) => ({
      ...prevQuiz,
      questions,
    }));
  };

  const addQuestion = () => {
    setQuizData((prevQuiz) => ({
      ...prevQuiz,
      questions: [
        ...prevQuiz.questions,
        { questionText: '', options: ['', '', '', ''], correctAnswer: '' },
      ],
    }));
  };

 const handleSubmit = async (e) => {
  console.log(quizData)
  e.preventDefault();
  try {
    

    const response = await axios.post('http://localhost:4000/createqst', quizData);
    console.log(response.data); // Assuming backend returns a success message
    // Reset quizData if needed

    
  } catch (error) {
    console.error('Error creating quiz and questions:', error);
    // Handle error
  }
};

  return (
    <div className="dashboard-container">
      <h2>Créer un Quiz</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Titre:</label>
          <input type="text" name="title" value={quizData.title} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea name="description" value={quizData.description} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Maker ID:</label>
          <input type="text" name="makerId" value={quizData.makerId} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Temps (en minutes):</label>
          <input type="number" name="time" value={quizData.time} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Note:</label>
          <input type="number" name="score" value={quizData.score} onChange={handleChange} required />
        </div>

        {quizData.questions.map((question, qIndex) => (
          <div key={qIndex} className="question-container">
            <div className="form-group">
              <label>Question {qIndex + 1}:</label>
              <input
                type="text"
                name="questionText"
                value={question.questionText}
                onChange={(e) => handleQuestionChange(qIndex, e)}
                required
              />
            </div>
            <div className="form-group">
              <label>Options:</label>
              {question.options.map((option, oIndex) => (
                <input
                  key={oIndex}
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(qIndex, oIndex, e)}
                  required
                />
              ))}
            </div>
            <div className="form-group">
              <label>Réponse Correcte:</label>
              <input
                type="text"
                value={question.correctAnswer}
                onChange={(e) => handleCorrectAnswerChange(qIndex, e)}
                required
              />
            </div>
          </div>
        ))}

        <button type="button" onClick={addQuestion}>
          Ajouter une question
        </button>
        <button type="submit" >Créer le Quiz</button>
        <button ><Link to="/quiz"  type="submit">Quiz</Link></button>
      </form>
      
    </div>
  );
};

export default Dashboard;
