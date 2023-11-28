import { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns/esm";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function BookingWidget({ place }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberofGuests] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState();
  const [redirect, setRedirect] = useState("");
  const {user} = useContext(UserContext);
  
  useEffect(()=>{
    if(user){
    setName(user.name)
  }
  },[user])
  

  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }
  async function bookThisPlace() {
    const data = {
      place: place._id,
      checkIn,
      checkOut,
      numberOfGuests,
      name,
      phone,
      price: numberOfNights * place.price,
    };
    const response = await axios.post("/bookings", data);
    const bookingId = response.data._id;
    setRedirect(`/account/bookings/${bookingId}`);
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className=" p-4 shadow rounded-2xl bg-white">
      <div className="text-center text-2xl">
        Price: Rs. {place.price} per night
      </div>
      <div>
        <div className="mt-2 flex border rounded-2xl">
          <div className="py-3 px-4 rounded-2xl">
            <label>Check in: </label>
            <input
              type="date"
              value={checkIn}
              onChange={(ev) => setCheckIn(ev.target.value)}
            />
          </div>
          <div className="py-3 px-4 border-l">
            <label>Check out: </label>
            <input
              value={checkOut}
              type="date"
              onChange={(ev) => setCheckOut(ev.target.value)}
            />
          </div>
        </div>
        <div>
          <label>Max number of guests</label>
          <input
            value={numberOfGuests}
            onChange={(ev) => setNumberofGuests(ev.target.value)}
            type="number"
            placeholder="1"
          />
        </div>
        {numberOfNights > 0 && (
          <div>
            <label>Full Name</label>
            <input
              value={name}
              onChange={(ev) => setName(ev.target.value)}
              type="text"
              placeholder="John Doe"
            />
            <label>Mobile Number</label>
            <input
              value={phone}
              onChange={(ev) => setPhone(ev.target.value)}
              type="tel"
              placeholder="+151848494"
            />
          </div>
        )}
      </div>

      <button onClick={bookThisPlace} className="primary mt-4">
        Book this place
        {numberOfNights > 0 && <div>Rs. {numberOfNights * place.price}</div>}
      </button>
    </div>
  );
}
