import { BrowserRouter, Routes, Route } from "react-router-dom"; // Ensure 'Route' is imported
import Body from "./Body"; // Ensure the paths to your components are correct
import Login from "./Login";
import Profile from "./Profile";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Define the main route */}
          <Route path="/" element={<Body />}>
            {/* Nested routes */}
            <Route path="login" element={<Login />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
