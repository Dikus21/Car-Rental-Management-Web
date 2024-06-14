function CarEditModal({
                          showEditModal,
                          setShowEditModal,
                          updateCar,
                          handleChange,
                          handleUpdate,
                      }) {
    return (
        showEditModal && (
            <div
                className="modal d-flex justify-content-center align-items-center"
                id="carEditModal"
            >
                <div className="modal-content-edit">
                    <div className="container mt-5">
                        <form onSubmit={handleUpdate}>
                            <div className="row mb-3">
                                <div className="col-3">
                                    <label htmlFor="model" className="form-label">
                                        Model
                                    </label>
                                </div>
                                <div className="col">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="model"
                                        name="model"
                                        value={updateCar.model}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-3">
                                    <label htmlFor="type" className="form-label">
                                        Type
                                    </label>
                                </div>
                                <div className="col">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="type"
                                        name="type"
                                        value={updateCar.type}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-3">
                                    <label htmlFor="rentPerDay" className="form-label">
                                        Rent per Day
                                    </label>
                                </div>
                                <div className="col">
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="rentPerDay"
                                        name="rentPerDay"
                                        value={updateCar.rentPerDay}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-3">
                                    <label htmlFor="image" className="form-label">
                                        Image
                                    </label>
                                </div>
                                <div className="col">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="image"
                                        name="image"
                                        value={updateCar.image}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="d-flex justify-content-center">
                                <div className="row">
                                    <div className="col-6">
                                        <button type="submit" className="confirmEditBtn btn btn-dark-blue text-light">
                                            Submit
                                        </button>
                                    </div>
                                    <div className="col-6">
                                        <button
                                            className="cancelEditBtn btn btn-light btn-outline-primary fw-bold"
                                            type="button"
                                            onClick={() => setShowEditModal(false)}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    );
}

export default CarEditModal;
