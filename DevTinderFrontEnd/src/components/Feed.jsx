import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'
import Usercard from './userCard';

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector(store => store.feed);
  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + '/feed', {withCredentials: true});
      dispatch(addFeed(res.data.data));
    } catch (error) {
      console.log(error);
      //TODO: make redirect to error page
    }
    
  }
  useEffect(() => {
    if(!feed) { 
     getFeed();
    }
  }, [])
  return (
    feed && <div className='m-auto flex justify-center mt-5'><Usercard user={feed[0]}/></div>
  )
}

export default Feed