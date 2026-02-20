import iconCart from "../../../assets/iconCart.png"
import { Link } from "react-router-dom";
import styles from './EmptyCart.module.css'

export const EmptyCart = () => {
    return(
        <div className={styles.containerEmptyCart}>
            <div className={styles.containerImgCart}>
                <img src={iconCart} alt="Carrito vacio" />
            </div>
            <p className={styles.titleEmptyCart}>No tenés productos en el carrito</p>
            <p className={styles.pEmptyCart}>Empezá a comprar y aprovechá nuestras ofertas.</p>
            <Link to={`/`} className={styles.linkEmptyCart}>Ir a comprar</Link>
        </div>
    )
}