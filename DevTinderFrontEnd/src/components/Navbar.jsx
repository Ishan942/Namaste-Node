import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import { addFeed } from "../utils/feedSlice";

const Navbar = () => {
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = async  () => {
        try {
            await axios.post(BASE_URL + '/logout',{}, {withCredentials: true});
            dispatch(addUser({}));
            dispatch(addFeed({}))
            navigate("/login");
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <div className="navbar bg-base-300 fixed z-10">
                <div className="flex-1">
                    <Link to="/" className="btn btn-ghost text-xl">🧑‍💻DevTinder</Link>
                </div>
                {user &&
                    <>
                        <p className="mr-2">{user.firstName ? 'Welcome' + user.firstName: ''}</p>
                        <div className="flex-none gap-2">
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar mr-3">
                                    <div className="w-10 rounded-full">
                                            <img
                                                alt="Tailwind CSS Navbar component"
                                                src={user.photoUrl ?? 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'}
                                            />
                                    </div>
                                </div>
                                <ul
                                    tabIndex={0}
                                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                                >
                                    <li>
                                        <Link to="/profile" className="justify-between">
                                            Profile
                                            <span className="badge">New</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/">
                                            Feed
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/connections" className="justify-between">
                                            Connections
                                            <span className="badge">New</span>
                                        </Link>
                                    </li>
                                    <li onClick={handleLogout}><a>Logout</a></li>
                                </ul>
                            </div>
                        </div>
                    </>
                }
            </div>
        </>
    );
};

export default Navbar;
