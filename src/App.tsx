import { Outlet, Route, Routes, useLocation } from 'react-router';
import './App.css';
import Auditorium from './components/Auditorium/Auditorium';
import Group from './components/Group/Group';
import Navbar from './components/Navbar/Navbar';
import Schedule from './components/Schedule/Schedule';
import Subject from './components/Subject/Subject';
import Teacher from './components/Teacher/Teacher';

const Layout = () => {
	const location = useLocation();
	const hideNavbarOn = ['/'];

	return (
		<>
			{!hideNavbarOn.includes(location.pathname) && <Navbar></Navbar>}
			<div className='plug'></div>
			<Outlet></Outlet>
		</>
	)
}

function App() {
	return (
		<Routes>
			<Route path='/' element={<Layout></Layout>}>
				<Route path='teacher' element={<Teacher></Teacher>}></Route>
				<Route path='subject' element={<Subject></Subject>}></Route>
				<Route path='auditorium' element={<Auditorium></Auditorium>}></Route>
				<Route path='group' element={<Group></Group>}></Route>
				<Route path='schedule' element={<Schedule></Schedule>}></Route>
			</Route>
		</Routes>
	);
}

export default App;
