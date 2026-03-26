import styles from './ContainerUserOrders.module.css'
import { StatusBadge } from '../../../components/StatusBadge/StatusBadge'
import { useOrders } from '../../../hooks/useOrders'

export const ContainerUserOrders = () => {
    const { orders} = useOrders()
    return(
        <div className={styles.containerUserOrders}>
            <p className={styles.titleUserOrders}>Mis ordenes</p>
            {
                !orders ? 
                <p>Aún no tienes ordenes</p>
                :
                orders.map(order => (
                    <div className={styles.containerOrder} key={order._id}>
                        <div className={styles.containerDataOrder}>
                            <div className={styles.containerData}>
                                <p>Fecha: {new Date(order.createdAt).toLocaleDateString()}</p>
                                <p>Items: {order.items.length}</p>
                                <p>Total: ${order.total}</p>
                            </div>
                            <div className={styles.containerIDStatus}>
                                <p>ID de la orden: {order._id}</p>
                                <StatusBadge status={order.status}/>
                            </div>
                        </div>
                        <div className={styles.containerProductsOrder}>
                            {order.items.map(item => (
                                <div key={item._id} className={styles.productItemMini}>
                                    <img src={item.product.img_producto} alt={item.product.nombre_producto} className={styles.imgItemMini}/>
                                    <div className={styles.containerDataItemMini}>
                                        <p>{item.product.nombre_producto}</p>
                                        <p>x{item.quantity}: ${item.quantity * item.product.precio_producto}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            }
        </div>
    )
}