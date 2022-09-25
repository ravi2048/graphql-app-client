import { useState } from "react";
import { useRef, React } from "react";
import { useMutation } from '@apollo/client';
import { ADD_CLIENT } from '../../mutations/clientMutations';
import "./Clients.css";
import { GET_CLIENTS } from "../../queries/clientQueries";

var ReactDOM = require('react-dom');

const Modal = ({ setShowModal }) => {
    const modalRef = useRef();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const [addClient] = useMutation(ADD_CLIENT, {
        variables: {
            name,
            email,
            phone
        },
        refetchQueries: [{query: GET_CLIENTS}]
    })
    //Close if clicked outside of Modal
    const onClose = (e) => {
        if (e.target === modalRef.current)
            setShowModal(false);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        addClient(name, email, phone);
        setName('');
        setEmail('');
        setPhone('');
        setShowModal(false);
    };

    return ReactDOM.createPortal(
        <div className='modal' ref={modalRef} onClick={onClose}>
            <form onSubmit={onSubmit} className='modal-form'>
                <label>Name</label>
                <br />
                <input type='text' id='clientName' value={name} onChange={(e) => setName(e.target.value)} required/>
                <br />

                <label>Email</label>
                <br />
                <input type='text' id='clientEmail' value={email} onChange={(e) => setEmail(e.target.value)} required/>
                <br />

                <label>Phone</label>
                <br />
                <input type='text' id='clientPhone' value={phone} onChange={(e) => setPhone(e.target.value)} required/>
                <br />

                <div className='modal-buttons'>
                    <button type='Submit' style={{cursor: 'pointer'}}>Submit</button>
                    <button onClick={() => setShowModal(false)} style={{cursor: 'pointer'}}>Close</button>
                </div>
            </form>
        </div>

        , document.getElementById('portal'));
}

export default Modal;