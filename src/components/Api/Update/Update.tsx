import ArrowPre from '../../ArrowPre/ArrowPre';
import Heading from '../../Heading/Heading';
import UpdateForm from '../UpdateForm/UpdateForm';
import './Update.css';

export default function Update() {

    return (
        <div>
            <ArrowPre link='/Task-5-Adv/' />
            <Heading heading='Edit ITEM' />
            <UpdateForm /> 
        </div>
    );
}