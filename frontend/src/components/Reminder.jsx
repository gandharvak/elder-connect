import { React, useState } from 'react'
import ReminderCard from './ReminderCard'
import MedicineReminderCard from './MedicineReminderCard'

const Reminder = () => {
  const reminder = [
    {
      title: 'Doctor Appointment',
      description: 'Annual physical check-up with Dr. Smith.',
      date: '2024-03-15',
      time: '10:00 AM'
    },
    {
      title: 'Doctor Appointment',
      description: 'Annual physical check-up with Dr. Smith.',
      date: '2024-03-15',
      time: '10:00 AM'
    },
    {
      title: 'Doctor Appointment',
      description: 'Annual physical check-up with Dr. Smith.',
      date: '2024-03-15',
      time: '10:00 AM'
    },
    {
      title: 'Doctor Appointment',
      description: 'Annual physical check-up with Dr. Smith.',
      date: '2024-03-15',
      time: '10:00 AM'
    }

  ]

  return (
    <>
      <div className='d-flex'>

      <div>
        <h3 className='text-center text-success'>Doctor Appointments</h3>
        <div className='d-flex justify-content-center align-items-center gap-2 flex-wrap'>
          {
            reminder.map((re, index) => {
              return (
                <ReminderCard date={re.date} time={re.time} title={re.title} description={re.description} />
              )
            })
          }
        </div>
      </div>

      <div>
        <h3 className='text-center text-success'>Medicine Reminder</h3>
        <div className='d-flex justify-content-center align-items-center gap-3 flex-wrap'>
          {
            reminder.map((re, index) => {
              return (
                <MedicineReminderCard time={re.time} title={re.title} description={re.description} />
              )
            })
          }
        </div>
      </div>

      </div>

    </>
  )
}

export default Reminder