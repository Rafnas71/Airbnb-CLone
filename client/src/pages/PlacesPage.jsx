import { Link, useParams } from "react-router-dom";

import PlacesFormPage from "./placesFormPage";
import AccountNav from "../components/AccountNav";

export default function PlacesPage() {
  const { action } = useParams();
  

  return (
    <div className="text-center">
      <AccountNav/>
      Places List
      <br/>
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
        <PlacesFormPage/>
      )}
    </div>
  );
}
