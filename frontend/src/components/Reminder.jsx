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

  
  const medicine = [
    {
      title: 'Atorvastatin',
      description: 'Jevna Adhi Ardhi',
      time: '10:00 AM'
    },
    {
      title: 'Metformin ',
      description: 'Jevna Nantar 1 tasani',
      time: '10:00 AM'
    },
    {
      title: 'Amlodipine ',
      description: 'Javna Nantar lagech',
      time: '10:00 AM'
    }
  ]

  return (
    <>
      <div className='d-flex container'>
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
            medicine.map((re, index) => {
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