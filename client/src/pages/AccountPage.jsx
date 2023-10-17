import { useContext } from "react"
import { UserContext } from "../UserContext"
import { Navigate, Link, useParams } from "react-router-dom"

export default function AccountPage() {
    const { ready, user } = useContext(UserContext)

    if (!ready) {
        return "Loading..."
    }

    if (ready && !user) {
        return <Navigate to="/login"></Navigate>
    }

    let { subpage } = useParams()

    if (subpage === undefined) {
        subpage = "profile"
    }
    // console.log(subpage)

    function LinkClasses(type) {
        let classes = 'px-6 py-2';
        if (type == subpage) {
            classes += " bg-primary text-white rounded-full"
        }
        return classes;
    }

    if (ready && user) {
        return (
            <div>
                <nav className="w-full flex mt-8 gap-2 justify-center">
                    <Link className={LinkClasses('profile')} to={"/account/"}>My profile</Link>
                    <Link className={LinkClasses('bookings')} to={'/account/bookings'}>My bookings</Link>
                    <Link className={LinkClasses('places')} to={'/account/places'}>My accommodations</Link>
                </nav>
            </div>
        )
    }

}