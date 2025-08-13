import { Link, useNavigate, useSearchParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useState, useEffect } from "react";

export const AddContact = () => {
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const editId = searchParams.get("id");

    const [form, setForm] = useState({
        fullName: "",
        email: "",
        phone: "",
        address: "",
    });

    useEffect(() => {
        if (editId) {
            const contact = store.contacts.find((c) => c.id === editId);
            if (contact) {
                setForm({
                    fullName: contact.fullName,
                    email: contact.email,
                    phone: contact.phone,
                    address: contact.address,
                });
            }
        }
    }, [editId, store.contacts]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSave = (e) => {
        e.preventDefault();
        if (editId) {
            dispatch({ type: "update_contact", payload: { id: editId, data: form } });
        } else {
            dispatch({ type: "add_contact", payload: form });
        }
        navigate("/");
    };

    return (
        <div className="container py-5">
            <h1 className="display-6 text-center mb-4">
                {editId ? "Edit contact" : "Add a new contact"}
            </h1>
            <div className="row justify-content-center">
                <div className="col-12 col-md-10 col-lg-8">
                    <form className="card p-4" onSubmit={handleSave}>
                        <div className="mb-3">
                            <label className="form-label">
                                <i className="fas fa-user me-2"></i>Full Name
                            </label>
                            <input
                                type="text"
                                name="fullName"
                                value={form.fullName}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Full Name"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">
                                <i className="fas fa-envelope me-2"></i>Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Enter email"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">
                                <i className="fas fa-phone me-2"></i>Phone
                            </label>
                            <input
                                type="text"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Enter phone"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="form-label">
                                <i className="fas fa-map-marker-alt me-2"></i>Address
                            </label>
                            <input
                                type="text"
                                name="address"
                                value={form.address}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Enter address"
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100 mb-2">
                            <i className="fas fa-save me-2"></i>Save
                        </button>
                        <Link to="/" className="text-decoration-underline">
                            <i className="fas fa-arrow-left me-2"></i>Back to contacts
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
};