import { BrowserRouter, Routes, Route } from "react-router-dom"; // Ensure 'Route' is imported
import Body from "./components/Body"; // Ensure the paths to your components are correct
import Login from "./components/Login";
import Profile from "./components/Profile";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./components/Feed";

function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter>
          <Routes>
            {/* Define the main route */}
            <Route path="/" element={<Body />}>
              {/* Nested routes */}
              <Route path="/" element={<Feed />} />
              <Route path="login" element={<Login />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
