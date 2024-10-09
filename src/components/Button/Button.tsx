import './Button.css'

interface StyleButton {
    buttonText: string;
    styleButton: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    type: 'submit' | 'button';
}
export default function Button({ buttonText, styleButton, onClick, type }: StyleButton) {
    return (
        <button type={type} onClick={onClick} className={`mainStyleButton ${styleButton}`}>{buttonText}</button>
    )
}
