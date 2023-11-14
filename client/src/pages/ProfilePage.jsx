import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Navigate,useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "../components/AccountNav";

export default function ProfilePage() {
    const { ready, user, setUser } = useContext(UserContext);
    const [redirect, setRedirect] = useState(null)
    
    if (!ready) {
        return "Loading...";
    }
    // console.log("load");

    if (ready && !user && !redirect) {
        return <Navigate to="/login"></Navigate>;
    }
    // console.log("loginav");

    // eslint-disable-next-line react-hooks/rules-of-hooks
    let { subpage } = useParams();

    if (subpage === undefined) {
        subpage = "profile";
      }
      // console.log(subpage);
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
            <AccountNav/>
            {subpage == "profile" &&
                <div className="max-w-lg mx-auto text-center">
                    Account Page for {user.name}({user.email})<br></br>
                    <button className="primary max-w-sm mt-2" onClick={logout}>Logout</button>
                </div>
            } 
            {subpage === 'places' &&
                <PlacesPage />
            }

        </div>
    );
}

