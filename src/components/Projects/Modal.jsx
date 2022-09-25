import { useState } from "react";
import { useRef, React } from "react";
import { useMutation, useQuery } from '@apollo/client';
import "./Projects.css";
import { GET_CLIENTS } from "../../queries/clientQueries";
import { ADD_PROJECT } from "../../mutations/projectMutation";
import { GET_PROJECTS } from "../../queries/projectQueries";

var ReactDOM = require('react-dom');

const Modal = ({ setShowModal }) => {
    const modalRef = useRef();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('Not Started');
    const [clientId, setClientId] = useState('')

    const [addProject] = useMutation(ADD_PROJECT, {
        variables: {
            name,
            description,
            status,
            clientId
        },
        refetchQueries: [{query: GET_PROJECTS}]
    });

    const {data, loading, error} = useQuery(GET_CLIENTS);
    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Something went wrong!!</p>;
    }

    //Close if clicked outside of Modal
    const onClose = (e) => {
        if (e.target === modalRef.current)
            setShowModal(false);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        // console.log(`data submitted: ${name}, ${description}, ${status}, ${clientId}`)
        addProject(name, description, status, clientId);
        setName('');
        setDescription('');
        setStatus('Not Started');
        setClientId('');
        setShowModal(false);
    };

    return ReactDOM.createPortal(
        <div className='modal' ref={modalRef} onClick={onClose}>
            <form onSubmit={onSubmit} className='modal-form'>
                <label>Name</label>
                <br />
                <input type='text' id='clientName' value={name} onChange={(e) => setName(e.target.value)} required/>
                <br />

                <label>Description</label>
                <br />
                <input type='text' id='clientEmail' value={description} onChange={(e) => setDescription(e.target.value)} required/>
                <br />

                <label>Status</label>
                <br />
                <select id="status" value={status} onChange={e => setStatus(e.target.value)}>
                    <option value='Not Started' key='Not Started'>Not Started</option>
                    <option value='In Progress' key='In Progress'>In Progress</option>
                    <option value='Completed' key='Completed'>Completed</option>
                </select>
                <br />

                <br/>
                <label>Client</label>
                <br/>
                <select id="client" value={clientId} onChange={e => {setClientId(e.target.value)}}>
                    <option value=''>Select</option>
                    {
                        data.clients.map(client => (
                            <option value={client.id} key={client.id}>{client.name}</option>
                        ))
                    }
                </select>
                <br/>

                <div className='modal-buttons'>
                    <button type='Submit' style={{cursor: 'pointer'}}>Submit</button>
                    <button onClick={() => setShowModal(false)} style={{cursor: 'pointer'}}>Close</button>
                </div>
            </form>
        </div>

        , document.getElementById('portal2'));
}

export default Modal;