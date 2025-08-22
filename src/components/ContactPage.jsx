import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import useGlobalReducer from '../hooks/useGlobalReducer';


const FormContact = (props) => {
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();
    const params = useParams();


    const [inputs, setInputs] = useState({
        name: '',
        email: '',
        phone: '',
        address: ''
    });

    const handleChange = (event) => {
        const name = event.target.id;
        const value = event.target.value;
        setInputs({ ...inputs, [name]: value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(
                `https://playground.4geeks.com/contact/agendas/jonathan-cr/contacts${params.hasOwnProperty('contactId') ? '/'+params.contactId : ''}`,
                {
                    method: `${params.hasOwnProperty('contactId') ? 'PUT' : 'POST'}`,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(inputs),
                }
            );

            const dataJson = await response.json();
            console.log('Guardado en API:', dataJson);
            navigate('/');
        } catch (e) {
            console.log('Error al guardar contacto:', e);
        }
    };

    useEffect(()=>{
        if (params.hasOwnProperty('contactId')){
            const contactId = store.contacts.filter(e=>e.id === Number(params.contactId));
            setInputs({...contactId[0]});
        }
    },[])

    

    return (
        <div className='container'>
            <h1 className='text-center'>{props.title}</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <input type="text" className="form-control" id="name"
                        onChange={handleChange} placeholder='Full Name' value={inputs.name} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email"
                        onChange={handleChange} placeholder='Enter Email' value={inputs.email} />
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input type="number" className="form-control" id="phone" value={inputs.phone}
                        onChange={handleChange} placeholder='Enter Phone' />
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input type="text" className="form-control" id="address" value={inputs.address}
                        onChange={handleChange} placeholder='Enter Address' />
                </div>
                <button type='submit' className="btn btn-primary w-100">
                    Submit
                </button>
                <Link to="/">or get back to contacts</Link>
            </form>
        </div>
    )
}

export default FormContact