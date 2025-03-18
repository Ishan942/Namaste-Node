import React, { useState, useEffect } from "react";
import UserCard from './userCard';
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const UserProfileForm = ({ user }) => {
    const dispatch = useDispatch();
    console.log(user);
    const [firstName, setFirstName] = useState(user?.firstName || "");
    const [lastName, setLastName] = useState(user?.lastName || "");
    const [gender, setGender] = useState(user?.gender || "Male");
    const [about, setAbout] = useState(user?.about || "");
    const [skills, setSkills] = useState(user?.skills || "");
    const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const updateProfile = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.patch(BASE_URL + '/profile/edit', { firstName, lastName, gender, about, skills, photoUrl }, { withCredentials: true });
            dispatch(addUser(res.data.data));
            setShowSuccessMessage(true);
            setTimeout(() => {
                setShowSuccessMessage(false);
            }, 3000);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        if (user) {
            setFirstName(user.firstName ?? "");
            setLastName(user.lastName ?? "");
            setGender(user.gender ?? "male");
            setAbout(user.about ?? "");
            setSkills(user.skills ?? "");
            setPhotoUrl(user.photoUrl ?? "");
        }
    }, [user]);

    const handleUpdate = (field, value) => {
        const updatedUser = {
            firstName,
            lastName,
            gender,
            about,
            skills,
            photoUrl,
            [field]: value, // Update only the changed field
        };
    };


    return (
        user &&
        (<div className="flex justify-center my-1">
            <form className="w-full max-w-md p-4 border rounded-lg mx-5">
                <h1 className="text-lg flex justify-center">Edit Profile</h1>
                {/* First Name */}
                <label className="form-control w-full">
                    <span className="label-text">First Name</span>
                    <input
                        type="text"
                        className="input input-bordered w-full mt-1"
                        value={firstName}
                        onChange={(e) => {
                            setFirstName(e.target.value);
                            handleUpdate("firstName", e.target.value);
                        }}
                    />
                </label>

                {/* Last Name */}
                <label className="form-control w-full mt-1">
                    <span className="label-text">Last Name</span>
                    <input
                        type="text"
                        className="input input-bordered w-full mt-1"
                        value={lastName}
                        onChange={(e) => {
                            setLastName(e.target.value);
                            handleUpdate("lastName", e.target.value);
                        }}
                    />
                </label>

                {/* Gender */}
                <label className="form-control w-full mt-1">
                    <span className="label-text">Gender</span>
                    <select
                        className="select select-bordered w-full mt-1"
                        value={gender}
                        onChange={(e) => {
                            setGender(e.target.value);
                            handleUpdate("gender", e.target.value);
                        }}
                    >
                        <option value="male">male</option>
                        <option value="female">female</option>
                        <option value="other">other</option>
                    </select>
                </label>

                {/* About */}
                <label className="form-control w-full mt-1">
                    <span className="label-text">About</span>
                    <textarea
                        className="textarea textarea-bordered w-full mt-1"
                        value={about}
                        onChange={(e) => {
                            setAbout(e.target.value);
                            handleUpdate("about", e.target.value);
                        }}
                    />
                </label>

                {/* Skills */}
                <label className="form-control w-full mt-1">
                    <span className="label-text">Skills (comma-separated)</span>
                    <input
                        type="text"
                        className="input input-bordered w-full mt-1"
                        value={skills}
                        onChange={(e) => {
                            setSkills(e.target.value);
                            handleUpdate("skills", e.target.value);
                        }}
                    />
                </label>

                {/* Photo URL */}
                <label className="form-control w-full mt-1">
                    <span className="label-text">Photo URL</span>
                    <input
                        type="text"
                        className="input input-bordered w-full mt-1"
                        value={photoUrl}
                        onChange={(e) => {
                            setPhotoUrl(e.target.value);
                            handleUpdate("photoUrl", e.target.value);
                        }}
                    />
                </label>

                <button type="button" className="btn btn-primary w-full mt-3" onClick={updateProfile}>
                    Save Profile
                </button>
            </form>
            <div className="h-6/12 mt-10">
                <UserCard user={{ firstName, lastName, gender, about, skills, photoUrl }} />
            </div>
            {showSuccessMessage && <div className="toast toast-top toast-center z-20">
                <div className="alert alert-success h-10 flex justify-center align-middle">
                    <span>Profile Updated successfully.</span>
                </div>
            </div>}
        </div>)
    );
};

export default UserProfileForm;
