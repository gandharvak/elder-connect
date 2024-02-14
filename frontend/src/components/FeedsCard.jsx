import React from 'react'

const FeedsCard = ({path, id, news}) => {
    return (
        <div className="card shadow-sm" style={{width: "18rem"}}>
            <img src={path} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title text-success">{id}</h5>
                    <p className="card-text">{news}</p>
                </div>
        </div>
    )
}

export default FeedsCard