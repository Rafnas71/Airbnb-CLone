import { useState } from "react";
import Image from "./Image";

const PhotoGallery = ({ place }) => {
  const [showAllPhotos, setShowAllPhotos] = useState(false);

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
                <Image src={photo} alt="" />
              </div>
            ))}
        </div>
      </div>
    );
  }
  return (
    <div className="relative max-w-screen-md">
      <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden ">
        <div className="">
          {place.photos?.[0] && (
            <div className="">
              <Image
                onClick={() => setShowAllPhotos(true)}
                className="aspect-square object-cover cursor-pointer"
                src={place.photos[0]}
                alt=""
              />
            </div>
          )}
        </div>
        <div className="grid">
          {place.photos?.[1] && (
            <Image
              onClick={() => setShowAllPhotos(true)}
              className="aspect-square object-cover cursor-pointer "
              src={place.photos[1]}
              alt=""
            />
          )}
          <div className="overflow-hidden">
            {place.photos?.[2] && (
              <Image
                onClick={() => setShowAllPhotos(true)}
                className="aspect-square cursor-pointer object-cover relative top-2"
                src={place.photos[2]}
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
  );
};

export default PhotoGallery;
