import { useCart } from "../context/Cart/useCart"
import styles from "./ButtonAddProduct.module.css"

export const ButtonAddProduct = ({ id }) => {
    const { addToCart } = useCart()

    return(
        <button className={styles.buttonAddProduct} onClick={(e)=> {
            e.preventDefault()
            e.stopPropagation()
            addToCart(id, 1)
        }}>Agregar</button>
    )
}