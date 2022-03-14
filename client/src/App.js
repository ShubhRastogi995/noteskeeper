import Header from "./components/Header";
import Home from "./components/Home";
import Mynotes from "./components/Mynotes";
import Login from "./components/Login";
import SignUp from "./components/Signup";
import AddNote from './components/AddNote';
import EditNote from "./components/EditNote";
import Profile from "./components/Profile";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/Mynotes" element={<Mynotes />} />
        <Route exact path="/addnote" element={<AddNote />} />
        <Route exact path="/edit/:id" element={<EditNote />} />
        <Route exact path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;



 // Shubh123 Shubh@123 id pass mongodb ILovePorn cluster name
