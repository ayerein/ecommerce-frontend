
import styles from './ButtonsPagination.module.css'

export const ButtonsPagination = ({ totalPages, prevPage, nextPage, page }) => {

    return(
        <div className={styles.containerButtons}>
            <button 
                disabled={page === 1} 
                onClick={prevPage}
            >
                &lt;
            </button>

            <p>{page}</p>

            <button 
                disabled={page === totalPages} 
                onClick={nextPage}
            >
                &gt;
            </button>
        </div>
    )
}