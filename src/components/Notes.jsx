import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
function Home() {
    const socket = io('http://localhost:4000');
    const [show, setShow] = useState(false);
    const [personnels, setPersonnels] = useState([]);
   
   



useEffect(() => {
        // Fetch initial notes
        fetchNotes();

        // Listen for 'noteCreated' event from the server
        socket.on('noteCreated', (newNote) => {
            setPersonnels((prevNotes) => [...prevNotes, newNote]); // Update state with the newly created note
        });
        
        // Clean up function to close the socket connection
        return () => {
            socket.disconnect();
        };
    }, [socket]);

  const fetchNotes = async () => {
    try {
        const response = await axios.get('http://localhost:4000/listNote');
        if (response.data && Array.isArray(response.data)) {
            setPersonnels(response.data);
        } else {
            setPersonnels([]);
        }
    } catch (error) {
        console.error('Error fetching quizzes:', error);
    }
};
    
    



  

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this note?');
        if (!confirmDelete) return;
    
        try {
            await axios.delete(`http://localhost:4000/deleteNote/${id}/`);
            const updatedPersonnels = personnels.filter(personnel => personnel.id !== id);
            setPersonnels(updatedPersonnels); // Update personnels state after successful deletion
            alert('note deleted successfully');
        } catch (error) {
            console.error('Error deleting note:', error);
            // Display error message to the user
            alert('Error deleting note');
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
                    <div className="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred" style={{ color: "green" }}><h2><b>note List</b></h2></div>
                    <div className="col-sm-3 offset-sm-1  mt-5 mb-4 text-gred">
                    
                    </div>
                </div>    
                <div className="row">
                    <div className="table-responsive " >
                        <table className="table table-striped table-hover table-bordered">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>quiz</th>
                                    <th>user lastname</th>
                                    <th>note</th>
                                </tr>
                            </thead>
                            <tbody>
                                        {personnels.map((quiz, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{quiz.quiz.title}</td>
                                                <td>{quiz.user.lastName}</td>
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
