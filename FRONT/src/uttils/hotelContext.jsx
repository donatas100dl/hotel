/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { createContext, useContext, useMemo, useState, useEffect } from "react";
import axios from "axios";

const HotelContext = createContext(); // Fixed the missing parentheses
const URL = "http://localhost:4000/api/v1/rooms";

export const HotelProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [hotel, setHotel] = useState(false);


    useEffect(() => {
        getAllHotels();
        setLoading(true);
    }, []);

    const getAllHotels = async () => {
        try {
            let res = await axios.get(URL + "");
            if (res) {
                setHotel(res.data)
                setLoading(false)
            }
        } catch (error) {
            console.log(error);
        }
    };

    const makeReservation = async (data) => {
        try {
            let res = await axios.post(`${URL}/${data.id}/reserve`, data);
            if (res) {
                console.log(res.data);
                return res.data;
            }
        } catch (error) {
            console.log(error);
        }
    }
    const checkDateAvailable = async (date,id) => {
        try {
            console.log(date, id)
            let res = await axios.get(`${URL}/${id}/availability/checkin/${date.from}/checkout/${date.to}`);
            if (res) {
                console.log(res.data);
                return res.data.isRoomAvailable
            }
        } catch (error) {
            console.log(error);
        }
    }
    const checkReservation = async (data) => {
        try {
            let res = await axios.post(`${URL}/reserve/check`, data);
            if (res) {
                return res.data;
            }
        } catch (error) {
            if (error) {
                if (error.response.data.error === "Unauthorized") {
                    return {error: true};
                }
                console.log(error.data);
                return error.data
            }
            console.log(error);
        }
    }

    const reservationCancel = async (data) => {
        try {
            let res = await axios.post(`${URL}/reserve/cancel`, data);
            if (res) {
                return res.data;
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getFilteredRoom = async (data) => {
        try {
            let res = await axios.post(`${URL}/filter`, data);
            if (res) {
                return res.data;
            }
        } catch (error) {
            console.log(error);
        }
    }

    const contextData = useMemo(() => ({
        loading,
        hotel,
        makeReservation,
        checkDateAvailable,
        checkReservation,
        getFilteredRoom,
        reservationCancel
    }), [loading]);

    return (
        <HotelContext.Provider value={contextData}>
            {children}
        </HotelContext.Provider>
    );
};

export const useHotel = () => {
    return useContext(HotelContext);
};

export default HotelContext;