import { useProducts } from '../../../context/Product/useProducts'
import styles from './ButtonsPagination.module.css'

export const ButtonsPagination = () => {
    const { totalPages, updateFilter, filters } = useProducts()
    const page = filters.page

    return(
        <div className={styles.containerPagination}>
            {
            page != totalPages ?
            <button type="button" className={styles.buttonLoadMore} onClick={() => updateFilter("page", page + 1)} disabled={page === totalPages}>
                Ver más
            </button>
            :
            <></>
            }
        </div>
    )
}