import React, { useEffect, useState } from 'react'
import useGlobalReducer from '../hooks/useGlobalReducer';
import { Link, useNavigate } from 'react-router-dom';
import DeleteModal from './DeleteModal';

export const Contacts = () => {

    const { store, dispatch } = useGlobalReducer();
    const [showModal, setShowModal] = useState(false);
    const [contactId, setContactId] = useState(undefined);
    const baseUrlContacts = 'https://playground.4geeks.com/contact/agendas/jonathan-cr/contacts'

    const getContacts = async () => {
        try {
            const response = await fetch(baseUrlContacts);
            if (!response.ok) {
                throw Error('Error de petición HTTP: ', response.status)
            }
            const data = await response.json();
            console.log(data.contacts);
            dispatch({ type: 'set_contacts', payload: data.contacts });
            return data
        } catch (e) {
            console.error('Error al obtener contactos: ', e)
        }
    }

    function handleOpenModal (contactId){
        setShowModal(true);
        setContactId(contactId);
    }

    function handleCancel (event) {
        setShowModal(false);
    }

    const handleDeleteContact = async () =>{
        const response = await fetch(`${baseUrlContacts}/${contactId}`,
            {
                method: 'DELETE',
                headers: {'content-type': 'application/json'}
            }
        )
        if (!response.ok){
            throw Error ('Error en la petición HTTP: ', response.status)
        }
        setShowModal(false);
        getContacts();
    }

    useEffect(() => {
        getContacts();
    }, [])


    return (
        <div className="container">
            {
                store.contacts.map((contact) => {
                    return (
                        <div key={contact.id} className="card mb-3 w-100">
                            <div className="row g-0">
                                <div className="col-md-4 d-flex justify-content-center">
                                    <img src="https://images.ctfassets.net/x7j9qwvpvr5s/43adRuY33iuCayAyMy3wTw/5545b174f876fc95ffcfff3d643c4d23/Ducati-MY25-Panigale-V4-overview-carousel-hero-link-1600x650-01.jpg" className="my-2 object-fit-cover rounded-circle" alt="..." style={{ width: "200px", height: "200px" }} />
                                </div>
                                <div className="col-md-4">
                                    <div className="card-body">
                                        <p className="display-6">{contact.name}</p>
                                        <div className="card-text text-secondary" style={{ fontSize: '1.2rem' }}>
                                            <p><i className="fa-solid fa-location-dot pe-2"></i>{contact.address}</p>
                                            <p><i className="fa-solid fa-phone pe-2"></i>{contact.phone}</p>
                                            <p><i className="fa-solid fa-envelope pe-2"></i>{contact.email}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4  d-flex align-items-center">
                                    <div className="card-body display-5 d-flex justify-content-around">
                                        <Link to={`/edit-contact/${contact.id}`}><i className="fa-solid fa-pencil"></i></Link>
                                        <i className="fa-solid fa-trash-can text-danger" onClick={()=>{handleOpenModal(contact.id)}}></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })
            }

            <DeleteModal show={showModal} onCancel={handleCancel} onDelete={handleDeleteContact} />
        </div>
    )
}