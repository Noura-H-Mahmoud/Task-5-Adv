import { useLocation } from 'react-router-dom';
import FormLogin from '../FormLogin/FormLogin';
import FormSignUp from '../FormSignUp/FormSignUp';
import QuestionAuth from '../QuestionAuth/QuestionAuth';
import './MainForm.css'


interface Content {
  logo: string;
  title: string;
  text: string;
  className?: string;
  classNameLogo?: string;
  classNameText?: string;
}
export default function MainForm({ logo, title, text, className, classNameLogo, classNameText }: Content) {
  const location = useLocation();
  return (
    <div className={`NM_Form ${className}`}>
      <img className={`NM_Logo ${classNameLogo}`} src={logo} alt="logo" />
      <h1>{title}</h1>
      <p className={`NM_MainText ${classNameText}`}>{text}</p>
      {location.pathname === '/Task-5-Adv/signUp' ? (
        <>
          <FormSignUp />
          <QuestionAuth para='Do you have an account?' link='/Task-5-Adv/signIn' textLink='Sign in' />
        </>
      ) : (
        <>
          <FormLogin />
          <QuestionAuth para="Don’t have an account?" link='/Task-5-Adv/signUp' textLink='Create one' />
        </>
      )}
    </div>
  )
}
