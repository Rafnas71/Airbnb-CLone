/* eslint-disable react/prop-types */

import Image from "./Image";


const PhotoImg = ({place,index=0,className=null}) => {
    if(!place.photos?.length){
        return ""
    }
    if(!className){
      className="object-cover"
    }
    return (
        <div>
            <Image className={className} src={place.photos[0]} alt="" />
        </div>
    );
}

export default PhotoImg;
