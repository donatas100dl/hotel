import Card from '../components/card.jsx'
import { useHotel } from '../uttils/hotelContext.jsx';
import { useEffect, useState } from 'react';
function Home() {
  const {hotel} = useHotel()
  const [rooms, setRooms] = useState([])

  useEffect( () => {
    if(hotel) setRooms(hotel.rooms)
    console.log(hotel)
  },[hotel])
  return (
    <>
    <div className='flex flex-col bg-background text-text w-full p-5'>
      <div className="flex flex-col justify-center items-center w-full">
        <h1 className='text-4xl font-bold'>Hotels</h1>
        <p className=''>Welcome to the React Hotel!</p>
      </div>
      <div className='h-full w-full flex flex-col gap-2'> 
        <h2 className=' text-2xl font-bold '>Featured Hotels</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
          {
            rooms && rooms.length > 0  ? 
            rooms.map((room, index) => (
              <Card key={index} id={room._id} roomData={room}/>
            )) :
            <p>No Hotels found</p>
          }
        </div>
      </div>
    </div>
    </>
  )
}

export default Home
