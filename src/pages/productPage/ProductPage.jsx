import { useParams } from "react-router-dom"
import { useProduct } from "../../hooks/useGetProduct"
import styles from "./ProductPage.module.css"
import { ButtonQuantity } from "../../components/ButtonQuantity"
import { ButtonAddProduct } from "../../components/ButtonAddProduct"
import { useCart } from "../../context/Cart/useCart"
import { ProductDetailSkeleton } from "./ProductDetailSkeleton"

export const ProductPage = () => {
    const { id } = useParams()
    const { product, loading, error } = useProduct(id)
    const { addToCart, cart } = useCart()

    const itemInCart = cart?.items?.find(
        item => item.product._id === id
    )

    const quantity = itemInCart ? itemInCart.quantity : 0

    if (error) return <p>Error</p>

    return (
        <div className={styles.containerProductPage}>
            { loading ? 
            <ProductDetailSkeleton />
            :
            <div className={styles.containerDetailProduct}>
                <div className={styles.containerImgDetail}>
                    <img src={product.img_producto} alt={product.descripcion_producto} className={styles.imgProduct}/>
                </div>
                <div className={styles.containerDetails}>
                    <p className={styles.brandProduct}>{product.marca_producto}</p>
                    <p className={styles.nameProduct}>{product.nombre_producto}</p>
                    <p className={styles.priceProduct}>${product.precio_producto}</p>
                    <div className={styles.containerAddButton}>
                        {quantity === 0 ? (
                            <ButtonAddProduct addToCart={addToCart} id={id} />
                        ) : (
                            <ButtonQuantity addToCart={addToCart} quantity={quantity} id={id} />
                        )}
                    </div>
                </div>
            </div>
            }
        </div>
  )
}