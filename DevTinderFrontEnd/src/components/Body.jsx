import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice'

export const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user)
  const fetchUsers = async () => {
    if(userData) return;
    try {
      const user = await axios.get(BASE_URL + '/profile/view', {withCredentials: true});
      dispatch(addUser(user.data.data));
    } catch (error) {
      if(error.status == 401) {
        navigate('/login');
      }
    }
  }
  useEffect(() => {fetchUsers()}, []);
  return (
    <div>
        <Navbar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Body;