import { useUser } from '../../context/User/useUser'
import styles from './UserPage.module.css'

export const UserPage = () => {
    const { user, loading } = useUser()

    if (loading) {
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
            <p className={styles.pTitleUserPage}>Mi cuenta</p>
            <div className={styles.containerData}>
                <p>Nombre: {user.first_name} {user.last_name}</p>
                <p>Email: {user.email}</p>
                <p>Edad: {user.age}</p>
            </div>
        </div>
    )
}