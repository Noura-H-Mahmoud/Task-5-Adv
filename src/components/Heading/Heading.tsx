import './Heading.css'

export default function Heading({ heading }: { heading: string }) {
    return (
        <h1 className='NM_Heading'>{heading}</h1>
    )
}
