import { useEffect, useState } from 'react'
import { NavLink } from 'react-router'
import './Navbar.css'

const Navbar = () => {
	const [them, setTheme] = useState(() => {
		return localStorage.getItem('them') || 'light';
	})

	useEffect(() => {
		document.documentElement.setAttribute('data-them', them);
		localStorage.setItem('them', them)
	}, [them])

	const toggleTheme = () => {
		setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
	}
	return (
		<nav>
			<ul>
				<li><NavLink className={({ isActive }) => (isActive ? 'active nav_link' : 'nav_link')} to='/schedule'>Расписания</NavLink></li>
				<li><NavLink className={({ isActive }) => (isActive ? 'active nav_link' : 'nav_link')} to='/teacher'>Преподаватели</NavLink></li>
				<li><NavLink className={({ isActive }) => (isActive ? 'active nav_link' : 'nav_link')} to='/subject'>Предметы</NavLink></li>
				<li><NavLink className={({ isActive }) => (isActive ? 'active nav_link' : 'nav_link')} to='/auditorium'>Кабинеты</NavLink></li>
				<li><NavLink className={({ isActive }) => (isActive ? 'active nav_link' : 'nav_link')} to='/group'>Группы</NavLink></li>
			</ul>
			<button onClick={toggleTheme}>them</button>
		</nav>
	)
}

export default Navbar;
