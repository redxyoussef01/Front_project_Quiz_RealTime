import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import CreateQuiz from './Dashboard'
import { Link } from 'react-router-dom';
function Home() {
    const [show, setShow] = useState(false);
    const [personnels, setPersonnels] = useState([]);
    const [personnes, setPersonnes] = useState([]);
    const [formData, setFormData] = useState({
        personne_id: '',
        title: '',
        makerId: '',
        description: '',
        temps: '',
        note:'',
        questions: [
      { questionText: '', options: ['', '', '', ''], correctAnswer: '' },
    ]
    });

   useEffect(() => {
    fetchQuizzes();
}, []);

  const fetchQuizzes = async () => {
    try {
        const response = await axios.get('http://localhost:4000/listQuiz');
        if (response.data && Array.isArray(response.data)) {
            setPersonnels(response.data);
        } else {
            setPersonnels([]);
        }
    } catch (error) {
        console.error('Error fetching quizzes:', error);
    }
};
    
    

    const handleAddPersonnel = () => {
        setShow(true);
    };

    const handleClose = () => {
        setShow(false);
        setFormData({
            personne_id: '',
        title: '',
        makerId: '',
        description: '',
        temps: '',
        note:'',
        questions: [
      { questionText: '', options: ['', '', '', ''], correctAnswer: '' },
    ]
        });
    };

  

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this personnel?');
        if (!confirmDelete) return;
    
        try {
            await axios.delete(`http://localhost:4000/deleteQuiz/${id}/`);
            const updatedPersonnels = personnels.filter(personnel => personnel.id !== id);
            setPersonnels(updatedPersonnels); // Update personnels state after successful deletion
            alert('Quiz deleted successfully');
        } catch (error) {
            console.error('Error deleting Quiz:', error);
            // Display error message to the user
            alert('Error deleting personnel');
        }
    };
    

    return (
        <div className="container ">
            <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded">
                <div className="row ">
                    <div className="col-sm-3 mt-5 mb-4 text-gred">
                        <div className="search">
                            <form className="form-inline">
                                <input className="form-control mr-sm-2" type="search" placeholder="Search Quiz" aria-label="Search" />
                            </form>
                        </div>
                    </div>
                    <div className="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred" style={{ color: "green" }}><h2><b>Quiz List</b></h2></div>
                    <div className="col-sm-3 offset-sm-1  mt-5 mb-4 text-gred">
                        <Button variant="primary" onClick={handleAddPersonnel}>
                            <Link to="/Mquiz">Add New Quiz</Link>
                        </Button>
                    </div>
                </div>    
                <div className="row">
                    <div className="table-responsive " >
                        <table className="table table-striped table-hover table-bordered">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>titre</th>
                                    <th>makerId</th>
                                    <th>description</th>
                                    <th>temps</th>
                                    <th>note</th>
                                </tr>
                            </thead>
                            <tbody>
                                        {personnels.map((quiz, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{quiz.title}</td>
                                                <td>{quiz.makerId}</td>
                                                <td>{quiz.description}</td>
                                                <td>{quiz.temps}</td>
                                                <td>{quiz.note}</td>
                                                <td>
                                                
                                                    <a href="#" className="delete" title="Delete" data-toggle="tooltip" onClick={() => handleDelete(quiz.id)}>
                                                        <i className="material-icons">&#xE872;</i>
                                                    </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>


                        </table>
                    </div>
                </div>


            </div>
        </div>
    );
}

export default Home;
