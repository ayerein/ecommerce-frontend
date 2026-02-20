import { ButtonQuantity } from "../../../components/ButtonQuantity"
import styles from "./ProductCard.module.css"
import iconTrash from '../../../assets/iconTrash.png'
import { useCart } from "../../../context/Cart/useCart"

export const ProductCard = ({ quantity, id, nombre, precio, stock, img }) => {
    const { deleteProduct,  } = useCart()

    return(
        <div  className={styles.productCard}>
            <div className={styles.containerImg}>
                <img src={img} className={styles.imgProductCard}/>
            </div>

            <div className={styles.containerName}>
                <p className={styles.nameProductCard}>{nombre}</p>
            </div>

            <div className={styles.containerPrice}>
                <p className={styles.priceProductCard}>${precio}</p>
            </div>
            
            <div className={styles.containerButtonQuantity}>
                <div className={styles.containerHeightButton}>
                    <ButtonQuantity quantity={quantity} stock={stock} id={id}/>
                </div>
            </div>
            
            <div className={styles.totalProductPrice}>
                <p className={styles.pTotalProductPrice}>${precio * quantity}</p>
            </div>
            
            <div className={styles.containerButtonDelete}>
                <button className={styles.buttonDeleteProduct} onClick={()=>deleteProduct(id)}>
                    <img src={iconTrash} alt="Eliminar" className={styles.imgDelete}/>
                </button>
            </div>
        </div>
    )
}