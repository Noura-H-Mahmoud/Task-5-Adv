import './Popup.css'

interface PopupProps {
    message: string;
    children: React.ReactNode;
}
export default function Popup({ message, children }: PopupProps) {
    return (
        <div className='NM_popup'>
            <p className='NM_MessageDelete'>{message}</p>
            <div className='NM_Children'>
                {children}
            </div>
        </div>
    )
}
