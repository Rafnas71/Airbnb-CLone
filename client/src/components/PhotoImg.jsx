/* eslint-disable react/prop-types */


const PhotoImg = ({place}) => {
    if(!place.photos?.length){
        return ""
    }
    return (
        <div>
            {place?.photos?.length > 0 &&
            place.photos.map((photo) => (
              // eslint-disable-next-line react/jsx-key
              <div className="">
                <img src={"http://localhost:4000/uploads/" + photo} alt="" />
              </div>
            ))}
        </div>
    );
}

export default PhotoImg;
