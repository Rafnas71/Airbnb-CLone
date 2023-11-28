
import { useEffect, useState } from 'react';
import AccountNav from '../components/AccountNav';
import axios from 'axios';
import PhotoImg from '../components/PhotoImg';

const BookingsPlace = () => {
    const [bookings,setBookings] = useState([])
    useEffect(() => {
        axios.get('/bookings').then(response =>{
            setBookings(response.data)
        })
    }, []);
    
    return (
        <div>
            <AccountNav/>
            <div>
                {bookings.length >0 && bookings.map(booking=>(
                    <PhotoImg place={booking.place}/>
                    
                ))}
            </div>
        </div>
    );
}

export default BookingsPlace;