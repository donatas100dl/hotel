import { useState } from "react"
import {useHotel} from "../uttils/hotelContext.jsx"
import Card from '../components/card.jsx'

function Fillter() {
    const {getFilteredRoom } = useHotel();
    const [rooms, setRooms] = useState();
    const [data, setData] = useState({
        price: {
            from: 0,
            to: 600
        },
        floor: 1,
        hasBalcony: false,
        date: {
            from: "",
            to: ""
        }
    })

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
    
        // Split the name to handle nested properties (e.g., price.from)
        const nameParts = name.split('.');
    
        setData(prevData => {
            const newData = { ...prevData };
    
            if (nameParts.length > 1) {
                // Handle nested properties like price.from or date.from
                let current = newData;
                for (let i = 0; i < nameParts.length - 1; i++) {
                    current = current[nameParts[i]];
                }
    
                // Update the nested property based on input type
                switch (type) {
                    case 'number':
                        current[nameParts[nameParts.length - 1]] = Number(value);
                        break;
                    case 'date':
                        current[nameParts[nameParts.length - 1]] = value;
                        break;
                    default:
                        current[nameParts[nameParts.length - 1]] = value;
                        break;
                }
            } else {
                // Handle non-nested properties
                switch (type) {
                    case 'checkbox':
                        newData[name] = checked;
                        break;
                    case 'number':
                        newData[name] = Number(value);
                        break;
                    case 'date':
                        newData[name] = value;
                        break;
                    default:
                        newData[name] = value;
                        break;
                }
            }
    
            return newData;
        });
    };

    const handleFloor = (e) => {
        const { name } = e.target;
    
        setData(prevData => {
            let newFloor = prevData.floor;
    
            if (name === 'plus') {
                newFloor = newFloor + 1;
                if (newFloor > 10) {
                    newFloor = 1; // Wrap around to 1 if it exceeds 10
                }
            } else if (name === 'minus') {
                newFloor = newFloor - 1;
                if (newFloor < 1) {
                    newFloor = 10; // Wrap around to 10 if it goes below 1
                }
            }
    
            return {
                ...prevData,
                floor: newFloor
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(data);
        let res = await getFilteredRoom(data)
        if (res){
            console.log(res.rooms)
            setRooms(res.rooms)
        }
    };

    const ResetBtn = (e) => {
        e.preventDefault()
        setData(
            {
                price: {
                    from: 0,
                    to: 600
                },
                floor: 1,
                hasBalcony: false,
                date: {
                    from: "",
                    to: ""
                }
            }
        )
    }

    if (rooms && rooms.length > 0) {
        return (
            <div className='flex flex-col bg-background text-text w-full p-5'>
            <div className="flex flex-col justify-center items-center w-full">
              <h1 className='text-4xl font-bold'>Fillterd Hotels</h1>
              <p className=''>Welcome to the React Hotel!</p>
            </div>
            <div className='h-full w-full flex flex-col gap-2'> 
              <h2 className=' text-2xl font-normal '>Featured Hotels by The Filter</h2>
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
        )
    }

    return (
        <div className='flex flex-col p-5 justify-center items-center w-full'>
            <h1 className='text-2xl w-full text-center items-center flex justify-center mb-10'>Room Filter</h1>
            <form action="" className='w-full h-full flex flex-col justify-center items-center'>
                <div className="flex flex-col gap-5 flex-wrap justify-center items-center w-full mx-100">
                    {/* price */}
                    <div className="space-y-2 w-full max-w-[40%]" >
                        <div className="rounded-md border-gray-200 bg-background-400 bg-opacity-10 backdrop-blur-xl">
                            <header className="flex items-center justify-between p-4">
                                <div className="flex flex-col">
                                    <span className="text-text-100 text-xl">Price Range</span>
                                    <p className="text-[.8rem] text-text-200"> The highest price is $600 </p>
                                </div>

                                <button type="button" className="text-sm text-text-100 underline underline-offset-4"
                                onClick={ResetBtn}
                                >
                                    Reset
                                </button>
                            </header>

                            <div className="border-t border-gray-200 p-4">
                                <div className="flex justify-between gap-4">
                                    <label htmlFor="FilterPriceFrom" className="flex items-center gap-2">
                                        <span className="text-sm text-text-100">$</span>

                                        <input
                                            type="number"
                                            id="FilterPriceFrom"
                                            placeholder="From"
                                            className="w-full  bg-transparent border-b-[1px] shadow-sm sm:text-sm p-1 text-text-100 focus:outline-none"
                                            max="600"
                                            maxLength="3"
                                            value={data.price.from}
                                            name="price.from"
                                            onChange={handleChange}
                                        />
                                    </label>

                                    <label htmlFor="FilterPriceTo" className="flex items-center gap-2">
                                        <span className="text-sm text-text-100">$</span>

                                        <input
                                            type="number"
                                            id="FilterPriceTo"
                                            placeholder="To"
                                            className="w-full  bg-transparent border-b-[1px] shadow-sm sm:text-sm p-1 text-text-100 focus:outline-none"
                                            max="600"
                                            maxLength="3"
                                            value={data.price.to}
                                            name="price.to"
                                            onChange={handleChange}
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Floor */}
                    <div className="space-y-2 w-full max-w-[40%]">
                        <div className="rounded-md border-gray-200 bg-background-400 bg-opacity-10 backdrop-blur-xl">
                            <header className="flex items-center justify-between p-4">
                                <div className="flex flex-col">
                                    <span className="text-text-100 text-xl">Floor</span>
                                    <p className="text-[.8rem] text-text-200"> The highest floor is 10 </p>
                                </div>

                                <button type="button" className="text-sm text-text-100 underline underline-offset-4"
                                onClick={ResetBtn}
                                >
                                    
                                    Reset
                                </button>
                            </header>

                            <div className="border-t border-gray-200 p-4">
                                <div className="flex justify-center gap-4">
                                    <label htmlFor="FilterPriceFrom" className="flex items-center gap-2">

                                        <div className="flex items-center gap-1">
                                            <button type="button" className="size-10 leading-10 text-text-100 transition hover:opacity-75"
                                                onClick={handleFloor}
                                                name="minus"
                                            >
                                                &minus;
                                            </button>

                                            <input
                                                type="number"
                                                id="Quantity"
                                                max={10}
                                                min={0}
                                                step={1}
                                                className="no-arrows w-auto max-w-8 bg-transparent border-b-[1px] shadow-sm sm:text-sm p-1 text-text-100 focus:outline-none text-center items-center content-center "
                                                value={data.floor}
                                                name="floor"
                                                onChange={handleFloor}
                                            />

                                            <button type="button" className="size-10 leading-10 text-text-100 transition hover:opacity-75" 
                                            name="plus" 
                                            onClick={handleFloor}

                                            >
                                                +
                                            </button>
                                        </div>
                                    </label>

                                </div>
                            </div>
                        </div>
                    </div>


                    {/* date */}
                    <div className="space-y-2 w-full max-w-[40%]" >
                        <div className="rounded-md border-gray-200 bg-background-400 bg-opacity-10 backdrop-blur-xl">
                            <header className="flex items-center justify-between p-4">
                                <div className="flex flex-col">
                                    <span className="text-text-100 text-xl">Date Range</span>
                                    <p className="text-[.8rem] text-text-200">Select your Date range</p>
                                </div>

                                <button type="button" className="text-sm text-text-100 underline underline-offset-4"
                                onClick={ResetBtn}
                                >
                                    Reset
                                </button>
                            </header>
                            <div className="border-t border-gray-200 p-4">
                                <div className="flex justify-between gap-2">
                                    <label htmlFor="FilterPriceFrom" className="flex items-center gap-2">
                                        <span className="text-sm text-white">From</span>

                                        <input
                                            type="date"
                                            id="FilterPriceFrom"
                                            placeholder="From"
                                            className="w-full  bg-transparent border-b-[1px] shadow-sm sm:text-sm p-1 text-text-100 focus:outline-none"
                                            value={(data.date.from).toString()}
                                            name="date.from"
                                            onChange={handleChange}
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
                                            value={data.date.to}
                                            name="date.to"
                                            onChange={handleChange}
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* settings */}
                    <div className="space-y-2 w-full max-w-[40%]">
                        <div className="rounded-md border-gray-200 bg-background-400 bg-opacity-10 backdrop-blur-xl">
                            <header className="flex items-center justify-between p-4">
                                <div className="flex flex-col">
                                    <span className="text-text-100 text-xl">Extra options</span>
                                    <p className="text-[.8rem] text-text-200"> Options like wifi, balcony etc..</p>
                                </div>

                                <button type="button" className="text-sm text-text-100 underline underline-offset-4"
                                onClick={ResetBtn}
                                >
                                    Reset
                                </button>
                            </header>

                            <div className="border-t border-gray-200 p-4">
                                <div className="flex flex-col justify-start items-left gap-4">

                                    {/* wifi */}
                                    <div className="flex flex-row gap-4 items-center">
                                        <span>Room with Wifi</span>
                                        <label
                                            htmlFor="HasWifi"
                                            className="relative inline-block h-4 w-7 cursor-pointer rounded-full bg-gray-300 transition [-webkit-tap-highlight-color:_transparent] has-[:checked]:bg-green-500"
                                        >
                                            <input
                                                type="checkbox"
                                                id="HasWifi"
                                                className="peer sr-only [&:checked_+_span_svg[data-checked-icon]]:block [&:checked_+_span_svg[data-unchecked-icon]]:hidden"
                                            />

                                            <span
                                                className="absolute inset-y-[-4px] start-[-4px] z-10 m-1 inline-flex size-4 items-center justify-center rounded-full bg-white text-gray-400 transition-all peer-checked:start-2 peer-checked:text-green-600"
                                            >
                                                <svg
                                                    data-unchecked-icon
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="size-2"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>

                                                <svg
                                                    data-checked-icon
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="hidden size-4"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </span>
                                        </label>
                                    </div>

                                    {/* balcony */}
                                    <div className="flex flex-row gap-4 items-center">
                                        <span>Room with Balcony</span>
                                        <label
                                            htmlFor="HasBalcony"
                                            className="relative inline-block h-4 w-7 cursor-pointer rounded-full bg-gray-300 transition [-webkit-tap-highlight-color:_transparent] has-[:checked]:bg-green-500"
                                        >
                                            <input
                                                type="checkbox"
                                                id="HasBalcony"
                                                className="peer sr-only [&:checked_+_span_svg[data-checked-icon]]:block [&:checked_+_span_svg[data-unchecked-icon]]:hidden"
                                                name="hasBalcony"
                                                checked={data.hasBalcony}
                                                onChange={handleChange}
                                            />

                                            <span
                                                className="absolute inset-y-[-4px] start-[-4px] z-10 m-1 inline-flex size-4 items-center justify-center rounded-full bg-white text-gray-400 transition-all peer-checked:start-2 peer-checked:text-green-600"
                                            >
                                                <svg
                                                    data-unchecked-icon
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="size-2"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>

                                                <svg
                                                    data-checked-icon
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="hidden size-4"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </span>
                                        </label>
                                    </div>

                                    <div className="flex flex-row gap-4 items-center">
                                        <span>Room with Private Garage</span>
                                        <label
                                            htmlFor="hasGarage"
                                            className="relative inline-block h-4 w-7 cursor-pointer rounded-full bg-gray-300 transition [-webkit-tap-highlight-color:_transparent] has-[:checked]:bg-green-500"
                                        >
                                            <input
                                                type="checkbox"
                                                id="hasGarage"
                                                className="peer sr-only [&:checked_+_span_svg[data-checked-icon]]:block [&:checked_+_span_svg[data-unchecked-icon]]:hidden"
                                            />

                                            <span
                                                className="absolute inset-y-[-4px] start-[-4px] z-10 m-1 inline-flex size-4 items-center justify-center rounded-full bg-white text-gray-400 transition-all peer-checked:start-2 peer-checked:text-green-600"
                                            >
                                                <svg
                                                    data-unchecked-icon
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="size-2"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>

                                                <svg
                                                    data-checked-icon
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="hidden size-4"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button className="rounded-md bg-indigo-600 cursor-pointer bg-opacity-85 text-bac backdrop-blur-xl px-3 py-2 hover:bg-opacity-70 transition-all"
                    onClick={handleSubmit}
                    >Filter Rooms</button>

                </div>
            </form>
        </div>
    )
}

export default Fillter
