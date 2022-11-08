import React from 'react'

const CardUsers = ({ user, deleteUserById, setUpdateInfo ,setFormIsClose}) => {

	const handleEdit = () => {
		setUpdateInfo(user)
		setFormIsClose(false)
	}

	return (
		<article className='card__user'>
			<h2>{user?.firstname} {user?.lastname}</h2>
			<hr />
			<p><span>Email</span>{user?.email}</p>
			<p><span>Birthday</span><i className='bx bx-gift'></i>{user?.birthday?.slice(0, 10)}</p>
			<hr />
			<div className='card__buttons'>
				<a onClick={() => deleteUserById(user.id)}><i className='bx bx-trash'></i></a>
				<a onClick={handleEdit}><i className='bx bx-edit-alt' ></i></a>
			</div>
		</article>
	)
}

export default CardUsers