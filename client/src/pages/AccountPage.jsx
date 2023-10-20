import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Navigate, Link, useParams } from "react-router-dom";
import axios from "axios";

export default function AccountPage() {
    const { ready, user, setUser } = useContext(UserContext);
    const [redirect, setRedirect] = useState(null)

    console.log("ready:", ready);
    console.log("user:", user);

    if (!ready) {
        return "Loading...";

    }
    // console.log("load");

    if (ready && !user && !redirect) {
        return <Navigate to="/login"></Navigate>;
    }
    // console.log("loginav");

    let { subpage } = useParams();

    if (subpage === undefined) {
        subpage = "profile";
    }
    // console.log(subpage);

    function LinkClasses(type) {
        let classes = "px-6 py-2";
        if (type == subpage) {
            classes += " bg-primary text-white rounded-full";
        }
        return classes;
    }

    async function logout() {
        console.log("logout fn")
        await axios.post("/logout");
        setRedirect("/")
        setUser(null)
    }

    if (redirect) {
        console.log(redirect)
        return <Navigate to={redirect} />
    }


    return (
        <div>
            <nav className="w-full flex mt-8 gap-2 justify-center mb-8">
                <Link className={LinkClasses("profile")} to={"/account/"}>
                    My profile
                </Link>
                <Link className={LinkClasses("bookings")} to={"/account/bookings"}>
                    My bookings
                </Link>
                <Link className={LinkClasses("places")} to={"/account/places"}>
                    My accommodations
                </Link>
            </nav>
            {subpage == "profile" &&
                <div className="max-w-lg mx-auto text-center">
                    Account Page for {user.name}({user.email})<br></br>
                    <button className="primary max-w-sm mt-2" onClick={logout}>Logout</button>
                </div>
            }
            
        </div>
    );
}

