/* eslint-disable react/prop-types */


const PhotoImg = ({place,index=0,className=null}) => {
    if(!place.photos?.length){
        return ""
    }
    if(!className){
      className="object-cover"
    }
    return (
        <div>
            <img className={className} src={"http://localhost:4000/uploads/" + place.photos[0]} alt="" />
        </div>
    );
}

export default PhotoImg;
