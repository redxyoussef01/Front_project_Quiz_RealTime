import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

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
        note:''
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
        note:''
        });
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'personne_id') {
            const selectedPersonne = personnes.find(personne => personne.id === parseInt(value, 10));
            if (selectedPersonne) {
                setFormData({
                    ...formData,
                    personne_id: value,
                    nom: selectedPersonne.nom,
                    prenom: selectedPersonne.prenom,
                    email: selectedPersonne.email,
                    image: selectedPersonne.image ? `data:image/jpeg;base64,${selectedPersonne.image}` : null,
                });
            } else {
                setFormData({
                        personne_id: '',
                    title: '',
                    makerId: '',
                    description: '',
                    temps: '',
                    note:''
                });
            }
        } 
    };

   const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const formDataToSend = {
            title: formData.title,
            makerId: formData.makerId,
            description: formData.description,
            temps: formData.temps,
            note: formData.note
        };
        await axios.post('http://localhost:8000/createQz', formDataToSend);
        setShow(false);
        fetchQuizzes(); // Refresh quizzes data after adding a new quiz
    } catch (error) {
        console.error('Error adding new quiz:', error);
        alert('Error adding new quiz');
    }
};

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this personnel?');
        if (!confirmDelete) return;
    
        try {
            await axios.delete(`http://localhost:8000/api/personnels/delete/${id}/`);
            const updatedPersonnels = personnels.filter(personnel => personnel.id !== id);
            setPersonnels(updatedPersonnels); // Update personnels state after successful deletion
            alert('Personnel deleted successfully');
        } catch (error) {
            console.error('Error deleting personnel:', error);
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
                                <input className="form-control mr-sm-2" type="search" placeholder="Search personnel" aria-label="Search" />
                            </form>
                        </div>
                    </div>
                    <div className="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred" style={{ color: "green" }}><h2><b>Quiz List</b></h2></div>
                    <div className="col-sm-3 offset-sm-1  mt-5 mb-4 text-gred">
                        <Button variant="primary" onClick={handleAddPersonnel}>
                            Add New personnel
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
                                {personnels.map((personnel, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{personnel.nom}</td>
                                        <td>{personnel.prenom}</td>
                                        <td>{personnel.email}</td>
                                        <td>
                                            <a href="#" className="edit" title="Edit" data-toggle="tooltip" onClick={() => handleEdit(personnel)}>
                                                <i className="material-icons">&#xE254;</i>
                                            </a>
                                            <a href="#" className="delete" title="Delete" data-toggle="tooltip" onClick={() => handleDelete(personnel.id)}>
                                                <i className="material-icons">&#xE872;</i>
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="model_box">
                    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                        <Modal.Header closeButton>
                            <Modal.Title>Add Record</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="formPersonneId">
                                    <Form.Label>Personne ID</Form.Label>
                                    <Form.Control as="select" name="personne_id" onChange={handleChange}>
                                        <option value="">Select Personne ID</option>
                                        {personnes.map((personne, index) => (
                                            <option key={index} value={personne.id}>{personne.id}</option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="formNom">
                                    <Form.Label>Nom</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Nom" name="nom" value={formData.nom} onChange={handleChange} />
                                </Form.Group>
                                <Form.Group controlId="formPrenom">
                                    <Form.Label>Prenom</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Prenom" name="prenom" value={formData.prenom} onChange={handleChange} />
                                </Form.Group>
                                <Form.Group controlId="formEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder="Enter Email" name="email" value={formData.email} onChange={handleChange} />
                                </Form.Group>
                                <Form.Group controlId="formImage">
                                    <Form.Label>Image</Form.Label>
                                    <Form.Control type="file" accept="image/*" name="image" onChange={handleChange} />
                                    {formData.image && (
                                        <div>
                                            <img src={typeof formData.image === 'string' ? formData.image : URL.createObjectURL(formData.image)} alt="Selected" style={{ maxWidth: '100px' }} />
                                        </div>
                                    )}
                                </Form.Group>


                                <Button variant="primary" type="submit">
                                    Add Record
                                </Button>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>

            </div>
        </div>
    );
}

export default Home;
