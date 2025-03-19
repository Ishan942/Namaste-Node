import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addrequests, removerequests } from '../utils/requestSlice'

const requests = () => {
    const dispatch = useDispatch();
    const requests = useSelector(store => store.requests);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const fetchrequests = async () => {
        try {
            const res = await axios.get(BASE_URL + '/user/request/recieved', { withCredentials: true });
            dispatch(addrequests(res.data.data));
        } catch (error) {
            console.log(error);
        }

    }

    const updateRequest = async (_id, status) => {
        try {
            const res = await axios.post(`${BASE_URL}/request/review/${status}/${_id}`, {}, { withCredentials: true });
            dispatch(removerequests(_id));
            setShowSuccessMessage(true);
            setTimeout(() => {
                setShowSuccessMessage(false)
            }, 3000)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
            fetchrequests();
    }, [])
    if (!requests) return;
    if (requests.length == 0) return <h1 className='mx-auto mt-10 text-center'>No requests Found</h1>
    return (
        <div className='flex flex-col items-center'>
            {requests.map(requestData => {
                const request = requestData.fromUserId;
                return (
                    <div className="card card-border bg-base-300 w-4/12  mt-5 p-4" key={requestData._id}>
                        <div className='flex flex-row'>
                            <img className='h-20 w-20 rounded-full m-auto' src={request.photoUrl}></img>
                            <div className="card-body">
                                <h2 className="card-title">{request.firstName + ' ' + request.lastName}</h2>
                                <h3>{request.gender}</h3>
                                <p>{request.about}</p>
                            </div>
                        </div>
                        <div className="card-actions justify-center flex gap-5">
                                <button className="btn btn-primary" onClick={() => {updateRequest(requestData._id, 'acepted')}}>Accept</button>
                                <button className="btn btn-warning" onClick={() => {updateRequest(requestData._id, 'rejected')}}>Reject</button>
                            </div>
                    </div>
                )
            })}
             {showSuccessMessage && <div className="toast toast-top toast-center z-20">
                <div className="alert alert-success h-10 flex justify-center align-middle">
                    <span>Profile Updated successfully.</span>
                </div>
            </div>}
        </div>
    )
}

export default requests