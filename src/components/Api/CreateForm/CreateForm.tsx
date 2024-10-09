import { useState } from 'react';
import './CreateForm.css'
import axios from 'axios';
import Input from '../../Input/Input';
import upload from '../../../assets/images/UploadIcon.svg';
import Button from '../../Button/Button';
import { useNavigate } from 'react-router-dom';

export default function CreateForm() {
    const [TheName, setTheName] = useState<string>('');
    const [Price, setPrice] = useState<string>('');
    const [Image, setImage] = useState<File | undefined>(undefined);
    const [imagePreview, setImagePreview] = useState<string | undefined>('');
    const [message, setMessage] = useState<string>('');
    const navigate = useNavigate();

    // function for create product
    const send = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!TheName || !Price || !Image) {
            setMessage('Please fill in all the required fields');
            return;
        }

        const formData = new FormData();
        formData.append('name', TheName);
        formData.append('price', Price);
        if (Image) {
            formData.append('image', Image);
        }

        axios.post('https://test1.focal-x.com/api/items', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => {
                setMessage('Product created successfully!');
                console.log('Response:', res.data);
                // Navigate after 10 seconds
                setTimeout(() => {
                    navigate('/Task-5-Adv/');
                }, 700)
            })
            .catch(error => {
                setMessage('Error creating product');
                console.error('Error:', error.response ? error.response.data : error.message);
            });

    }

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

    return (
        <form onSubmit={(event) => send(event)} className='NM_FormProduct'>
            <div className='NM_FormContainerProduct'>
                <div className='NM_namePrice'>
                    <Input Name='Name'
                        type='text'
                        label='Name'
                        placeholder='Enter the product name'
                        onChange={(event) => setTheName(event.target.value)}
                        className='NM_InputProduct gapFormProduct16'
                    />
                    <Input Name='price'
                        type='text'
                        label='Price'
                        placeholder='Enter the product price'
                        onChange={(event) => setPrice(event.target.value)}
                        className='NM_InputProduct gapFormProduct16'
                    />
                </div>
                <div className='NM_File'>
                    <Input type='file'
                        label='Image'
                        styleImageInput='NM_ImageInput NM_ImageInputProduct'
                        src={upload}
                        imagePreview={imagePreview}
                        bigSize='NM_UploadIconBig'
                        onChange={handleImageChange}
                        className='NM_InputProduct gapFormProduct14'
                        bigSizeImagePreview='bigSizeImagePreview'
                    />
                </div>
            </div>
            {message && <p className='NM_MessageProduct'>{message}</p>}
            <Button type='submit' styleButton='mainStyleButton NM_Save' buttonText='Save' />
        </form>
    )
}
