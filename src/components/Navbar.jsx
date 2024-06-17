import { useContext } from 'react';
import { AuthContext } from '../App';
import { Link } from 'react-router-dom';
import profile from '../assets/profile.png';


const Navbar = ({ handleSignOut, signInWithGoogle  , fixed}) => {
    const { user } = useContext(AuthContext);
    return (
        <div className={`navbar bg-base-100 ${fixed ? "fixed" : ""} z-[100]`} data-theme="cyberpunk" >
            <div className="flex-1">
                <Link to="/">
                    <div className="btn btn-ghost text-xl">SnapChef</div>
                </Link>
                
            </div>
            <div className="flex-none">
                
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img alt="Tailwind CSS Navbar component" src={profile} />
                        </div>
                    </div>

                    {/* <li>
                          <a className="justify-between">
                              Profile
                              <span className="badge">New</span>
                          </a>
                      </li>
                      <li><a>Settings</a></li>
                      <li><a>Logout</a></li> */}
                    {user ? (
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            
                            <li><a onClick={handleSignOut}>Logout</a></li>
                        </ul>
                    ) : (
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                <li onClick={signInWithGoogle}><a>Login</a></li>
                        </ul>
                    )}

                </div>
            </div>
        </div>
    )
}
export default Navbar