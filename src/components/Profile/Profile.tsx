import './Profile.css'

interface Profile {
    src: string;
    userName: string;
}
export default function Profile({ src, userName }: Profile) {
    return (
        <div className='NM_Profile'>
            <div className='NM_ImageProfile'>
                <img src={src} alt="profile image" />
            </div>
            <h1 className='NM_UserName'>{userName}</h1>
        </div>
    )
}
