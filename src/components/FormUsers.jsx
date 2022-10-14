import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import './styles/formUsers.css'

const defaultValues = {
	email: '',
	password: '',
	firstname: '',
	lastname: '',
	birthday: ''
}

const FormUsers = ({ createNewUser, updateInfo,setUpdateInfo,updateUserById,setFormIsClose }) => {

	const { handleSubmit, reset, register } = useForm()

	useEffect((updateInfo) => {
		if (updateInfo) {
			reset(updateInfo)
		}
	}, [updateInfo])

	const submit = data => {
		if (updateInfo) {
			updateUserById(updateInfo.id ,data)
			setUpdateInfo()
		} else {
			createNewUser(data)	
		}
		reset(defaultValues)
		setFormIsClose(false)
	}

	const handleCloseForm = () => {
		setUpdateInfo()
		setFormIsClose(true)
	}

	return (
		<form className='form' onSubmit={handleSubmit(submit)}>
			<i onClick={handleCloseForm} className='form__close bx bx-window-close'></i>
			<h2 className='form__title'>{updateInfo ? 'Update User' : 'New User'}</h2>
			<div className='form__div'>
				<label className='form__label' htmlFor="email">Email</label>
				{updateInfo ? <input className='form__input_disabled' placeholder={updateInfo.email} disabled/> : <input className='form__input' placeholder='Insert you Email' type="email" id="email" {...register('email')}  /> }
			</div>
			<div className='form__div'>
				<label className='form__label' htmlFor="password">Password</label>
				{updateInfo ? <input className='form__input_disabled' placeholder='******' disabled/> : <input className='form__input' placeholder='Insert you Password' type="password" id="password" {...register('password')} /> }
			</div>
			<div className='form__div'>
				<label className='form__label' htmlFor="firstname">Firstname</label>
				<input className='form__input' type="text" id="firstname" placeholder='Insert you Firstname' {...register('firstname')} />
			</div>
			<div className='form__div'>
				<label className='form__label' htmlFor="lastname">Lastname</label>
				<input className='form__input' type="text" id="lastname" placeholder='Insert you Lastname' {...register('lastname')} />
			</div>
			<div className='form__div'>
				<label className='form__label' htmlFor="birthday">Birthday</label>
				{updateInfo ? <input className='form__input_disabled' placeholder={updateInfo.birthday.slice(0,10)} disabled/> : <input className='form__input' type="date" id="birthday" {...register('birthday')} /> }
				
			</div>
			<button className='form__btn'>{updateInfo ? 'Update' : 'Create'}</button>
		</form>
	)
}

export default FormUsers