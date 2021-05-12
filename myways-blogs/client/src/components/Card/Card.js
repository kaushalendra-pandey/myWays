import React from 'react'

const Card = ({title,content}) => {
    return (
        <div className="card d-flex" style={{width: "18rem"}}>
            <img src="..." className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{content}</p>
                <a href="#" className="btn btn-primary">Read Full Blog..</a>
            </div>
        </div>

    )
}

export default Card
