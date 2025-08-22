import React, { useEffect, useState } from 'react'
import useGlobalReducer from '../hooks/useGlobalReducer';
import { Link, useNavigate } from 'react-router-dom';
import DeleteModal from './DeleteModal';
import rigoImageUrl from "../assets/img/rigo-baby.jpg";

export const Contact = () => {

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

    function handleOpenModal(contactId) {
        setShowModal(true);
        setContactId(contactId);
    }

    function handleCancel() {
        setShowModal(false);
    }

    const handleDeleteContact = async () => {
        const response = await fetch(`${baseUrlContacts}/${contactId}`,
            {
                method: 'DELETE',
                headers: { 'content-type': 'application/json' }
            }
        )
        if (!response.ok) {
            throw Error('Error al eliminar Contact: ', response.status)
        }
        setShowModal(false);
        getContacts();
    }

    useEffect(() => {
        getContacts();
    }, [])


    return (
        <div className="container d-flex justify-content-center py-4">
            <div
                className="w-100 bg-light rounded shadow-sm p-4 d-flex flex-column gap-4"
                style={{ maxWidth: "900px" }}
            >
                {
                    store.contacts.map((contact) => {
                        return (
                            <div key={contact.id} className="card mb-3">
                                <div className="row g-0">
                                    <div className="col-md-4 d-flex justify-content-center">
                                        <img src={rigoImageUrl} className="my-2 object-fit-cover rounded-circle" alt="Rigo Baby" style={{ width: "200px", height: "200px" }} />
                                    </div>
                                    <div className="col-md-4">
                                        <div className="card-body">
                                            <p className="display-6">{contact.name}</p>
                                            <div className="card-text text-secondary" style={{ fontSize: '1.2rem' }}>
                                                <p><i className="fa-solid fa-location-dot fa-lg pe-2"></i>{contact.address}</p>
                                                <p><i className="fa-solid fa-phone fa-lg pe-2"></i>{contact.phone}</p>
                                                <p><i className="fa-solid fa-envelope fa-lg pe-2"></i>{contact.email}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4 d-flex align-items-center">
                                        <div className="card-body d-flex align-items-center gap-3 justify-content-end me-3">
                                            <Link to={`/edit-contact/${contact.id}`} className="text-dark">
                                                <i className="fa-solid fa-pen-to-square fa-lg"></i>
                                            </Link>
                                            <button
                                                className="btn btn-link text-danger p-0 m-0"
                                                onClick={() => { handleOpenModal(contact.id) }}
                                            >
                                                <i className="fa-solid fa-trash fa-lg"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                }

                <DeleteModal show={showModal} onCancel={handleCancel} onDelete={handleDeleteContact} />
            </div>
        </div>
    )
}

