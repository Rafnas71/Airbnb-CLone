import { useParams } from 'react-router-dom';

const BookingPlace = () => {
    const {id} =useParams()
    return (
        <div>
            Booking Place :{id}
        </div>
    );
}

export default BookingPlace;
