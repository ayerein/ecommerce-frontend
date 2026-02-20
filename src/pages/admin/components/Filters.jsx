import { useProducts } from '../../../context/Product/useProducts'
import styles from './Filters.module.css'

export const Filters = () => {
    const { updateFilter } = useProducts()
    
    return(
        <div className={styles.containerFilters}>
            <p className={styles.pFilterMobile}>Filtros</p>
 
            <label className={styles.btnAvailable}>
                <input
                    type="checkbox"
                    onChange={(e) => updateFilter("inStock", e.target.checked)}
                />
                Solo disponibles
            </label>
        </div>
    )
}