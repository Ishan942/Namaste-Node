import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"; 
import { useSelector } from "react-redux"; 
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Feed from "./components/Feed";
import Connections from "./components/Connections";
import Requests from "./components/Requests";

// Protected Route Wrapper
const ProtectedRoute = ({ element }) => {
  const user = useSelector((state) => state.user); // Get user from store
  return user ? element : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter>
        <Routes>
          {/* Protected Routes */}
          <Route path="/" element={<Body />}>
            <Route path="/login" element={<Login />} />
            <Route index element={<ProtectedRoute element={<Feed />} />} />
            <Route path="profile" element={<ProtectedRoute element={<Profile />} />} />
            <Route path="connections" element={<ProtectedRoute element={<Connections />} />} />
            <Route path="requests" element={<ProtectedRoute element={<Requests />} />} />
          </Route>
          
          {/* Redirect unknown routes to home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
