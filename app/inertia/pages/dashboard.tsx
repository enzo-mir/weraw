'use client'
import { logout } from '../services/logout.auth'

const Dashboard = () => {
  return (
    <>
      <div>pages</div>
      <button onClick={logout}>Déconnexion</button>
    </>
  )
}

export default Dashboard
