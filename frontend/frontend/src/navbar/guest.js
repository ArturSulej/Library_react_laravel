import { Routes, Route, Link, Navigate } from 'react-router-dom';
import Home from '../components/home';
import Login from '../components/login';
import Register from '../components/register';
import InfoBook from '../components/Book/InfoBook';
import ListBook from '../components/Book/ListBook';

function Guest() {
    return (
        <>
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Table</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/listBook">List</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/login">Login</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/register">Register</Link>
                    </li>

                </ul>

            </nav>
            <div className="container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path='/listBook' element={<ListBook />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path='/infoBook/:id' element={<InfoBook />} />
                    <Route path='*' element={<Navigate to={'/login'}></Navigate>} />
                </Routes>
            </div>
        </>
    );
}

export default Guest;
