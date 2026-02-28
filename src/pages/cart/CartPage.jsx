import { useEffect } from "react"
import styles from "./CartPage.module.css"
import { ContainerProductsCard } from "./containers/ContainerProductsCard/ContainerProductsCard"
import { useProducts } from "../../context/Product/useProducts"

export const CartPage = () => {
    const { updateFilter } = useProducts()

    useEffect(() => {
        updateFilter("search", "")
    }, [updateFilter])

    return(
        <div className={styles.containerCartPage}>
            <ContainerProductsCard />
        </div>
    )
}
