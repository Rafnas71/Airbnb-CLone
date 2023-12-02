import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingWidget from "../components/BookingWidget";
import PhotoGallery from "../components/PhotoGallery";
import AddressLink from "../components/AddressLink";

export default function PlacePage() {
  const { id } = useParams();
  const [place, setPlace] = useState([]);

  useEffect(() => {
    axios.get("/places/" + id).then((res) => {
      setPlace(res.data);
    });
  }, [id]);

  if (!place) {
    return "";
  }

  

  return (
    <div className="mt-4 bg-gray-100 -mx-8 px-8 py-8">
      <h1 className="text-2xl">{place.title}</h1>
      <AddressLink>{place.address}</AddressLink>
      <PhotoGallery place={place}/>
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
