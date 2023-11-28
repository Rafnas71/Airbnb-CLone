import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingWidget from "../components/BookingWidget";

export default function PlacePage() {
  const { id } = useParams();
  const [place, setPlace] = useState([]);
  const [showAllPhotos, setShowAllPhotos] = useState(null);

  useEffect(() => {
    axios.get("/places/" + id).then((res) => {
      setPlace(res.data);
    });
  }, [id]);

  if (!place) {
    return "";
  }

  if (showAllPhotos) {
    console.log(place);
    return (
      <div className="absolute inset-0 bg-black text-white min-h-full min-w-full ">
        <div className="bg-black p-8 grid gap-4">
          <div>
            <h2 className="text-3xl mr-40">{place.title}</h2>
            <button
              onClick={() => setShowAllPhotos(false)}
              className="fixed right-12 top-9 rounded-2xl bg-gray-500 text-white p-2 shadow shadow-white"
            >
              Close Photos
            </button>
          </div>
          {place?.photos?.length > 0 &&
            place.photos.map((photo) => (
              // eslint-disable-next-line react/jsx-key
              <div className="">
                <img src={"http://localhost:4000/uploads/" + photo} alt="" />
              </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 bg-gray-100 -mx-8 px-8 py-8">
      <h1 className="text-2xl">{place.title}</h1>

      <a
        className="font-semibold underline flex my-2"
        target="blank"
        href={"https://map.google.com/?q=" + place.address}
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
            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
          />
        </svg>

        {place.address}
      </a>
      <div className="relative max-w-screen-md">
        <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden ">
          <div className="">
            {place.photos?.[0] && (
              <div className="">
                <img
                  onClick={() => setShowAllPhotos(true)}
                  className="aspect-square object-cover cursor-pointer"
                  src={"http://localhost:4000/uploads/" + place.photos[0]}
                  alt=""
                />
              </div>
            )}
          </div>
          <div className="grid">
            {place.photos?.[1] && (
              <img
                onClick={() => setShowAllPhotos(true)}
                className="aspect-square object-cover cursor-pointer "
                src={"http://localhost:4000/uploads/" + place.photos[1]}
                alt=""
              />
            )}
            <div className="overflow-hidden">
              {place.photos?.[2] && (
                <img
                  onClick={() => setShowAllPhotos(true)}
                  className="aspect-square cursor-pointer object-cover relative top-2"
                  src={"http://localhost:4000/uploads/" + place.photos[2]}
                  alt=""
                />
              )}
            </div>
          </div>
          <button
            onClick={() => setShowAllPhotos(true)}
            className="flex gap-1 absolute bottom-4 right-4 bg-gray-200 rounded-2xl shadow shadow-gray m-2 px-4 py-2"
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
                d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
              />
            </svg>
            Show all photos
          </button>
        </div>
      </div>

      <div className="mt-8 gap-1 grid grid-cols-1 md:grid-cols-[2fr,1fr]">
        <div>
          <div className="my-4">
            <h2 className="text-xl font-semibold">Description</h2>
            {place?.description?.length > 400
              ? `${place.description.substring(0, 400)}...`
              : place.description}
          </div>
          Check-in :{place.checkin} <br />
          Check-out :{place.checkout} <br />
          Max Number of Guests : {place.maxguests}
        </div>
        <BookingWidget place={place} />
      </div>
      <div className="bg-white -mx-8 mt-4 px-8 py-8 border-t">
        <div>
          <h2 className="text-xl font-semibold">Extra Info</h2>
        </div>
        <div className="leading-5 text-sm text-gray-700">{place.extrainfo}</div>
      </div>
    </div>
  );
}
