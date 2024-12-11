/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { useHotel } from "../uttils/hotelContext.jsx";
import { useParams } from "react-router-dom";
function Reservation() {
    const options = ["Option 1", "Option 2", "Option 3"]
    const { hotel, makeReservation, checkDateAvailable } = useHotel();
    const { id } = useParams();
    const [data, setData] = useState({
        name: "",
        email: "",
        phone: "",
        date: {
            from: "",
            to: ""
        },
        option: 1,
        optionText: "",
        payload: null,
        isDateAvailable: true,
        dateAvailableErrMsg: "Date is not available"

    })
    const [roomData, setRoomData] = useState(null)
    useEffect(() => {
        if (hotel) {
            setRoomData(hotel.rooms.find((r) => r._id == (id)))
        }
        console.log(roomData, hotel.rooms);
    }, [hotel])

    useEffect(() => {
        checkDate()

    }, [data.date])

    const handleInputChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    const handleDateSelect = (e) => {
        const name = e.target.name.split(".")[1]
        setData({ ...data, date: { ...data.date, [name]: e.target.value } })
        console.log(data)

    }
    const handleRadioChange = (e) => {
        setData({ ...data, option: parseInt(e.target.value) })

    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        setData({ ...data, optionText: options[data.option - 1] })

        if (!data.name || !data.email || !data.phone || !data.date.from || !data.date.to) {

            if (!data.date.to || !data.date.from) {
                setData({ ...data, isDateAvailable: false })
            }

            alert("Please fill in all required fields")
            return
        }

        const res = await makeReservation({
            name: data.name,
            email: data.email,
            date: {
                from: data.date.from,
                to: data.date.to
            },
            id
        })
        if (res) setData({ ...data, payload: res })
        console.log("reservation made", res)

    }
    const checkDate = async () => {
        if (data.date.to && data.date.from) {
            if (await checkDateAvailable(data.date, id) === false) {
                setData({ ...data, isDateAvailable: false })
            }
            else {
                setData({ ...data, isDateAvailable: true })
            }
        }
    }
    if (!roomData) {
        return <div>Loading</div>
    }

    if (data.payload) {
        return (
            <div className='flex flex-col p-5 justify-center items-center w-full h-full pb-28'>
                <h1 className='text-2xl w-full h-full text-center items-center flex justify-center mb-24'>Room Reserved</h1>
                <form action="" className='w-full h-full flex flex-col justify-center items-center'>
                    <div className="flex flex-col gap-5 flex-wrap justify-center items-center w-full h-full mx-100">

                        <div className="rounded-lg flex flex-col gap-5 justify-between items-center bg-background-400 bg-opacity-10 backdrop-blur-xl p-8 pt-0 shadow-lg lg:col-span-3 lg:p-12 lg:pt-6">
                        <h2>Reservation info</h2>
                            <div className="flow-root text-text-100">
                                <dl className="-my-3 divide-y divide-gray-100 text-sm">
                                    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                                        <dt className="font-medium">Name</dt>
                                        <dd className="text-text-200 sm:col-span-2">{data.payload.name}</dd>
                                    </div>

                                    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                                        <dt className="font-medium ">Email</dt>
                                        <dd className="text-text-200 sm:col-span-2">{data.payload.email}</dd>
                                    </div>

                                    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                                        <dt className="font-medium ">From</dt>
                                        <dd className="text-text-200  sm:col-span-2">{data.payload.checkin}</dd>
                                    </div>

                                    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                                        <dt className="font-medium ">To</dt>
                                        <dd className="text-text-200  sm:col-span-2">{data.payload.checkout}</dd>
                                    </div>

                                    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                                        <dt className="font-medium ">Code</dt>
                                        <dd className="text-text-200  sm:col-span-2">
                                            {data.payload.code}
                                        </dd>
                                    </div>
                                </dl>
                            </div>

                        </div>
                    </div>
                </form>
            </div>
        )
    }

    return (

        <div className='flex flex-col p-5 justify-center items-center w-full h-full pb-28'>
            <h1 className='text-2xl w-full h-full text-center items-center flex justify-center mb-10'>Room Reservation</h1>
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
                                    onChange={handleInputChange}
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
                                        onChange={handleInputChange}
                                        value={data.email}
                                    />
                                </div>

                                <div>
                                    <label className="sr-only" htmlFor="phone">Phone</label>
                                    <input
                                        className="w-full border-gray-200 text-sm bg-transparent border-b shadow-sm sm:text-sm p-1 text-text-100 focus:outline-none"
                                        placeholder="Phone Number"
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        onChange={handleInputChange}
                                        value={data.phone}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-3">
                                <div >
                                    <label
                                        htmlFor="Option1"
                                        className="block w-full transition-all cursor-pointer rounded-md border border-gray-200 p-3 text-text-200 hover:border-indigo-500 has-[:checked]:border-none has-[:checked]:bg-indigo-600 has-[:checked]:text-white"
                                        tabIndex="0"
                                    >
                                        <input className="sr-only" id="Option1" type="radio" tabIndex="-1" name="option"
                                            value={1}
                                            checked={data.option === 1}
                                            onClick={handleRadioChange}
                                        />

                                        <span className="text-sm"> Option 1 </span>
                                    </label>
                                </div>

                                <div>
                                    <label
                                        htmlFor="Option2"
                                        className="block w-full transition-all cursor-pointer rounded-md border border-gray-200 p-3 text-text-200 hover:border-indigo-500 has-[:checked]:border-none has-[:checked]:bg-indigo-600 has-[:checked]:text-white"
                                        tabIndex="0"
                                    >
                                        <input className="sr-only" id="Option2" type="radio" tabIndex="-1" name="option"
                                            checked={data.option === 2}
                                            onClick={handleRadioChange}
                                            value={2}
                                        />

                                        <span className="text-sm"> Option 2 </span>
                                    </label>
                                </div>

                                <div>
                                    <label
                                        htmlFor="Option3"
                                        className="block w-full transition-all cursor-pointer rounded-md border border-gray-200 p-3 text-text-200 hover:border-indigo-500 has-[:checked]:border-none has-[:checked]:bg-indigo-600 has-[:checked]:text-white"
                                        tabIndex="0"
                                    >
                                        <input className="sr-only" id="Option3" type="radio" tabIndex="-1" name="option"
                                            checked={data.option === 3}
                                            onClick={handleRadioChange}
                                            value={3}
                                        />

                                        <span className="text-sm"> Option 3 </span>
                                    </label>
                                </div>
                            </div>

                            <div className="space-y-2 w-full" >
                                <div className="rounded-md border-gray-200">
                                    <div className="border-t border-gray-200 p-4">
                                        <div className="flex justify-between gap-2">
                                            <label htmlFor="FilterPriceFrom" className="flex items-center gap-2">
                                                <span className="text-sm text-white">From</span>

                                                <input
                                                    type="date"
                                                    id="FilterPriceFrom"
                                                    placeholder="From"
                                                    className="w-full  bg-transparent border-b-[1px] shadow-sm sm:text-sm p-1 text-text-100 focus:outline-none"
                                                    name="date.from"
                                                    onChange={handleDateSelect}
                                                    value={data.date.from}
                                                />
                                            </label>
                                            <div className="w-[1px] rounded-xl bg-text-100"></div>

                                            <label htmlFor="FilterPriceTo" className="flex items-center gap-2">
                                                <span className="text-sm text-white">To</span>

                                                <input
                                                    type="date"
                                                    id="FilterPriceTo"
                                                    placeholder="To"
                                                    className="w-full  bg-transparent border-b-[1px] shadow-sm sm:text-sm p-1 text-text-100 focus:outline-none"
                                                    name="date.to"
                                                    onChange={handleDateSelect}
                                                    value={data.date.to}
                                                />
                                            </label>
                                        </div>
                                        <p className="text-[12px] text-red-400">{!data.isDateAvailable ? data.dateAvailableErrMsg : ""}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-5 flex flex-col gap-3 ">
                                <span className="text-xl text-white">Price Listing</span>
                                <ul className="w-[55%] border-b border-text-200">
                                    <li className="flex gap-2">
                                        <span>Room cost: </span>
                                        <span>${roomData.price}</span>
                                    </li>
                                    <li className="flex gap-2">
                                        <span>Procecing fees: </span>
                                        <span>$100</span>
                                    </li>
                                    <li className="flex gap-2">
                                        <span>Parking fees: </span>
                                        <span>$100</span>
                                    </li>
                                    <li className="flex gap-2">
                                        <span>Food and Beverage: </span>
                                        <span>$100</span>
                                    </li>
                                </ul>

                                <span className="text-white">
                                    Total: <span className="text-md text-text-200">${roomData.price + 300}</span>
                                </span>

                            </div>

                            <div className="mt-4">
                                <button
                                    type="submit"
                                    className="inline-block w-full rounded-md bg-indigo-600 px-5 py-3 font-medium text-white sm:w-auto"
                                    onClick={handleSubmit}
                                >
                                    Reserve Room
                                </button>
                            </div>

                        </form>

                    </div>
                </div>
            </form>
        </div>
    )
}

export default Reservation
