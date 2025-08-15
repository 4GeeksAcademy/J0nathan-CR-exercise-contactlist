import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { getContacts, deleteContact } from "../services/contactsApi.js";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";

export const Home = () => {
	const { store, dispatch } = useGlobalReducer();

	useEffect(() => {
		(async () => {
			try {
				const list = await getContacts();
				dispatch({ type: "storeContact", payload: { contacts: list } });
			} catch (err) {
				console.error("Error al traer contactos:", err);
			}
		})();
	}, [dispatch]);

	const handleDelete = async (id) => {
		try {
			await deleteContact(id);
			dispatch({ type: "storeDeleteContact", payload: { id } });
		} catch (err) {
			console.error("Error al borrar contacto:", err);
		}
	};

	return (
		<div className="container py-4">
			<div className="card">
				<ul className="list-group list-group-flush">
					{store.contacts?.map((c) => (
						<li key={c.id} className="list-group-item py-3">
							<div className="d-flex align-items-center justify-content-between">
								<div className="d-flex align-items-center">
									<img
										src={rigoImageUrl}
										alt="avatar"
										className="rounded-circle me-3"
										style={{ width: 80, height: 80, objectFit: "cover" }}
									/>
									<div>
										<h5 className="mb-1">{c.full_name}</h5>
										<p className="mb-1">
											<i className="fas fa-map-marker-alt me-2 text-muted" />
											{c.address}
										</p>
										<p className="mb-1">
											<i className="fas fa-phone me-2 text-muted" />
											{c.phone}
										</p>
										<p className="mb-0">
											<i className="fas fa-envelope me-2 text-muted" />
											{c.email}
										</p>
									</div>
								</div>
								<div>
									<button
										className="btn btn-outline-secondary btn-sm me-2"
										onClick={() =>
											dispatch({
												type: "gotoEditContact",
												payload: { contact: c },
											})
										}
									>
										<i className="fas fa-pen" />
									</button>
									<button
										className="btn btn-outline-danger btn-sm"
										onClick={() => handleDelete(c.id)}
									>
										<i className="fas fa-trash" />
									</button>
								</div>
							</div>
						</li>
					))}
					{!store.contacts?.length && (
						<li className="list-group-item text-center text-muted">
							No hay contactos todavía
						</li>
					)}
				</ul>
			</div>
		</div>
	);
};
