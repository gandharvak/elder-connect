import React from 'react'

const MedicineReminderCard = ({title, description, time}) => {
    return (
        <div>
            <div className="card shadow-sm" style={{width: "18rem"}}>
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <div className='d-flex gap-2'>
                    <p className="card-text d-inline"><span className='fw-bold text-success'>Time: </span>{time}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default MedicineReminderCard