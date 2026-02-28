import { useProducts } from "../../../../context/Product/useProducts"
import { AdminCardSkeleton } from "../../components/AdminCardSkeleton"
import { ProductCard } from "../../components/ProductCard"
import styles from "./ContainerProducts.module.css"

export const ContainerProducts = ({ openModal }) => {
    const { products, loading } = useProducts()

    if (!loading && !Array.isArray(products)) {
        return <p>Error cargando productos</p>
    }

    return(
        <div className={styles.containerProducts}>
        {
            loading ? 
            Array.from({ length: 16 }).map((_, i) => (
                <AdminCardSkeleton key={i} />
            ))
            :
            
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
            
        }
        </div>
    )
}