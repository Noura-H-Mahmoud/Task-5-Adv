import './ArrowPre.css'
import arrowPre from '../../assets/images/ArrowPre.svg'
import { Link } from 'react-router-dom'

export default function ArrowPre({ link }: { link: string }) {
    return (
        <Link to={link} className='NM_ArrowContainer'>
            <img src={arrowPre} alt="Arrow Icon" />
        </Link>
    )
}
