import { useEffect, useState } from 'react';
import './UpdateForm.css'
import axios from 'axios';
import Input from '../../Input/Input';
import Button from '../../Button/Button';
import upload from '../../../assets/images/UploadIcon.svg'
import { useNavigate, useParams } from 'react-router-dom';
import defaultImage from '../../../assets/images/default.png';


interface Product {
    id: number;
    name: string;
    price: string;
    image_url: string;
}
export default function UpdateForm() {
    const [product, setProduct] = useState<Product | null>(null);
    const [name, setname] = useState<string>('');
    const [price, setprice] = useState<string>('');
    const [image, setimage] = useState<File | null>(null);
    const [message, setMessage] = useState<string>('');
    const [imagePreview, setImagePreview] = useState<string>(defaultImage);
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`https://test1.focal-x.com/api/items/${params.id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => {
                setProduct(res.data);
                // console.log(res.data);
                setname(res.data.name);
                setprice(res.data.price);
                setImagePreview(res.data.image_url || defaultImage);

            })
            .catch(error => {
                console.error("Error fetching product: ", error);
            });
    }, [params.id])


    // function for update product
    const send = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);

        if (image === null) {
            formData.append('image', ''); 
        } else if (image) {
            formData.append('image', image); 
        }

        // console.log('image:', image);

        formData.append('_method', 'PUT');
        await axios.post(`https://test1.focal-x.com/api/items/${params.id}`
            , formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => {
                setMessage('Product updated successfully!');
                console.log('Response:', res.data);
                // Navigate after seconds
                setTimeout(() => {
                    navigate('/Task-5-Adv/');
                }, 700)
            })
            .catch(error => {
                setMessage('Error updating product');
                console.error('Error:', error.response ? error.response.data : error.message);
            });
    };

    // for change photo
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            const reader = new FileReader();

            reader.onloadend = () => {
                setimage(file);
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
                        onChange={(event) => setname(event.target.value)}
                        className='NM_InputProduct gapFormProduct16'
                        defaultValue={product?.name}
                    />
                    <Input Name='price'
                        type='text'
                        label='Price'
                        placeholder='Enter the product price'
                        onChange={(event) => setprice(event.target.value)}
                        className='NM_InputProduct gapFormProduct16'
                        defaultValue={product?.price}
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



// import { useEffect, useState } from 'react';
// import './UpdateForm.css'
// import axios from 'axios';
// import Input from '../../Input/Input';
// import Button from '../../Button/Button';
// import upload from '../../../assets/images/UploadIcon.svg'
// import { useNavigate, useParams } from 'react-router-dom';


// interface Product {
//     id: number;
//     name: string;
//     price: string;
//     image_url: string;
// }
// export default function UpdateForm() {
//     const [product, setProduct] = useState<Product | null>(null);
//     const [name, setname] = useState<string>('');
//     const [price, setprice] = useState<string>('');
//     const [image, setimage] = useState<File | undefined>(undefined);
//     const [message, setMessage] = useState<string>('');
//     const [imagePreview, setImagePreview] = useState<string | undefined>('');
//     const params = useParams();
//     const navigate = useNavigate();

//     useEffect(() => {
//         axios.get(`https://test1.focal-x.com/api/items/${params.id}`, {
//             headers: {
//                 Authorization: `Bearer ${localStorage.getItem('token')}`
//             }
//         })
//             .then(res => {
//                 setProduct(res.data);
//                 console.log(res.data);
//                 setname(res.data.name);
//                 setprice(res.data.price);
//                 setImagePreview(res.data.image_url);

//             })
//             .catch(error => {
//                 console.error("Error fetching product: ", error);
//             });
//     }, [params.id])


//     // function for update product
//     const send = async (event: React.FormEvent<HTMLFormElement>) => {
//         event.preventDefault();

//         const formData = new FormData();
//         formData.append('name', name);
//         formData.append('price', price);

//         if (image) {
//             formData.append('image', image);
//         } else if (imagePreview) {
//             try {
//                 const response = await fetch(imagePreview);
//                 if (!response.ok) {
//                     throw new Error(`HTTP error! status: ${response.status}`);
//                 }
//                 const blob = await response.blob();
//                 const file = new File([blob], 'image.webp', { type: blob.type });
//                 formData.append('image', file);
//             } catch (error) {
//                 console.error('Error fetching the image:', error);
//                 setMessage('An error occurred while fetching the image.');
//             }
//         }


//         console.log('image:', image);

//         formData.append('_method', 'PUT');
//         await axios.post(`https://test1.focal-x.com/api/items/${params.id}`
//             , formData, {
//             headers: {
//                 'Content-Type': 'multipart/form-data',
//                 Authorization: `Bearer ${localStorage.getItem('token')}`
//             }
//         })
//             .then(res => {
//                 setMessage('Product updated successfully!');
//                 console.log('Response:', res.data);
//                 // Navigate after seconds
//                 setTimeout(() => {
//                     navigate('/');
//                 }, 700)
//             })
//             .catch(error => {
//                 setMessage('Error updating product');
//                 console.error('Error:', error.response ? error.response.data : error.message);
//             });
//     };

//     // for change photo
//     const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         if (event.target.files && event.target.files.length > 0) {
//             const file = event.target.files[0];
//             const reader = new FileReader();

//             reader.onloadend = () => {
//                 setimage(file);
//                 setImagePreview(reader.result as string);
//             };

//             reader.readAsDataURL(file);
//         } else {
//             setImagePreview(product?.image_url);
//         }
//     };

//     return (
//         <form onSubmit={(event) => send(event)} className='NM_FormProduct'>
//             <div className='NM_FormContainerProduct'>
//                 <div className='NM_namePrice'>
//                     <Input Name='Name'
//                         type='text'
//                         label='Name'
//                         placeholder='Enter the product name'
//                         onChange={(event) => setname(event.target.value)}
//                         className='NM_InputProduct gapFormProduct16'
//                         defaultValue={product?.name}
//                     />
//                     <Input Name='price'
//                         type='text'
//                         label='Price'
//                         placeholder='Enter the product price'
//                         onChange={(event) => setprice(event.target.value)}
//                         className='NM_InputProduct gapFormProduct16'
//                         defaultValue={product?.price}
//                     />
//                 </div>
//                 <div className='NM_File'>
//                     <Input type='file'
//                         label='Image'
//                         styleImageInput='NM_ImageInput NM_ImageInputProduct'
//                         src={upload}
//                         imagePreview={imagePreview}
//                         bigSize='NM_UploadIconBig'
//                         onChange={handleImageChange}
//                         className='NM_InputProduct gapFormProduct14'
//                         bigSizeImagePreview='bigSizeImagePreview'
//                     />
//                 </div>
//             </div>
//             {message && <p className='NM_MessageProduct'>{message}</p>}
//             <Button type='submit' styleButton='mainStyleButton NM_Save' buttonText='Save' />
//         </form>
//     )
// }