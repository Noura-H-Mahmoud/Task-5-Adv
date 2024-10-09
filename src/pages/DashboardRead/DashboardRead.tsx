import SideBar from '../../components/SideBar/SideBar'
import './DashboardRead.css'
import logo from '../../assets/images/Logo.svg'
import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react';

export default function DashboardRead() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/signIn')
    }
  }, [])

  return (
    <div className='NM_Dashboard'>
      <SideBar logo={logo} />
      <div className='NM_Container'>
        <div className='NM_MaxWidth'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
