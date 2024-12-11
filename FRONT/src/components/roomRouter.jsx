import { useEffect, useState } from "react";
import Room from "../pages/room.jsx";
import { useHotel } from "../uttils/hotelContext.jsx";
import { useParams  } from "react-router-dom";
function RoomRouter() {
    const { hotel } = useHotel();
    const [roomData, setRoomData ] = useState([]);
    const { id } = useParams();
    useEffect( () => {
        if (hotel) {
         setRoomData(hotel.rooms.find((r) => r._id == (id)))
         console.log(roomData, hotel.rooms);
        }
    },[hotel])
    return (
        roomData ? <Room roomData={roomData}/> : <>{ "Loading..." }</>
    );
}

export default RoomRouter;
