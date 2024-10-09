import './FormLogin.css'
import Button from '../Button/Button';
import Input from '../Input/Input';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function FormLogin() {
    const [Email, setEmail] = useState<string>('');
    const [Password, setPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const navigate = useNavigate();


    // for submit
    function send(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        axios.post('https://test1.focal-x.com/api/login', {
            email: Email,
            password: Password
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                // console.log(res.data);
                localStorage.setItem('token', `Bearer ${res.data.token}`);
                localStorage.setItem('image', res.data.user.profile_image_url);
                localStorage.setItem('username', res.data.user.user_name);
                navigate('/');
            })
            .catch(error => {
                // console.log(error);
                if (error.response && error.response.data.message) {
                    setErrorMessage(error.response.data.message);
                } else {
                    setErrorMessage('An error occurred during registration, please try again.');
                }
            });
    }
    return (
        <form onSubmit={(event) => send(event)} className='NM_LoginForm'>
            <div className='NM_EmailLogin'>
                <Input Name='email'
                    type='email'
                    label='Email'
                    placeholder='Enter your email'
                    onChange={(event) => setEmail(event.target.value)}
                    className='gap'
                />
            </div>
            <div className='NM_Password'>
                <Input Name='password'
                    type='password'
                    label='Password'
                    placeholder='Enter password'
                    onChange={(event) => setPassword(event.target.value)}
                    className='gap'
                />
            </div>
            <Button type='submit' styleButton='NM_StyleButtonAuth' buttonText='Sign In' />
            {errorMessage && <p className="NM_errorMessage">{errorMessage}</p>}
        </form>

    )
}
