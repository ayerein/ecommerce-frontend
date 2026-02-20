import { Link } from 'react-router-dom'
import { useLocation } from "react-router-dom"
import imgCheck  from "../../assets/imgCheck.png"
import styles from './OrderSuccess.module.css'

export const OrderSuccess = () => {
    const { state } = useLocation()
    
    if (!state) {
        return <p>No hay una orden creada.</p>;
    }

    return(
        <div className={styles.containerOrderSuccess}>
            <div className={styles.containerTitleOrder}>
                <img src={imgCheck} alt="Orden creada" className={styles.imgCheck} />
                <p className={styles.pTitleOrder}>Tu orden fue creada con exito!</p>
            </div>
            
            <div className={styles.containerOrderDetails}>
                <p className={styles.titleDetails}>Detalles del pedido</p>
                <p>Id de pedido: {state._id}</p>
                <p>Total: ${state.total}</p>
                <p>Productos: {state.items.length}</p>
            </div>

            <Link to="/shop" className={styles.buttonBack}>
                Volver a la tienda
            </Link>
        </div>
    )
}