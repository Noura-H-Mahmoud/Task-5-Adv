import Button from '../Button/Button';
import Input from '../Input/Input';
import upload from '../../assets/images/UploadIcon.svg'
import './FormSignUp.css'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function FormSignUp() {
    const [TheFirstName, setTheFirstName] = useState<string>('');
    const [TheLastName, setTheLastName] = useState<string>('');
    const [Email, setEmail] = useState<string>('');
    const [Password, setPassword] = useState<string>('');
    const [ConfirmPassword, setConfirmPassword] = useState<string>('');
    const [Image, setImage] = useState<File | undefined>(undefined);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [imagePreview, setImagePreview] = useState<string | undefined>('');
    const navigate = useNavigate();

    // for change photo
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            const reader = new FileReader();

            reader.onloadend = () => {
                setImage(file);
                setImagePreview(reader.result as string);
            };

            reader.readAsDataURL(file);
        }
    };

    // for submit
    function send(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        // for password
        if (Password !== ConfirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        const formData = new FormData();
        formData.append('first_name', TheFirstName);
        formData.append('last_name', TheLastName);
        const userName = `${TheFirstName} ${TheLastName}`
        formData.append('user_name', userName);
        formData.append('email', Email);
        formData.append('password', Password);
        formData.append('password_confirmation', Password);
        if (Image) {
            formData.append('profile_image', Image);
        }

        axios.post('https://test1.focal-x.com/api/register', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(res => {
                // console.log('Response:', res.data);
                const userData = res.data?.data;

                if (userData && userData.user && userData.token) {
                    localStorage.setItem('token', `Bearer ${userData.token}`);
                    localStorage.setItem('image', userData.user?.profile_image_url || '');
                    localStorage.setItem('username', userData.user?.user_name || '');
                    navigate('/');
                } else {
                    setErrorMessage('Invalid user data received from the server.');
                }
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

        <form onSubmit={(event) => send(event)} className='NM_SignUpForm'>
            <div className='NM_InputsDiv'>
                <Input Name='firstName'
                    type='text'
                    label='Name'
                    placeholder='First Name'
                    onChange={(event) => setTheFirstName(event.target.value)}
                />
                <Input Name='lastName'
                    type='text'
                    placeholder='Last Name'
                    onChange={(event) => setTheLastName(event.target.value)}
                />
            </div>
            <div className='NM_Email'>
                <Input Name='email'
                    type='email'
                    label='Email'
                    placeholder='Enter your email'
                    onChange={(event) => setEmail(event.target.value)}
                />
            </div>
            <div className='NM_InputsDiv'>
                <Input Name='password'
                    type='password'
                    label='Password'
                    placeholder='Enter password'
                    onChange={(event) => setPassword(event.target.value)}
                />
                <Input Name='confirmPassword'
                    type='password'
                    placeholder='Re-enter your password'
                    onChange={(event) => setConfirmPassword(event.target.value)}
                />
            </div>
            <div>
                <Input type='file'
                    label='Profile Image'
                    styleImageInput='NM_ImageInput NM_ImageInputResponsive'
                    src={upload}
                    imagePreview={imagePreview}
                    onChange={handleImageChange}
                />
            </div>
            <Button type='submit' styleButton='NM_StyleButtonAuth' buttonText='Sign Up' />
            {errorMessage && <p className="NM_errorMessage">{errorMessage}</p>}
        </form>

    )
}
