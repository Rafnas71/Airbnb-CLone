import { useState } from "react";
import axios from "axios";

// eslint-disable-next-line react/prop-types
export default function PhotosUploader({photos,setPhotos}) {
  const [photoLink, setPhotoLink] = useState("")        
  
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
    console.log(files);
    const data = new FormData();
    for (let i = 0; i <= files.length; i++) {
      data.append("photos", files[i]);
    }
    console.log(data);
    axios
      .post("/upload", data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        const { data: filenames } = response;
        setPhotos((prev) => {
          return [...prev, ...filenames];
        });
      });
  }
  return (
    <>
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
            <div key={link} className="h-32 flex">
              <img
                className="rounded-2xl w-full object-fit: fill"
                src={"http://localhost:4000/uploads/" + link}
              />
            </div>
          ))}
        <label className="h-32 cursor-pointer flex p-2 items-center justify-center gap-1 border bg-transparent rounded-2xl text-xl">
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
          <input
            type="file"
            multiple
            className="hidden "
            onChange={uploadPhoto}
          />
          Upload
        </label>
      </div>
    </>
  );
}
