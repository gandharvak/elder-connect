import React, { useEffect, useState } from 'react'
import FeedsCard from './FeedsCard.jsx'
import axios from 'axios';

const Feeds = () => {

  const [newsFeeds, setNewsFeeds] = useState();

  useEffect(() => {
    const apiUrl = 'http://localhost:8000/api/v1/user/feedUsers';

    // Your Bearer token (replace 'your_token_here' with your actual token)
    const token = localStorage.getItem("token");

    // Making the GET request with the Authorization header
    axios.get(apiUrl, {
      headers: {
        // Include the Authorization header with your Bearer token
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        // Handle the response here
        console.log('Success:', response.data.data);
        setNewsFeeds(response.data.data);
      })
      .catch(error => {
        // Handle any errors here
        console.error('Error:', error);
      });
  },[])

  return (
    <div>
      {
        localStorage.getItem("token") ? 
        <>

          <h3 className='text-center text-success mt-2'>You may like to connect with these people:</h3>
        <div className='d-flex justify-content-center align-items-center flex-wrap gap-3'>
        {
          newsFeeds?.map((data, index) => {
            return (
              <FeedsCard email={data.emailId} locality={data.locality} name={data.name} />
            )
          })
        }
      </div> 
        </>
        :
      <h4 className='text-center text-success mt-2'>Login Please</h4>

      }

    </div>
  )
}

export default Feeds