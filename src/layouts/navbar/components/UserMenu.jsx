import { Link } from "react-router-dom"
import styles from './UserMenu.module.css'
import iconAuth from "../../../assets/iconAuth.png"

import { useUser } from "../../../context/User/useUser"
import { useState } from "react"

export const UserMenu = () => {
    const { logout } = useUser()
    const [isOpen, setIsOpen] = useState(false)

    return(
        <div className={styles.containerUserMenu}>
            <div className={styles.containerUser} onClick={() => setIsOpen(true)}>
                <img src={iconAuth} alt="Ingresar" className={styles.imgAuth}/>
                <p className={styles.pAuth}>Mi cuenta</p>
            </div>
            {
                isOpen &&
                <>
                    <div className={styles.overlay} onClick={() => setIsOpen(false)} />
                    <div className={styles.modalUserMenu}>
                        <Link to={`/user`} className={styles.linkUser}>Mi cuenta</Link>
                        <button onClick={logout} className={styles.logoutBtn}>
                            Cerrar Sesión
                        </button>
                    </div>
                </>
            }
        </div>
    )
}