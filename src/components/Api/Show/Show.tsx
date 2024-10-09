import { useEffect, useState } from 'react';
import './Show.css'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ArrowPre from '../../ArrowPre/ArrowPre';
import ItemDetail from '../../ItemDetail/ItemDetail';
import Heading from '../../Heading/Heading';

interface Product {
    id: number;
    name: string;
    price: string;
    image_url: string;
    created_at: string;
    updated_at: string;
}

export default function Show() {
    const [product, setProduct] = useState<Product | null>(null);
    const params = useParams();
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        axios.get(`https://test1.focal-x.com/api/items/${params.id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => {
                setProduct(res.data);
                setError(null)
            })
            .catch(error => {
                console.error("Error fetching product: ", error);
                setError("Error fetching product details.");
            });
    }, [params.id])

    // In order to change history
    const formatData = (dataString: string) => {
        const date = new Date(dataString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth()).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`
    }
    return (
        <div className='NM_Show'>
            <ArrowPre link='/Task-5-Adv/' />
            {error ?
                (<p className='NM_Error'>{error}</p>) :
                product ? (
                    <div className='NM_ProductDetail'>
                        <Heading heading={product.name} />
                        <img src={product.image_url} alt={product.name} />
                        <div>
                            <div className='NM_PriceAdd'>
                                <ItemDetail p={product.price} h2='Price:' />
                                <ItemDetail p={formatData(product.created_at)} h2='Added At:' />
                            </div>
                            <div className='NM_Updated'>
                                <ItemDetail p={formatData(product.updated_at)} h2='Updated At:' />
                            </div>
                        </div>
                    </div>
                ) : (<p className='NM_Loading'>Loading...</p>
                )}
        </div>
    )
}
