import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";
import PhotosUploader from "../components/PhotosUploader"
import Perks from "../Perks";
import AccountNav from "../components/AccountNav";

export default function PlacesFormPage() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [photos, setPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [extraInfo, setExtraInfo] = useState("");
  const [perks, setPerks] = useState([]);
  const [checkIn, setCheckIn] = useState();
  const [checkOut, setCheckOut] = useState();
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState(0)
  const [redirectToPlaces, setRedirectToPlaces] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/places/" + id).then((response) => {
      const { data } = response;
      setTitle(data.title);
      setAddress(data.address);
      setPhotos(data.photos)
      setDescription(data.description);
      setExtraInfo(data.extrainfo);//in db not camelcased
      setPerks(data.perks);
      setCheckIn(data.checkin);
      setCheckOut(data.checkout);
      setMaxGuests(data.maxguests);
      setPrice(data.price)
    });
  }, []);
  function inputHeader(text) {
    return <h2 className="text-xl mt-2">{text}</h2>;
  }

  function inputDescription(text) {
    return <p className="text-gray-500 text-sm">{text}</p>;
  }

  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  async function savePlace(ev) {
    ev.preventDefault();
    const placeData = {
      title,
      address,
      photos,
      description,
      perks,
      extrainfo: extraInfo,
      checkin: checkIn,
      checkout: checkOut,
      maxguests: maxGuests,
      price: price
    };
    if (id) {
      //update
      axios.put("/places", {
        id,//places id
        ...placeData,
      }).then(() => {
        setRedirectToPlaces(true);
      });
    } else {
      //new place
      console.log("axios places");
      axios.post("/places", placeData).then(() => {
        setRedirectToPlaces(true);
      });
    }
  }
  console.log("redirect" + redirectToPlaces);

  if (redirectToPlaces) {
    return <Navigate to={"/account/places"} />;
  }

  return (
    <div>
      <AccountNav />
      <form onSubmit={savePlace}>
        {preInput(
          "Title",
          "Title for your place.should be short and catchy as in advertisement"
        )}
        <input
          type="text"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          placeholder="title,for example:My lovely apt"
        />

        {preInput("Address", "Address to this place")}
        <input
          type="text"
          value={address}
          onChange={(ev) => setAddress(ev.target.value)}
          placeholder="address"
        />

        {preInput("Photos", "More = better")}
        <PhotosUploader photos={photos} setPhotos={setPhotos} />

        {preInput("Description", "Description of the place")}
        <textarea
          className=""
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
        ></textarea>

        {preInput("Perks", "select all the perks of your place")}
        <Perks selected={perks} onChange={setPerks} />
        {preInput("Extra Info", "House rules , etc")}
        <textarea
          className="border border-gray-200 w-full"
          value={extraInfo}
          onChange={(ev) => setExtraInfo(ev.target.value)}
        ></textarea>

        {preInput(
          "Check In & Out Time and Max. Guests",
          "Add check in and out times, remember to have some time window for cleaning the room between the guests"
        )}
        <div className="mt-2 grid grid-cols-2 md:grid-cols lg:grid-cols-4 gap-1">
          <div className="mt-2">
            <h3>Check In Time</h3>
            <input
              type="text"
              value={checkIn}
              onChange={(ev) => setCheckIn(ev.target.value)}
              placeholder="11"
            />
          </div>
          <div className="mt-2">
            <h3>Check Out Time</h3>
            <input
              type="text"
              value={checkOut}
              onChange={(ev) => setCheckOut(ev.target.value)}
              placeholder="14"
            />
          </div>
          <div className="mt-2">
            <h3>Max Guests</h3>
            <input
              type="number"
              value={maxGuests}
              onChange={(ev) => setMaxGuests(ev.target.value)}
            />
          </div>
          <div className="mt-2">
            <h3>Price per night</h3>
            <input
              type="number"
              value={price}
              onChange={(ev) => setPrice(ev.target.value)}
            />
          </div>
        </div>
        <div>
          <button className="primary my-4">Save</button>
        </div>
      </form>
    </div>
  );
}
