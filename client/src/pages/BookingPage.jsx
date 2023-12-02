import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddressLink from "../components/AddressLink";
import PhotoGallery from "../components/PhotoGallery";
import BookingDates from "../components/BookingDates";

const BookingPage = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState("");
  useEffect(() => {
    if (id) {
      axios.get("/bookings").then((response) => {
        let bookingFound = response.data.find(({ _id }) => _id === id);
        if (bookingFound) {
          setBooking(bookingFound);
        }
      });
    }
  }, [id]);

  console.log(booking);

  if (!booking) {
    return "";
  }

  return (
    <div className="py-8">
      <h1 className="text-3xl">{booking.place.title}</h1>
      <AddressLink>{booking.place.address}</AddressLink>
      <div className="flex items-center bg-gray-200 rounded-2xl overflow-hidden mb-4 mt-4 p-4 justify-between">
        <div>
          <h2 className="text-xl mb-2">Your Booking Information:</h2>
          <BookingDates booking={booking} className="text-primary"/>
        </div>
        <div className="bg-primary text-white rounded-3xl p-4">
          <h2 className="">Total Price:</h2>
          <div className="text-3xl">Rs.{booking.price}</div>
        </div>
      </div>
      <PhotoGallery place={booking.place}></PhotoGallery>
    </div>
  );
};

export default BookingPage;
