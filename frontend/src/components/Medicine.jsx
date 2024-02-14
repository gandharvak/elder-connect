import {React, useState} from 'react'

const Medicine = () => {
  const [medName, setMedName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [time, setTime] = useState('');

  // Step 3: Create onChange handler functions
  const handleMedNameChange = (event) => {
    setHospitalName(event.target.value);
  };

  const handleQuantityChange = (event) => {
    setReason(event.target.value);
  };

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <>
     <form className='mt-3'>
        <div className="mb-3">
          <label htmlFor="medName" className="form-label">Medicine Name</label>
          <input type="text" className="form-control" id="medName" onChange={handleMedNameChange} />
        </div>

        <div class="mb-3">
          <label for="quantity" class="form-label">Quantity</label>
          <input type='number' class="form-control" id="quantity" rows="3" onChange={handleQuantityChange}/>
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

export default Medicine