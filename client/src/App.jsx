import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Layout from "./layout";
import RegisterPage from "./pages/RegisterPage";
import IndexPage from "./pages/IndexPage";
import ProfilePage from "./pages/ProfilePage";
import PlacesPage from "./pages/PlacesPage";
import PlacesFormPage from "./pages/placesFormPage";
import PlacePage from "./pages/PlacePage";
import BookingsPlace from "./pages/BookingsPlace";
import BookingPlace from "./pages/BookingPlace";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<IndexPage/>}/>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/account/" element ={<ProfilePage/>}/>
        <Route path="/account/places" element = {<PlacesPage/>}/>
        <Route path="/account/places/new" element={<PlacesFormPage/>}/>
        <Route path="/account/places/:id" element={<PlacesFormPage/>}/>
        <Route path="/account/bookings" element={<BookingsPlace/>}/>
        <Route path="/account/bookings/:id" element={<BookingPlace/>}/>
        <Route path="/place/:id" element={<PlacePage/>} />
      </Route>
    </Routes>
  );
}

export default App;
