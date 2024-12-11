import '../index.css'
import { Link, useLocation } from 'react-router-dom';

export default function room({roomData}) {
    const location = new useLocation();
    console.log(roomData)

    const getRoomtype = () => {
        if(roomData.type === 1) return 'Single Room'
        if(roomData.type === 2) return 'Double Room'
        if(roomData.type === 3) return 'Family Room'
        if(roomData.type === 4) return 'Deluxe Room'
        return 'Unknown Room'
    }

    const getBedSizes = () => {
        if(roomData.type === 1) return 'Single'
        if(roomData.type === 2) return 'Single, Double'
        if(roomData.type === 3) return 'Single, Double, Family'
        if(roomData.type === 4) return 'Single, Double, Family, Deluxe'
        return 'No beds'
    }

    return (
        <div className='h-full overflow-x-hidden flex flex-col p-4 gap-10'>
            <div href="#" className="flex gap-5 rounded-lg  backdrop-blur-xl h-full">
                <ul className='flex flex-col gap-3'>
                    <li>
                        <img src={roomData.imageUrl} alt="img"
                            className='w-[100px] rounded-md border-2 border-blue-600 '
                        />
                    </li>
                    <li>
                        <img src="https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" alt="img"
                            className='w-[100px] rounded-md opacity-45 cursor-pointer'
                        />
                    </li>
                    <li>
                        <img src="https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" alt="img"
                            className='w-[100px] rounded-md opacity-45 cursor-pointer'
                        />
                    </li>
                </ul>
                <img
                    alt=""
                    src={roomData.imageUrl}
                    className="h-[450px] rounded-md object-cover cursor-pointer"
                />

                <div className="mt-2  flex flex-wrap flex-col justify-between">
                    <div className="flex flex-col">
                        <section>
                            <div>
                                <span className="text-sm text-secondary-200">{`$${roomData.price}`}</span>
                            </div>

                            <div>
                                <span className="font-medium">{`Room Nr. ${roomData.roomId} On Floor ${roomData.floor}`}</span>
                            </div>
                        </section>

                        <div className="mt-6 flex items-center gap-8 text-xs flex-wrap">
                        <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                            <svg
                                className="size-4 text-indigo-700"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                                />
                            </svg>

                            <div className="mt-1.5 sm:mt-0">
                                <p className={roomData.hasBalcony ? "text-lime-400" : "text-rose-400" }>Balcony</p>

                                {/* <p className="font-medium">2 spaces</p> */}
                            </div>
                        </div>

                        <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                            <svg
                                className="size-4 text-indigo-700"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                                />
                            </svg>

                            <div className="mt-1.5 sm:mt-0">
                                <p className={roomData.hasBreakfast ? "text-lime-400" : "text-rose-400" } >Breakfast</p>
                                {/* <p className="font-medium">2 rooms</p> */}
                            </div>
                        </div>

                        <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                            <svg
                                className="size-4 text-indigo-700"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                                />
                            </svg>

                            <div className="mt-1.5 sm:mt-0">
                                <p className="text-secondary-200">Bedroom</p>

                                <p className="font-medium">{`${roomData.type} beds`}</p>
                            </div>
                        </div>
                    </div>
                    </div>
                    <div className='flex justify-center'>
                        <Link
                            to={"/"}
                            className="inline-block rounded-l-md border-e border-[#7c7b8c7a] px-4 py-2 text-text-base backdrop-blur-xl bg-indigo-500 bg-opacity-50 hover:bg-opacity-40 focus:relative"
                            title="Go Back"
                        >
                            <svg width="25px" height="25px" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                               
                                <g id="Layer_2" data-name="Layer 2">
                                    <g id="invisible_box" data-name="invisible box">
                                        <rect width="48" height="48" fill="none" />
                                    </g>
                                    <g id="Q3_icons" data-name="Q3 icons" fill='#f5efea'>
                                        <path d="M16.8,14.2v7.4l3.6.3c7.4.7,13.1,3.7,16.7,7.5C33,28,27.8,27.3,21,27l-4.2-.2v7.1L7,24.1l9.8-9.9M19.7,6a.9.9,0,0,0-.8.4L2.4,23.1a1.5,1.5,0,0,0,0,2L18.9,41.6a.9.9,0,0,0,.8.4,1.2,1.2,0,0,0,1.1-1.3V31c15.7.7,21.1,3.8,23.5,9.2.4.8.8,1.1,1.1,1.1s.6-.4.6-1c-.2-10.5-10-20.9-25.2-22.4V7.3A1.2,1.2,0,0,0,19.7,6Z" />
                                    </g>
                                </g>
                            </svg>
                        </Link>
                        <Link
                        to={`${location.pathname}/reservation`}
                            className="inline-block  rounded-r-md px-4 py-2 text-sm font-medium text-text-base focus:relative backdrop-blur-xl bg-indigo-500 bg-opacity-50 hover:bg-opacity-40"
                        >
                            Reserve Now
                        </Link>


                    </div>
                </div>
            </div>

            {/* Details */}
            <div className="flex flex-col gap-5 text-sm text-gray-400">
                <h2 className=' text-text-100 text-2xl'>More Details</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y-2 divide-gray-200 text-sm">


                        <tbody className="divide-y divide-gray-200 text-left">
                            <tr className=''>
                                <td className="whitespace-nowrap py-3 font-medium text-text-base">Room number</td>
                                <td className="whitespace-nowrap py-3 text-text-200">{roomData.roomId}</td>
                            </tr>

                            <tr>
                                <td className="whitespace-nowrap py-3 font-medium text-text-base">Room Type</td>
                                <td className="whitespace-nowrap py-3 text-text-200">{getRoomtype()}</td>
                            </tr>

                            <tr>
                                <td className="whitespace-nowrap py-3 font-medium text-text-base">Size of bed(s)</td>
                                <td className="whitespace-nowrap py-3 text-text-200">{getBedSizes()}</td>
                            </tr>
                            <tr>
                                <td className="whitespace-nowrap py-3 font-medium text-text-base">Wifi</td>
                                <td className="whitespace-nowrap py-3 text-text-200">✔️</td>
                            </tr>
                            <tr>
                                <td className="whitespace-nowrap py-3 font-medium text-text-base">Bathtub/Shower</td>
                                <td className="whitespace-nowrap py-3 text-text-200">✔️</td>
                            </tr>
                            <tr>
                                <td className="whitespace-nowrap py-3 font-medium text-text-base">Balcony</td>
                                <td className="whitespace-nowrap py-3 text-text-200">{roomData.hasBalcony ?"✔️" : "❌"}</td>
                            </tr>
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    )
}

