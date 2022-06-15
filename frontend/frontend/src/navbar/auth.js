import { Routes, Route, Link } from 'react-router-dom';
import Home from '../components/home';
import AuthUser from '../components/AuthUser';
import AddBook from '../components/Book/AddBook';
import EditBook from '../components/Book/EditBook';
import AddCategory from '../components/Category/AddCategory';
import EditCategory from '../components/Category/EditCategory';
import InfoBook from '../components/Book/InfoBook';
import ListBook from '../components/Book/ListBook';


function Auth() {
    const {token,logout} = AuthUser();
    const logoutUser = () => {
        if(token != undefined){
            logout();
        }
    }
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
                        <span role="button" className="nav-link" onClick={logoutUser}>Logout</span>
                    </li>

                </ul>

            </nav>
            <div className="container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path='/listBook' element={<ListBook />} />
                    <Route path="/addBook" element={<AddBook />} />
                    <Route path="/editBook/:id" element={<EditBook />} />
                    <Route path="/addCategory" element={<AddCategory />} />
                    <Route path="/editCategory/:id" element={<EditCategory />} />
                    <Route path='/infoBook/:id' element={<InfoBook />} />
                </Routes>
            </div>
        </>
    );
}

export default Auth;
