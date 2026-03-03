import { useUser } from '../../context/User/useUser'
import { useOrders } from '../../hooks/useOrders'
import styles from './UserPage.module.css'

export const UserPage = () => {
    const { user, loading: loadingUser } = useUser()
    const { orders} = useOrders()

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
            <p className={styles.pTitleUserPage}>Mi cuenta</p>
            <div className={styles.containerData}>
                <p>Nombre: {user.first_name} {user.last_name}</p>
                <p>Email: {user.email}</p>
                <p>Edad: {user.age}</p>
            </div>
            <div className={styles.containerOrders}>
                <p>Mis ordenes</p>
                {
                    !orders ? 
                    <p>Aún no tienes ordenes</p>
                    :
                    orders.map(order => (
                        <div className={styles.containerOrder} key={order._id}>
                            <p>ID de la orden: {order._id}</p>
                            <p>Fecha: {new Date(order.createdAt).toLocaleDateString()}</p>
                            <p>Items: {order.items.length}</p>
                            <p>Estado: {order.status}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}