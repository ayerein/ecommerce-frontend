import { useState } from 'react'
import { useUser } from '../../context/User/useUser'
import { ContainerUserData } from './ContainerUserData/ContainerUserData'
import { ContainerUserOrders } from './ContainerUserOrders/ContainerUserOrders'
import styles from './UserPage.module.css'

export const UserPage = () => {
    const [ section, setSection ] = useState('UserData')
    const { user, loading: loadingUser } = useUser()
    

    if (loadingUser) {
        return <div className={styles.loader}>Cargando perfil...</div>
    }

    if (!user) {
        return (
            <div className={styles.errorContainerUser}>
                <h2>No has iniciado sesión</h2>
                <p>Por favor, ingresa a tu cuenta para ver tu perfil.</p>
            </div>
        )
    }
    
    return(
        <div className={styles.containerUserPage}>
            <div className={styles.containerOptions}>
                <p className={styles.pTitleName}>¡Hola {user.first_name}!</p>
                <button onClick={()=>setSection('UserData')} className={`${styles.buttonOptions} ${section === 'UserData' ? styles.activeButton : ''}`}>Mis datos</button>
                <button onClick={()=>setSection('UserOrders')} className={`${styles.buttonOptions} ${section === 'UserOrders' ? styles.activeButton : ''}`}>Mis pedidos</button>
                <button className={styles.buttonOptions}>Cerrar Sesión</button>
            </div>
            <div className={styles.containerData}>
                {
                    section === 'UserData' && <ContainerUserData />
                }
                {
                    section === 'UserOrders' && <ContainerUserOrders />
                }
            </div>
        </div>
    )
}

/* Funcionalidad de cerrar sesion, modificcar datos., eliminar cuenta. */