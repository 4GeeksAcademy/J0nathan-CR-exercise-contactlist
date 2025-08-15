import { Link, useNavigate } from "react-router-dom";
import { addContact } from "../services/contactsApi.js";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useState } from "react";

export const AddContact = () => {
    const navigate = useNavigate();
    const { dispatch } = useGlobalReducer();

    const [form, setForm] = useState({
        full_name: "",
        email: "",
        phone: "",
        address: "",
    });

    const contactFormHandle = async (e) => {
        e.preventDefault();
        try {
            const created = await addContact(form);
            dispatch({ type: "storeContact", payload: { contact: created } });
            navigate("/");
        } catch (err) {
            console.error("Error creando contacto:", err);
            alert("No se pudo crear el contacto");
        }
    };

    const onChange = (e) => {
        setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    };

    return (
        <div className="container py-5">
            <h1 className="display-6 text-center mb-4">Add a new contact</h1>
            <div className="row justify-content-center">
                <div className="col-12 col-md-10 col-lg-8">
                    <form className="card p-4" onSubmit={contactFormHandle}>
                        <div className="mb-3">
                            <label className="form-label">Full Name</label>
                            <input
                                name="full_name"
                                type="text"
                                className="form-control"
                                placeholder="Full Name"
                                value={form.full_name}
                                onChange={onChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input
                                name="email"
                                type="email"
                                className="form-control"
                                placeholder="Enter email"
                                value={form.email}
                                onChange={onChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Phone</label>
                            <input
                                name="phone"
                                type="text"
                                className="form-control"
                                placeholder="Enter phone"
                                value={form.phone}
                                onChange={onChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="form-label">Address</label>
                            <input
                                name="address"
                                type="text"
                                className="form-control"
                                placeholder="Enter address"
                                value={form.address}
                                onChange={onChange}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100 mb-2">
                            save
                        </button>
                        <Link to="/" className="text-decoration-underline">
                            or get back to contacts
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
};
