import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Image from "../components/Image"

export default function IndexPage() {
    const [places, setPlaces] = useState([])
    useEffect(() => {
        axios.get('/places').then((response) => {
            setPlaces(response.data)
        })
    }, [])

    return (
        <div key={1} className="mt-8 gap-x-6 gap-y-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {places.length > 0 && places.map(place => (
                <Link key={place.id} to={"/Place/"+place._id}>
                    <div className="rounded-2xl bg-gray-500 ">
                        {
                            place.photos?.[0] && (
                                <Image src={place.photos[0]} alt="" className="rounded-2xl aspect-square object-cover" />
                            )
                        }
                    </div>
                    <h3 className="font-bold">{place.address}</h3>
                    <h2 className="text-sm truncate">{place.title}</h2>
                    <div className="mt-1"><span className="font-bold">${place.price}</span> per night</div>
                </Link>

            ))}
        </div>

    )
}