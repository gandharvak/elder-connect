import {React, useState} from 'react'

const DoctorAppointment = () => {
    const [hospitalName, setHospitalName] = useState('');
    const [reason, setReason] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
  
    // Step 3: Create onChange handler functions
    const handleHospitalNameChange = (event) => {
      setHospitalName(event.target.value);
    };
  
    const handleReasonChange = (event) => {
      setReason(event.target.value);
    };
  
    const handleDateChange = (event) => {
      setDate(event.target.value);
    };
  
    const handleTimeChange = (event) => {
      setTime(event.target.value);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      console.log({ hospitalName, reason, date, time });
    };
  return (
    <>
      <form>
        <div className="mb-3">
          <label htmlFor="hospitalName" className="form-label">Hospital Name</label>
          <input type="text" className="form-control" id="hospitalName" onChange={handleHospitalNameChange} />
        </div>

        <div class="mb-3">
          <label for="reason" class="form-label">Reason for Appointment</label>
          <textarea class="form-control" id="reason" rows="3" onChange={handleReasonChange}></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="date" className="form-label">Date</label>
          <input type="date" className="form-control" id="date" onChange={handleDateChange} />
        </div>

        <div className="mb-3">
          <label htmlFor="time" className="form-label">Time</label>
          <input type="time" className="form-control" id="time" onChange={handleTimeChange} />
        </div>

        <button type="submit" className="btn btn-success" onClick={handleSubmit}>Submit</button>


      </form>
    </>
  )
}

export default DoctorAppointment