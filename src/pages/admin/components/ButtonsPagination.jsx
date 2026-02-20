
import { useProducts } from '../../../context/Product/useProducts'
import styles from './ButtonsPagination.module.css'

export const ButtonsPagination = () => {
    const { totalPages, updateFilter, filters } = useProducts()
    const page = filters.page

    return(
        <div className={styles.containerButtons}>
            <button 
                disabled={page === 1} 
                onClick={() => updateFilter("page", page - 1)}
            >
                &lt;
            </button>

            <p>{page}</p>

            <button 
                disabled={page === totalPages} 
                onClick={() => updateFilter("page", page + 1)}
            >
                &gt;
            </button>
        </div>
    )
}