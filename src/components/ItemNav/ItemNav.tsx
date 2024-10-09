import { NavLink } from 'react-router-dom';
import './ItemNav.css'

interface ItemNavProps {
    image: string;
    para: string;
    link?: string;
    flexReverse?: string;
    onClick?: () => void;
}

export default function ItemNav({ image, para, link = "#", flexReverse, onClick }: ItemNavProps) {
    return (
        <NavLink
            to={link}
            className={({ isActive }) => `NM_NavItem ${flexReverse} ${isActive ? 'active' : ''}`}
            onClick={onClick}
        >
            <img src={image} alt="Icon" />
            <p>{para}</p>
        </NavLink>
    )
}
