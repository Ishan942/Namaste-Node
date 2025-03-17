import React from 'react'

const userCard = ({user}) => {
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
            <button className="btn btn-warning">Ignore</button>
            <button className="btn btn-primary">Intrested</button>
        </div>
        </div>
    </div>
  )
}

export default userCard