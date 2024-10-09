import ItemsNav from '../ItemsNav/ItemsNav'
import './SideBar.css'
import boxes from '../../assets/images/boxes.svg'
import bookmark from '../../assets/images/bookmark.svg'
import signOut from '../../assets/images/sign-out-alt.svg'
import ItemNav from '../ItemNav/ItemNav';
import { useNavigate } from 'react-router-dom'
import Profile from '../Profile/Profile'

interface Item {
    icon: string;
    para: string;
    link?: string;
}
export default function SideBar({ logo }: { logo: string }) {
    const navigate = useNavigate();
    const items: Array<Item> = [
        {
            icon: boxes,
            para: 'Products',
            link: '/Task-5-Adv/'
        },
        {
            icon: bookmark,
            para: 'Favorites',
            link:'/Task-5-Adv/favorites'
        },
        {
            icon: bookmark,
            para: 'order list',
            link:'/Task-5-Adv/order-list'
        }
    ]

    // for logout
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/Task-5-Adv/signIn');
    }

    // for profile data
    const userName = localStorage.getItem('username') ?? 'Guest';
    const userImage = localStorage.getItem('image') ?? 'default_profile_image_url';

    return (
        <nav>
            <div className='NM_TopContainer'>
                <img src={logo} alt="logo" className='NM_LogoSide' />
                <Profile userName={userName} src={userImage}/>
                <ItemsNav items={items} />
            </div>
            <div className='NM_SignOutContainer'>
                <ItemNav image={signOut} para='Logout' link='/Task-5-Adv/signIn' flexReverse='flex_reverse' onClick={handleLogout} />
            </div>
        </nav>
    )
}
