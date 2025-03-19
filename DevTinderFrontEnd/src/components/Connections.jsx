import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addconnections } from '../utils/connectionSlice'

const Connections = () => {
    const dispatch = useDispatch();
    const connections = useSelector(store => store.connections);
    const fetchConnections = async () => {
        try {
            const res = await axios.get(BASE_URL + '/user/connections', { withCredentials: true });
            dispatch(addconnections(res.data.data));
        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        fetchConnections();
    }, [])
    if (!connections) return;
    if (connections.length == 0) return <h1>No Connections Found</h1>
    return (
        <div className='flex flex-col items-center'>
            {connections.map(connection => {
                return (
                    <div className="card card-border bg-base-300 w-4/12 flex flex-row mt-5 p-4" key={connection._id}>
                        <img className='h-20 w-20 rounded-full m-auto' src={connection.photoUrl}></img>
                        <div className="card-body">
                            <h2 className="card-title">{connection.firstName + ' ' + connection.lastName}</h2>
                            <h3>{connection.gender}</h3>
                            <p>{connection.about}</p>

                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Connections