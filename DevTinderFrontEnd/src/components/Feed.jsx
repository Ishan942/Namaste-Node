import axios from 'axios';
import React, { useEffect } from 'react';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../utils/feedSlice';
import Usercard from './userCard';

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector(store => store.feed);

  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + '/feed', { withCredentials: true });
      dispatch(addFeed(res.data.data));
    } catch (error) {
      console.log(error);
      // TODO: Redirect to error page
    }
  };

  useEffect(() => {
    if(!feed) getFeed();
  }, []);

  // If feed is null, return nothing (do not render anything)
  if (!feed) return null;

  // If feed is an empty array, show the "No Users" message
  if (feed.length === 0) {
    return <h1 className='mx-auto mt-10 text-center'>You Have No Users To Display</h1>;
  }

  // Show user card if there is at least one user
  return (
    <div className='m-auto flex justify-center mt-5'>
      <Usercard user={feed[0]} />
    </div>
  );
};

export default Feed;
