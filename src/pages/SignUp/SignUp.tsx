import './SignUp.css'
import logo from '../../assets/images/logo2.svg'
import MainForm from '../../components/MainForm/MainForm'

export default function SignUp() {
    return (
        <div className='NM_SignUp'>
            <MainForm
                logo={logo}
                title='SIGN UP'
                text='Fill in the following fields to create an account.'
            />
        </div>
    )
}
