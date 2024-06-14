import React, {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";

export default function () {
    const [car, setCar] = useState({
        model: "",
        rentPerDay: "",
        type: "",
        image: "",
        createdAt: new Date().toISOString(),
    });
    const [submitted, setSubmitted] = useState(false);
    const navigate = useNavigate();
    const createdAt = new Date().toISOString();

    function handleChange(event) {
        const {name, value} = event.target;
        setCar(prevCar => ({
            ...prevCar,
            [name]: value
        }));
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log(car);
        fetch("http://localhost:8000/cars/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(car),
        }).then(() => {
            setCar({model: '', rentPerDay: '', image: '', createdAt: '', type: ''});
            console.log("add car successfully");
            setSubmitted(true);
        })
    }

    useEffect(() => {
        if (submitted) {
            navigate('/admin/cars', {state: {notificationMessage: "Car added successfully!", notificationColor: "green"}});
            setCar({model: '', rentPerDay: ''});
            setSubmitted(false);
        }
    }, [submitted, navigate]);


    return (
        <div className="ms-2">
            <p className="mt-4 d-flex align-items-center gap-1">
                <b>Cars</b>
                <i
                    data-feather="chevron-right"
                    width="20"
                    height="20"
                    className="mt-1"
                />
                <b>List Car</b>
                <i
                    data-feather="chevron-right"
                    width="20"
                    height="20"
                    className="mt-1"
                />
                Add New Car
            </p>
            <div className="container mt-5">
                <form onSubmit={handleSubmit}>
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
                                value={car.model}
                                placeholder="Car Model"
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
                                value={car.type}
                                placeholder="Car Type"
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-3">
                            <label htmlFor="rentPerDay" className="form-label">
                                Price
                            </label>
                        </div>
                        <div className="col">
                            <input
                                type="number"
                                className="form-control"
                                id="rentPerDay"
                                name="rentPerDay"
                                value={car.rentPerDay}
                                placeholder="Price"
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
                                placeholder="Image URL"
                                value={car.image}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-3">
                            <label htmlFor="startRent" className="form-label">
                                Start Rent
                            </label>
                        </div>
                        <div className="col">-</div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-3">
                            <label htmlFor="finishRent" className="form-label">
                                Finish Rent
                            </label>
                        </div>
                        <div className="col">-</div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-3">
                            <label htmlFor="createdDate" className="form-label">
                                Created at
                            </label>
                        </div>
                        <div className="col">-</div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-3">
                            <label htmlFor="updatedDate" className="form-label">
                                Updated at
                            </label>
                        </div>
                        <div className="col">-</div>
                    </div>
                    <div className="container-fluid d-flex gap-3">
                        <Link to="/admin/cars" className="btn btn-light border-dark-blue text-dark-blue fw-bold rounded-1">
                            Cancel
                        </Link>
                        <button type="submit" className="btn btn-dark-blue text-white fw-bold rounded-1">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
