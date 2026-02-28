import { Loader } from "../../../../components/Loader"
import { useProducts } from "../../../../context/Product/useProducts"
import { ProductCard } from "../../components/ProductCard/ProductCard"
import imgResults  from "../../../../assets/imgResults.png"
import styles from "./ContainerProducts.module.css"
import { ProductSkeleton } from "../../components/ProductCard/ProductSkeleton"

export const ContainerProducts = () => {
    const { products, loading } = useProducts()

    if (!Array.isArray(products)) {
        return <p>Error cargando productos</p>
    }

    const isInitialLoading = loading && products.length === 0

    return(
        <>
        <div className={styles.containerProducts}>
            { isInitialLoading ? (
                Array.from({ length: 8 }).map((_, index) => (
                    <ProductSkeleton key={index} />
                ))
            ) : products.length === 0 ? (
                <div className={styles.containerNoResults}>
                    <img src={imgResults} alt="No hay resultados" className={styles.imgNoResults}/>
                    <p className={styles.titleNoResults}>Lo sentimos, no encontramos lo que buscas</p>
                    <p>Podés intentar con otra palabra en nuestro buscador</p>
                </div>
            )
            : (
                <>
                {products.map(product => (
                    <ProductCard 
                    key={product._id}
                    id={product._id}
                    nombre={product.nombre_producto}
                    precio={product.precio_producto}
                    stock={product.stock_producto}
                    img={product.img_producto}
                    descripcion={product.descripcion_producto}
                    />
                ))}

                {loading && products.length > 0 && (
                    Array.from({ length: 8 }).map((_, index) => (
                        <ProductSkeleton key={index} />
                    ))
                )}
                </>
            )}
        </div>
        </>
    )
}