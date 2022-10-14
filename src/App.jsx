import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import axios from 'axios'
import FormUsers from './components/FormUsers'
import CardUsers from './components/CardUsers'
import Pagination from './components/Pagination'

const baseURL = 'https://lmz-server-production.up.railway.app/api'

function App() {
	const [users, setUsers] = useState()
	const [updateInfo, setUpdateInfo] = useState()
	const [formIsClose,setFormIsClose] = useState(true)
	const [currentPage,setCurrentPage] = useState(1)
	const [postsPerPage,setPostsPerPage] = useState(9)

	const getAllUsers = () => {
		const URL = `${baseURL}/user`
		axios.get(URL)
			.then(res => setUsers(res.data))
			.catch(err => console.log(err))
	}

	useEffect(() => {
		getAllUsers()
	}, [])

	const createNewUser = data => {
		const URL = `${baseURL}/user`
		axios.post(URL, data)
			.then(res => {
				console.log(res.data)
				getAllUsers()
			}
			)
			.catch(err => console.log(err))
	}

	const deleteUserById = (id) => {
		const URL = `${baseURL}/user/${id}`
		axios.delete(URL)
			.then(res => {
				console.log(res.data)
				getAllUsers()
			})
			.catch(err => console.log(err))
	}

	const updateUserById = (id, data) => {
		const URL = `${baseURL}/user/${id}`
		axios.patch(URL, data)
			.then(res => {
				console.log(res.data)
				getAllUsers()
			})
			.catch(err => console.log(err))
	}

	const handleOpenForm = () => {
		setFormIsClose(false)
	}

	console.log('USERS: ', users);


	const indexOfLastUser = currentPage * postsPerPage
	const indexOfFirstUser = indexOfLastUser - postsPerPage
	const currentUserPage = users?.slice(indexOfFirstUser,indexOfLastUser)

	const paginate = (pageNumber) => setCurrentPage (pageNumber)

	return (
		<div className="App">
			<header className='header__users'>
				<h1>Usuarios</h1>
				<button onClick={handleOpenForm}><i className='bx bx-plus' ></i> Crear nuevo Usuario</button>
			</header>
			<div className={`form-container ${formIsClose && 'disable__form'}`}>
				<FormUsers
					createNewUser={createNewUser}
					updateInfo={updateInfo}
					updateUserById={updateUserById}
					setUpdateInfo={setUpdateInfo}
					setFormIsClose={setFormIsClose}
				/>
			</div>
			<div className='content_card'>
				{
					currentUserPage?.map(user => <CardUsers key={user.id}
						user={user}
						deleteUserById={deleteUserById}
						setUpdateInfo={setUpdateInfo}
						setFormIsClose={setFormIsClose}
					/>)
				}
			</div>
			<Pagination  postsPerPage={postsPerPage} users={users} paginate={paginate} currentPage={currentPage}/>

		</div>
	)
}

export default App
