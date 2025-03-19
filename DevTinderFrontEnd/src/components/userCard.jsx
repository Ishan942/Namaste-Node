import axios from 'axios'
import React from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { removeFeed } from '../utils/feedSlice'

const userCard = ({user}) => {
  const dispatch = useDispatch();
  const updateConnectionStatus = async (status, _id) => {
    try {
      const res = await axios.post(`${BASE_URL}/request/send/${status}/${_id}`, {}, {withCredentials: true});
      console.log(res);
      dispatch(removeFeed(_id));
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="card bg-base-300 w-96  h-85  shadow-sm" style={{height: '500px'}}>
        <figure className="px-10 pt-10">
        <img
            src={user?.photoUrl}
            alt="Shoes"
            className="rounded-xl" />
        </figure>
        <div className="card-body items-center text-center">
        <h2 className="card-title">{user?.firstName + ' ' + user?.lastName}</h2>
        <p>{user?.about}</p>
        <div className="card-actions">
            <button className="btn btn-warning" onClick={() => updateConnectionStatus('ignored', user._id)}>Ignore</button>
            <button className="btn btn-primary" onClick={() => updateConnectionStatus('intrested', user._id)}>Intrested</button>
        </div>
        </div>
    </div>
  )
}

export default userCard