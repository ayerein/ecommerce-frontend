import { useOrders } from "../../../../hooks/useOrders";
import { Loader } from '../../../../components/Loader.jsx'
import styles from './ContainerOrders.module.css'

export const ContainerOrders = () => {
    const { orders, loading } = useOrders()

    if (loading) return <Loader />
    return(
        <div className={styles.ContainerOrders}>
            {
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
    )
} 