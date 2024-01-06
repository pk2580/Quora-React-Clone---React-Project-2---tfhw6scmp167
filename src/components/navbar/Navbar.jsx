import React, { useState } from 'react'
import './Navbar.css'
import Logo from '../../assets/images/Logo.svg'
import { NavLink } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search';
import { quesAndAns, user } from '../../constants';
import { Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const Navbar = ({ qna, setQna }) => {
    const [searchInput, setSearchInput] = useState('')
    const [menuOpen, setMenuOpen] = useState(false)
    const handleOnEnter = (e) => {
        if (e.charCode === 13) {
            const qnaFilter = qna.filter((qna) => qna.question.toLowerCase().includes(searchInput.toLowerCase()))
            setQna(qnaFilter)
        }
    }
    const handleLogOut = () => {

        if (window.confirm('Are you sure to LogOut?')) {
            localStorage.setItem('user', JSON.stringify({ ...user, islogged: false }))
            window.location.reload()
        }
    }
    return (
        <nav className='navbar'>
            <div className="wrapper">
                <div className="left">
                    <NavLink className="logo" to='/'>
                        <img src={Logo} alt="logo" />
                    </NavLink>
                </div>
                <div className="search-container">
                    <label htmlFor="question-search">
                        <SearchIcon className='search-icon' />
                    </label>
                    <input
                        type="text"
                        id='question-search'
                        placeholder='search for questions.....'
                        onChange={(e) => {
                            setSearchInput(e.target.value);
                            setQna(quesAndAns)
                        }}
                        onKeyPress={handleOnEnter}
                        value={searchInput}
                    />
                </div>
                <div className='right'>

                    <ul className={`lists ${menuOpen && 'active'}`}>
                        <li className="list-item">
                            <NavLink to='add-question'>
                                <button>
                                    <div>Add</div>
                                    <div>questions</div>
                                </button>
                            </NavLink>
                        </li>
                        <li className="list-item">
                            <NavLink to='/add-answer'>
                                <button>
                                    <div>Add</div>
                                    <div>answers</div>
                                </button>
                            </NavLink>
                        </li>
                        <li>
                            {user?.islogged ?

                                <div className="user_info">
                                    <Avatar className='user-avatar' onClick={handleLogOut} style={{ backgroundColor: '#B92B27' }} />
                                </div>

                                :

                                <NavLink to='/login' className='list-item' >
                                    <button className='btn-login' type='button'>Login</button>
                                </NavLink>

                            }
                        </li>
                    </ul>

                    <div className="menu" onClick={() => setMenuOpen(!menuOpen)} >
                        {menuOpen ? <CloseIcon /> : <MenuIcon />}
                    </div>
                </div>

            </div>

        </nav>
    )
}

export default Navbar