import { useState } from "react"
import { useHotel } from "../uttils/hotelContext"

function Check() {
    const { checkReservation, reservationCancel } = useHotel()
    const [roomData, setRoomData] = useState()
    const [data, setData] = useState({
        name: "",
        email: "",
        code: "",
    })
    const [error, setError] = useState({
        message: "",
        show: true,
        type: "error",
    })
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (data.name === "" || data.email === "" || data.code === "") {
            setError({ message: "All fields are required", show: true })
            return
        }
        const res = await checkReservation(data)
        if (res.error) {
            setError({ message: "Reservation Not Found", show: true })
            return
        }
        console.log(res)
        setRoomData(res)
    }
    const handleCancelReservation = async (e) => {
        e.preventDefault()
        if (roomData && roomData.reservation) {
            const res = await reservationCancel(data)
            if (res.error) {
                setError({ message: "Error Cancelling Reservation", show: true })
                return
            }
            console.log(res)
            setRoomData(null)
            setError({ message: "Reservation Canceled Successfully", show: true, type: "success" })
            setData({ name: "", email: "", code: "" })
        }
    }
    if (roomData && roomData.reservation) {
        let from = roomData.reservation.checkin.split("T")[0]
        let to = roomData.reservation.checkout.split("T")[0]
        return (
            <div className='flex flex-col p-5 justify-center items-center w-full h-full pb-[25%]'>

                <header className="mb-10 flex flex-col justify-center items-center">
                    <h1 className=' text-2xl w-full h-full text-center items-center flex justify-center text-white'>Your Reservation For Room Nr.{roomData.room.roomId}</h1>
                    <span>You can see your Reservataion</span>
                </header>

                <form action="" className='w-full h-full flex flex-col justify-center items-center'>
                    <div className="flex  gap-5 justify-center items-center w-full h-full mx-100">

                    <div className="rounded-lg flex flex-1  flex-col gap-5 justify-between items-center bg-background-400 bg-opacity-10 backdrop-blur-xl p-8 pt-0 shadow-lg lg:col-span-3 lg:p-12 lg:pt-6">
                        <img src={roomData.room.imageUrl} alt="Room image" />
                    </div>

                    <div className="rounded-lg flex flex-col gap-5 justify-between items-center bg-background-400 bg-opacity-10 backdrop-blur-xl p-8 pt-0 shadow-lg lg:col-span-3 lg:p-12 lg:pt-6">

                    <div className="flow-root text-text-100">
                                <dl className="my-3 divide-y divide-gray-100 text-sm">
                                    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                                        <dt className="font-medium">Name</dt>
                                        <dd className="text-text-200 sm:col-span-2">{roomData.reservation.name}</dd>
                                    </div>

                                    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                                        <dt className="font-medium ">Email</dt>
                                        <dd className="text-text-200 sm:col-span-2">{roomData.reservation.email}</dd>
                                    </div>

                                    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                                        <dt className="font-medium ">From</dt>
                                        <dd className="text-text-200  sm:col-span-2">{from}</dd>
                                    </div>

                                    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                                        <dt className="font-medium ">To</dt>
                                        <dd className="text-text-200  sm:col-span-2">{to}</dd>
                                    </div>

                                    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                                        <dt className="font-medium ">Code</dt>
                                        <dd className="text-text-200  sm:col-span-2">{roomData.reservation.code}</dd>
                                    </div>

                                    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                                        <dt className="font-medium ">Floor</dt>
                                        <dd className="text-text-200  sm:col-span-2">{roomData.room.floor}</dd>
                                    </div>
                                    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                                        <dt className="font-medium ">Room Number</dt>
                                        <dd className="text-text-200  sm:col-span-2">{roomData.room.roomId}</dd>
                                    </div>
                                    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                                        <dt className="font-medium ">Floor</dt>
                                        <dd className="text-text-200  sm:col-span-2">{roomData.room.type}</dd>
                                    </div>
                                    
                                </dl>
                                <button className="inline-block w-full rounded-md bg-indigo-600 px-5 py-3 font-medium text-white sm:w-auto"
                                onClick={handleCancelReservation}
                                >Canncel Reservation</button>
                            </div>

                        </div>
                    </div>
                </form>
            </div>
        )
    }

    return (
        <div className='flex flex-col p-5 justify-center items-center w-full h-full pb-[25%]'>

            <header className="mb-10">
                <h1 className=' text-2xl w-full h-full text-center items-center flex justify-center text-white'>Check Reservation</h1>
                <span>check your room reservation</span>
            </header>

            <form action="" className='w-full h-full flex flex-col justify-center items-center'>
                <div className="flex flex-col gap-5 flex-wrap justify-center items-center w-full h-full mx-100">


                    <div className="rounded-lg  bg-background-400 bg-opacity-10 backdrop-blur-xl p-8 shadow-lg lg:col-span-3 lg:p-12">
                        <form action="#" className="space-y-4">
                            <div>
                                <label className="sr-only" htmlFor="name">Name</label>
                                <input
                                    className="w-full border-gray-200 text-sm bg-transparent border-b shadow-sm sm:text-sm p-1 text-text-100 focus:outline-none"
                                    placeholder="Name"
                                    type="text"
                                    id="name"
                                    name="name"
                                    onChange={handleChange}
                                    value={data.name}
                                />
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <label className="sr-only" htmlFor="email">Email</label>
                                    <input
                                        className="w-full border-gray-200 text-sm bg-transparent border-b shadow-sm sm:text-sm p-1 text-text-100 focus:outline-none"
                                        placeholder="Email address"
                                        type="email"
                                        id="email"
                                        name="email"
                                        onChange={handleChange}
                                        value={data.email}
                                    />
                                </div>

                                <div>
                                    <label className="sr-only" htmlFor="code"> Reservation Code</label>
                                    <input
                                        className="w-full border-gray-200 text-sm bg-transparent border-b shadow-sm sm:text-sm p-1 text-text-100 focus:outline-none"
                                        placeholder="Reservation Code"
                                        type="text"
                                        id="code"
                                        maxLength={10}
                                        name="code"
                                        onChange={handleChange}
                                        value={data.code}
                                    />
                                </div>
                            </div>

                            <p className={error.type === "success" ? "text-green-400" : "text-rose-400"}>{error.message}</p>

                            <div className="mt-4">
                                <button
                                    type="submit"
                                    className="inline-block w-full rounded-md bg-indigo-600 px-5 py-3 font-medium text-white sm:w-auto"
                                    onClick={handleSubmit}
                                >
                                    Check Room
                                </button>
                            </div>

                        </form>

                    </div>
                </div>
            </form>
        </div>
    )
}

export default Check
