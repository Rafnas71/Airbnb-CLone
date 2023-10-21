import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Layout from "./layout";
import RegisterPage from "./pages/RegisterPage";
import IndexPage from "./pages/indexPage";
import AccountPage from "./pages/AccountPage";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<IndexPage/>}/>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/account" element ={<AccountPage/>}/>
        <Route path="/account/:subpage?" element ={<AccountPage/>}/>
        <Route path="/account/:subpage/:action?" element = {<AccountPage/>}/>
      </Route>
    </Routes>
  );
}

export default App;
