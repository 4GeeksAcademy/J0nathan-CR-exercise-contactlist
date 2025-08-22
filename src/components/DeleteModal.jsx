
const DeleteModal = (props) => {

    const attribute = props.show ? {'modal-area':'true', role:'dialog'} : {'area-hidden':'true'};

    return (
        <div
            className={`modal fade ${props.show ? 'show d-block' : 'd-none'}`}
            id="exampleModal"
            tabIndex={-1}
            aria-labelledby="exampleModalLabel"
            {...attribute}
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">
                            Delete Contact
                        </h1>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            onClick={props.onCancel}
                        />
                    </div>
                    <div className="modal-body">
                        Do you want to delete the Contact?
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                            onClick={props.onCancel}
                        >
                            Close
                        </button>
                        <button type="button" className="btn btn-danger" onClick={props.onDelete}>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default DeleteModal