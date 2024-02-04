import { Link } from "react-router-dom";

import AccountNav from "../components/AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "../components/Image";

export default function PlacesPage() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get("/user-places").then(({ data }) => {
      console.log(data)
      setPlaces(data);
    });
  });

  return (
    <div className="text-center">
      <AccountNav />
      <div className="text-center">
        <Link
          className="inline-flex gap-1 bg-primary rounded-full text-white px-6 py-2"
          to={"/account/places/new"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add new place
        </Link>
      </div>
      <div className="mt-4">
        {places.length > 0 &&
          places.map((place) => (
            <Link to={'/account/places/' + place._id} key={place._id} className="flex mb-2 border rounded-xl p-4 gap-4 bg-gray-100 ">
              <div className=" flex h-32 w-32 shrink-0 bg-gray-200 object-cover rounded-2xl">
                {places.length > 0 && <Image className="" src={place.photos[0]} alt="" />}
              </div>
              <div className="text-start grow-0 shrink">
                <h2 className="text-xl">{place.title}</h2>
                <p className="text-sm mt-2">{place.description.length > 200 ? `${place.description.substring(0, 200)}...`:place.description}{place.description.length > 200 ? `${place.description.substring(0, 200)}...`:place.description}</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
