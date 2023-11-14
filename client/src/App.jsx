import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Layout from "./layout";
import RegisterPage from "./pages/RegisterPage";
import IndexPage from "./pages/indexPage";
import ProfilePage from "./pages/ProfilePage";
import PlacesPage from "./pages/PlacesPage";
import PlacesFormPage from "./pages/placesFormPage";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<IndexPage/>}/>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/account/" element ={<ProfilePage/>}/>
        <Route path="/account/places" element = {<PlacesPage/>}/>
        <Route path='/account/places/new' element={<PlacesFormPage/>}/>
      </Route>
    </Routes>
  );
}

export default App;
