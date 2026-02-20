import { ContainerProducts } from "./containers/ContainerProducts/ContainerProducts"
import { Filters } from "../../components/Filters"
import { SortSelect } from "../../components/SortSelect"
import styles from './ShopPage.module.css'
import { ButtonsPagination } from "./components/ButtonsPagination"

export const ShopPage = () => {

    return(
        <div className={styles.containerShopPage}>
            <aside className={styles.containerFiltersCategories}>
                <Filters />
            </aside>
            <SortSelect enabledFilters={{
                name_asc: true,
                name_desc: true,
                price_asc: true,
                price_desc: true,
                stock_desc: false,
                stock_asc: false
            }}/>
            <main className={styles.containerShopProducts}>
                <ContainerProducts />
                <ButtonsPagination />
            </main>
        </div>
    )
}

