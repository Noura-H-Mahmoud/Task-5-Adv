import './Input.css'

interface Data {
    Name?: string;
    type: 'text' | 'email' | 'password' | 'file' | 'number';
    label?: string;
    placeholder?: string;
    src?: string;
    styleImageInput?: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    defaultValue?: string;
    imagePreview?: string;
    className?: string;
    bigSize?: string;
    bigSizeImagePreview?: string;
}
export default function Input({ Name, type, label, placeholder, styleImageInput, src, onChange, imagePreview, className, bigSize, defaultValue, bigSizeImagePreview }: Data) {
    return (
        <div className={`NM_Input ${className}`}>
            {label && <label htmlFor={Name}>{label}</label>}
            {type === 'file' ? (
                <div className={styleImageInput}>
                    <input
                        id={Name}
                        type={type}
                        name={Name}
                        accept="image/*"
                        style={{
                            width: '100%',
                            height: '100%',
                            opacity: 0,
                            position: 'absolute',
                            cursor: 'pointer'
                        }}
                        onChange={onChange}
                        defaultValue={defaultValue}
                    />
                    {imagePreview ? (
                        <img src={imagePreview} alt="Uploaded" className={`NM_Uploaded ${bigSizeImagePreview}`}/>
                    ) : (
                        <img src={src} alt="Upload Icon" className={`NM_UploadIcon ${bigSize}`} />
                    )}
                </div>
            ) : (
                <input
                    id={Name}
                    type={type}
                    name={Name}
                    placeholder={placeholder}
                    onChange={onChange}
                    defaultValue={defaultValue}
                />
            )
            }
        </div >
    )
}
