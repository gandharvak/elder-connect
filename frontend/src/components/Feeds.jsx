import React from 'react'
import FeedsCard from './FeedsCard.jsx'
const Feeds = () => {
  const newsFeeds = [
    {
      userId: 'user1',
      image: 'image_url_1.jpg',
      news: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    {
      userId: 'user2',
      image: 'image_url_2.jpg',
      news: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
      userId: 'user3',
      image: 'image_url_3.jpg',
      news: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    },
    {
      userId: 'user3',
      image: 'image_url_3.jpg',
      news: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    },
    {
      userId: 'user3',
      image: 'image_url_3.jpg',
      news: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    },
    {
      userId: 'user3',
      image: 'image_url_3.jpg',
      news: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    },
  ];

  console.log(newsFeeds);

  return (
    <div>
      <h3 className='text-center text-success'>News Feed</h3>
      <div className='d-flex justify-content-center align-items-center flex-wrap gap-3'>
        {
          newsFeeds.map((news, index) => {
            return (
              <FeedsCard id={news.userId} path={news.image} news={news.news} />
            )
          })
        }
      </div>
    </div>
  )
}

export default Feeds