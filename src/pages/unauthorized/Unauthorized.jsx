import { useNavigate } from 'react-router-dom'
import styles from './Unauthorized.module.css'
import iconUnauthorized  from "../../assets/iconUnauthorized.png"

export const Unauthorized = () => {
    const navigate = useNavigate()
    return(
        <div className={styles.containerUnauthorized}>
            <img src={iconUnauthorized} className={styles.imgUnauthorized} alt="Acceso Denegado" />
            <p className={styles.titleUnauthorized}>Acceso Denegado</p>
            <p className={styles.pUnauthorized}>No tienes permisos para ver esta sección.</p>
            <button className={styles.btnUnauthorized} onClick={() => navigate('/')}>Volver a la tienda</button>
        </div>
    )
}