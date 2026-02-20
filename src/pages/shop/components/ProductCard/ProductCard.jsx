import styles from "./ProductCard.module.css"
import { Link } from "react-router-dom"
import { ButtonQuantity } from "../../../../components/ButtonQuantity.jsx"
import { ButtonAddProduct } from "../../../../components/ButtonAddProduct.jsx"
import { useCart } from "../../../../context/Cart/useCart.js"

export const ProductCard = ({ id, nombre, precio, stock, img, descripcion }) => {
    const { cart } = useCart()

    const itemInCart = cart?.items?.find(
        item => item.product._id === id
    )

    const quantity = itemInCart ? itemInCart.quantity : 0

    return(
        <div className={styles.containerCardProduct}>
            <Link to={`/product/${id}`} className={styles.containerLinkProduct}>
                <div className={styles.containerImgProduct}>
                    <img src={img} alt={descripcion} className={styles.imgProduct} />
                </div>
                <div className={styles.containerDataProduct}>
                    <p className={styles.nameProduct}>{nombre}</p>
                    <p className={styles.priceProduct}>$ {precio}</p>
                </div>
            </Link>
            <div className={styles.containerAddButton}>
                {quantity === 0 ? (
                    <ButtonAddProduct id={id} />
                    ) : (
                    <ButtonQuantity quantity={quantity} stock={stock} id={id} />
                )}                
            </div>
        </div>
    )
}