import React from 'react'

const FeedsCard = ({email, locality, name}) => {
    return (
        <div className="card shadow-sm" style={{width: "18rem"}}>
                <div className="card-body">
                    <h5 className="card-title text-success">{name}</h5>
                    <p className="card-text">{locality}</p>
                    <p className="card-text">{email}</p>
                </div>
        </div>
    )
}

export default FeedsCard