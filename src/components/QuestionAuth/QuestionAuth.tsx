import { Link } from 'react-router-dom';
import './QuestionAuth.css'

interface Data {
    para: string;
    link: string;
    textLink: string;
}
export default function QuestionAuth({ para, link, textLink }: Data) {
    return (
        <div className='NM_QuestionAuth'>
            <p>{para}</p>
            <Link to={link}>{textLink}</Link>
        </div>
    )
}
