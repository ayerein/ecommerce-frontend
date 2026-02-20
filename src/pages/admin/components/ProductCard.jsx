import styles from "./ProductCard.module.css"

export const ProductCard = ({ nombre, img_producto, descripcion_producto, stock_producto, openModal }) => {
    return(
        <div onClick={openModal} className={styles.containerProductCard}>
            <div className={styles.containerImgProduct}>
                <img src={img_producto} alt={descripcion_producto} className={styles.imgProduct} />
            </div>
            <div className={styles.containerDetails}>
                <p className={styles.nameProduct}>{nombre}</p>
                <div className={styles.containerStock}>
                    <p className={styles.stockProduct}>{stock_producto}</p>
                </div>
            </div>
        </div>
    )
}