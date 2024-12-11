import { Route, Routes } from 'react-router-dom'
import Home from "./pages/home.jsx"
import SideBar from './components/sidebar.jsx'
import Fillter from './pages/Fillter.jsx'
import RoomRouter from "./components/roomRouter.jsx"
import Err from "./pages/errorPage.jsx"
import Reservation from './pages/reservation.jsx'
import Check from './pages/check.jsx'
import {HotelProvider} from './uttils/hotelContext.jsx'
function App() {

  return (

    <div className=' flex flex-row bg-background-900 gradiand-bg text-text-100'>
      <HotelProvider>
        <SideBar />
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/Rent" element={<Fillter />} />
          <Route path="/Check" element={<Check />} />
          <Route path="/:id/room" element={<RoomRouter />} />
          <Route path="/:id/room/reservation" element={<Reservation />} />
          <Route path="*" element={<Err />} />

        </Routes>
      </HotelProvider>
    </div>

  )
}

export default App
