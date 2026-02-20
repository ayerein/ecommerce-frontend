import { Loader } from "../../../../components/Loader"
import { useProducts } from "../../../../context/Product/useProducts"
import { ProductCard } from "../../components/ProductCard/ProductCard"
import imgResults  from "../../../../assets/imgResults.png"
import styles from "./ContainerProducts.module.css"

export const ContainerProducts = () => {
    const { products, loading } = useProducts()

    if (loading && products.length === 0) {
        return <Loader />;
    }

    if (!Array.isArray(products)) {
    return <p>Error cargando productos</p>
    }

    return(
        <>
        <div className={styles.containerProducts}>
            { products.length === 0 ? (
                <div className={styles.containerNoResults}>
                    <img src={imgResults} alt="No hay resultados" className={styles.imgNoResults}/>
                    <p className={styles.titleNoResults}>Lo sentimos, no encontramos lo que buscas</p>
                    <p>Podés intentar con otra palabra en nuestro buscador</p>
                </div>
            )
            : (
                products.map(product => (
                    <ProductCard 
                    key={product._id}
                    id={product._id}
                    nombre={product.nombre_producto}
                    precio={product.precio_producto}
                    stock={product.stock_producto}
                    img={product.img_producto}
                    descripcion={product.descripcion_producto}
                    />
                ))
            )}
        </div>
        {loading && products.length > 0 && (
            <Loader />
        )}
        </>
    )
}