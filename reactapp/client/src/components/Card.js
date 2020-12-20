import React from "react";

export default function Card(props) {
    return (
        <div className="card mb-3" style={{maxWidth: 540}}>
            <div className="row g-0">
                <div className="col-md-4">
                    <img src={props.image} alt="book image"/>
                </div>
                <div className="col-md-8">
                    <div className="card-body" data-bs-spy="scroll" data-bs-target="#navbar-example2" data-bs-offset="0" tabindex="0">
                        <h5 className="card-title">{props.title}</h5>
                        <p className="card-text">By: {props.author}</p>
                        <p className="card-text">{props.description}</p>
                        <a href={props.link} className="btn btn-primary">View Book</a>
                        <a href="#" className="btn btn-primary">Save</a>
                    </div>
                </div>
            </div>
        </div>
    )
};