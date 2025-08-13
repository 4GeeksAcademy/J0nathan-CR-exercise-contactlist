import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useNavigate } from "react-router-dom";

export const Home = () => {
	const { store, dispatch } = useGlobalReducer();
	const navigate = useNavigate();

	const handleDelete = (id) => {
		dispatch({ type: "delete_contact", payload: { id } });
	};

	return (
		<div className="container py-4">
			<div className="card">
				<ul className="list-group list-group-flush">
					{store.contacts.length === 0 && (
						<li className="list-group-item text-center text-muted">
							<i className="fas fa-address-book me-2"></i>No hay contactos
						</li>
					)}

					{store.contacts.map((c) => (
						<li key={c.id} className="list-group-item py-3">
							<div className="d-flex align-items-center justify-content-between">
								<div className="d-flex align-items-center">
									<img
										src={rigoImageUrl}
										alt="avatar"
										className="rounded-circle me-3"
										style={{ width: "80px", height: "80px", objectFit: "cover" }}
									/>
									<div>
										<h5 className="mb-1">{c.fullName}</h5>
										<p className="mb-1">
											<i className="fas fa-map-marker-alt me-2 text-muted"></i>
											{c.address}
										</p>
										<p className="mb-1">
											<i className="fas fa-phone me-2 text-muted"></i>
											{c.phone}
										</p>
										<p className="mb-0">
											<i className="fas fa-envelope me-2 text-muted"></i>
											{c.email}
										</p>
									</div>
								</div>
								<div>
									<button
										className="btn btn-outline-secondary btn-sm me-2"
										onClick={() => navigate(`/add-contact?id=${c.id}`)}
									>
										<i className="fas fa-pen"></i>
									</button>
									<button
										className="btn btn-outline-danger btn-sm"
										onClick={() => handleDelete(c.id)}
									>
										<i className="fas fa-trash"></i>
									</button>
								</div>
							</div>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};