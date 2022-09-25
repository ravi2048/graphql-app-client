import logo from '../assets/logo.png';
import './Header.css';
export default function Header() {
    return (
        <div className='main-header'>
            <img src={logo} alt='logo' className='logo'/>
            <h1 className='text'>Project Management App</h1>
        </div>
    )
}