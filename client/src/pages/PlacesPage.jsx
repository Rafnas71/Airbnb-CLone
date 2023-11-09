import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Perks from "../Perks";
import axios from "axios";

export default function PlacesPage() {
  const { action } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [photos, setPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState("");
  const [description, setDescription] = useState("");
  const [extraInfo, setExtraInfo] = useState("");
  const [perks, setPerks] = useState([]);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);

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

  async function addPhotoByLink(ev) {
    ev.preventDefault();
    console.log(photoLink);
    const { data: filename } = await axios.post("/upload-by-link", {
      link: photoLink,
    });
    setPhotos((prev) => {
      return [...prev, filename];
    });
    setPhotoLink("");
  }

  function uploadPhoto(ev) {
    const files = ev.target.files;
    console.log(files)
    const data = new FormData();
    for(let i=0;i<=files.length;i++){
      data.append("photos", files[i]);
    }
    console.log(data)
    axios
      .post("/upload", data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        const { data: filenames } = response;
        setPhotos((prev) => { 
          return [...prev,...filenames];
        });
      });
  }
  return (
    <div>
      {action !== "new" && (
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
      )}

      {action === "new" && (
        <div>
          <form action="">
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
            <div className="flex">
              <input
                type="text"
                value={photoLink}
                onChange={(ev) => setPhotoLink(ev.target.value)}
                placeholder="Add using Link ...jpg"
              />
              <button
                className="bg-primary border rounded-2xl p-1 text-white"
                onClick={addPhotoByLink}
              >
                Add&nbsp;photo
              </button>
            </div>

            <div className="mt-2 item-center grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-1">
              {console.log("Addedphotos" + photos + photos.length)}
              {photos.length > 0 &&
                photos.map((link) => (
                  <div key={link} className="h-32 flex ">
                    <img
                      className="rounded-2xl w-full object-fit: fill" 
                      src={"http://localhost:4000/uploads/" + link}
                    />
                  </div>
                ))}
              <label className=" cursor-pointer flex p-2 items-center justify-center gap-1 border bg-transparent rounded-2xl text-xl">
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
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                  />
                </svg>
                <input type="file" multiple className="hidden" onChange={uploadPhoto} />
                Upload
              </label>
            </div>

            {preInput("Description", "Description of the place")}
            <textarea
              className="border border-gray-200 w-full"
              value={description}
              onChange={(ev) => setDescription(ev.target.value)}
            ></textarea>

            {preInput("Perks", "select all the perks of your place")}
            <Perks />
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
            <div className="mt-2 grid sm:grid-cols-3 gap-1">
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
            </div>
            <div>
              <button className="primary my-4">Save</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
