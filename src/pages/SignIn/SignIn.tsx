import MainForm from '../../components/MainForm/MainForm'
import './SignIn.css'
import logo from '../../assets/images/logo2.svg'

export default function SignIn() {
  return (
    <div className='NM_SignIn'>
            <MainForm
                logo={logo}
                title='SIGN IN'
                text='Enter your credentials to access your account'
                className='paddingLogin'
                classNameLogo='LogoBottomLogin'
                classNameText='NM_textLoginMargin'
            />
        </div>
  )
}
