import { Link, useParams } from "react-router-dom";

export default function PlacesPage() {
  const { action } = useParams();
  console.log(action);
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
            <h2 className="text-xl mt-2">Title</h2>
            <p className="text-gray-500 text-sm">
              Title for your place.should be short and catchy as in
              advertisement
            </p>
            <input type="text" placeholder="title,for example:My lovely apt" />

            <h2 className="text-xl mt-2">Address</h2>
            <p className="text-gray-500 text-sm">Address to this place</p>
            <input type="text" placeholder="address" />

            <h2 className="text-xl mt-2">Photos</h2>
            <p className="text-gray-500 text-sm">More = better</p>
            <div className="flex">
              <input type="text" placeholder="Add using Link ...jpg" />
              <button className="bg-primary border rounded-2xl p-1 text-white">
                Add&nbsp;photo
              </button>
            </div>

            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              <button className="flex justify-center gap-1 border bg-transparent rounded-2xl p-4">
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
                Upload
              </button>
            </div>

            <h2 className="text-xl mt-2">Description</h2>
            <p className="text-gray-500 text-sm">Description of the place</p>
            <textarea className="border border-gray-200 w-full"></textarea>

            <h2 className="text-xl mt-2">Perks</h2>
            <p className="text-gray-500 text-sm">
              select all the perks of your place
            </p>
            <div className="grid mt-2  gap-1 grid-col-2 md:grid-cols-3 lg:grid-cols-4">
              <label className="flex gap-1 border p-4 text-center">
                <input type="checkbox"></input>
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
                    d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z"
                  />
                </svg>
                <span> Wifi</span>
              </label>
              <label className="flex gap-1 border p-4 text-center">
                <input type="checkbox"></input>
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
                    d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                  />
                </svg>
                <span> Free parking</span>
              </label>
              <label className="flex gap-1 border p-4 text-center">
                <input type="checkbox"></input>
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
                    d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z"
                  />
                </svg>

                <span> TV</span>
              </label>
              <label className="flex gap-1 border p-4 text-center">
                <input type="checkbox"></input>
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
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
                <span> Pets</span>
              </label>
              <label className="flex gap-1 border p-4 text-center">
                <input type="checkbox"></input>
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
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                  />
                </svg>
                <span> Private Entrance</span>
              </label>
            </div>

            <h2 className="text-xl mt-2">Extra Info</h2>
            <p className="text-gray-500 text-sm">House rules , etc </p>
            <textarea className="border border-gray-200 w-full"></textarea>

            <h2 className="text-xl mt-2">
              Check In & Out Time and Max. Guests
            </h2>
            <p className="text-gray-500 text-sm">
              Add check in and out times, remember to have some time window for
              cleaning the room between the guests
            </p>
            <div className="mt-2 grid sm:grid-cols-3 gap-1">
              <div className="mt-2">
                <h3>Check In Time</h3>
                <input type="text" />
              </div>
              <div className="mt-2">
                <h3>Check Out Time</h3>
                <input type="text" />
              </div>
              <div className="mt-2">
                <h3>Max Guests</h3>
                <input type="text" />
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
