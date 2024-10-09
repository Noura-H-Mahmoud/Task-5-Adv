import ArrowPre from '../../ArrowPre/ArrowPre'
import Heading from '../../Heading/Heading'
import CreateForm from '../CreateForm/CreateForm'
import './Create.css'

export default function Create() {
    return (
        <div>
            <ArrowPre link='/Task-5-Adv/' />
            <Heading heading='ADD NEW ITEM' />
            <CreateForm />
        </div>
    )
}
