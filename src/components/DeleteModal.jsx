import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { deleteContact } from "../services/contactsApi.js";

export default function DeleteModal() {
    const { store, dispatch } = useGlobalReducer();
    const { isOpen, contactId, contactName } = store.deleteModal;

    if (!isOpen) return null;

    async function confirmDeleteContact() {
        try {
            await deleteContact(contactId);
            dispatch({ type: 'storeDeleteContact', payload: { id: contactId } });
        } catch (err) {
            console.error(err);
            alert("Error eliminando el contacto");
        } finally {
            dispatch({ type: 'closeDeleteModal' });
        }
    }

    return (
        <div className="modal show d-block" tabIndex="-1" role="dialog" aria-modal="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title"><i className="fa-solid fa-triangle-exclamation me-2"></i>Confirmar</h5>
                        <button type="button" className="btn-close" onClick={() => dispatch({ type: 'closeDeleteModal' })}></button>
                    </div>
                    <div className="modal-body">
                        <p>¿Seguro que deseas eliminar a <strong>{contactName}</strong>?</p>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" onClick={() => dispatch({ type: 'closeDeleteModal' })}>
                            Cancelar
                        </button>
                        <button className="btn btn-danger" onClick={confirmDeleteContact}>
                            <i className="fa-solid fa-trash me-2"></i>Eliminar
                        </button>
                    </div>
                </div>
            </div>
            <div className="modal-backdrop show"></div>
        </div>
    );
}
