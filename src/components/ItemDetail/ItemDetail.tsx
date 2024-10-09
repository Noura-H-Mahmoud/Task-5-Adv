import './ItemDetail.css'

interface dataProps {
    h2: string;
    p: string;
}
export default function ItemDetail({ h2, p }: dataProps) {
    return (
        <div className='NM_ItemDetail'>
            <h2>{h2}</h2>
            <p>{p}</p>
        </div>
    )
}
