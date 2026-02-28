import styles from './NavBar.module.css'
import iconCart from "../../assets/iconCart.png"
import iconAuth from "../../assets/iconAuth.png"

import { Link } from "react-router-dom"

import { Search } from '../../components/Search'
import { useCart } from "../../context/Cart/useCart"
import { useUser } from "../../context/User/useUser"
import { UserMenu } from './components/UserMenu'

export const NavBar = () => {
    const { totalUnits } = useCart()
    const { user } = useUser()

    return(
        <div className={styles.containerSearchBar}>
            <Link to={`/`} className={styles.containerLinkProduct}>
                <p className={styles.pInicio}>Shop</p>
            </Link>

            <Search/>

            <div className={styles.containerMenu}>
                {
                    user ?
                    <UserMenu />
                    :
                    <Link to={`/auth`} className={styles.containerAuth}>
                        <img src={iconAuth} alt="Ingresar" className={styles.imgAuth}/>
                        <p className={styles.pAuth}>Ingresar</p>
                    </Link>
                }

                <Link to={`/cart`} className={styles.containerCart}>
                    <p className={styles.pTotalUnits}>{totalUnits}</p>
                    <img src={iconCart} alt="Carrito" className={styles.imgCart}/>
                    <p className={styles.pCart}>Carrito</p>
                </Link>
            </div>
        </div>
    )
}