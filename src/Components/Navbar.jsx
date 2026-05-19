import { Link } from "react-router-dom"
export default function Navbar(){
    return(
        <>
            <nav className="flex justify-between border-b p-3">
                <ul className=" flex space-x-4">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/profile">Profile</Link>
                    </li>
                </ul>
                <ul>
                    <li> <Link to={'/login'}>Login</Link></li>
                </ul>
            </nav>
        </>
    )
}