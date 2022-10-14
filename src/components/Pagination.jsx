import React from 'react'



const Pagination = ({ postsPerPage, users, paginate, currentPage }) => {

    const pageNumbers = []

    if (users) {
        for (let i = 1; i <= Math.ceil(users.length / postsPerPage); i++) {
            pageNumbers.push(i)
        }
    }

    const handleBC = (page) => {
        if (page === currentPage)
            return ({ backgroundColor: '#fff',color: '#317dc4',border:'1px #317dc4 solid' })
        else return ({ backgroundColor: '#4b555e' ,color: '#fff'})
    }

    return (
         <nav>
        <ul className='pagination'>
        {
           (pageNumbers.length > 1) ? <> {pageNumbers.map( number => (
            <li key={number} className='page__item' style={handleBC(number)}>
                <a onClick={() => paginate(number)} className='page__link' >
                    {number}
                </a>
            </li>
        ))}</> : <div></div>
        }
        </ul>
    </nav>
    )
}

export default Pagination