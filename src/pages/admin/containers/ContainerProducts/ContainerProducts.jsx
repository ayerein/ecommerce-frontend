import { Loader } from "../../../../components/Loader"
import { useProducts } from "../../../../context/Product/useProducts"
import { ProductCard } from "../../components/ProductCard"
import styles from "./ContainerProducts.module.css"

export const ContainerProducts = ({ openModal }) => {
    const { products, loading } = useProducts()
    
    if (!Array.isArray(products)) {
    return <p>Error cargando productos</p>
    }

    if (loading) {
        return <Loader />;
    }
    return(
        <div className={styles.containerProducts}>
            { products.length === 0 ? (
                <p>No hay productos</p>
            )
            : (
                products.map(product => (
                    <ProductCard 
                    key={product._id}
                    nombre={product.nombre_producto}
                    img_producto={product.img_producto}
                    descripcion_producto={product.descripcion_producto}
                    stock_producto={product.stock_producto}
                    openModal={()=>openModal(product)}
                    />
                ))
            )}
        </div>
    )
}