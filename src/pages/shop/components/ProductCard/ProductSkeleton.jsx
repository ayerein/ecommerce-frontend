import styles from './ProductCard.module.css';

export const ProductSkeleton = () => {
    return (
        <div className={styles.skeletonContainer}>
            <div className={styles.containerLinkProduct}>
                <div className={styles.containerImgProduct}>
                    <div className={styles.skeletonImg}></div>
                </div>

                <div className={styles.containerDataProduct}>
                    <div className={styles.skeletonName}></div>
                    <div className={styles.skeletonPrice}></div>
                </div>
            </div>

            <div className={styles.containerAddButton}>
                <div className={styles.skeletonButton}></div>
            </div>
        </div>
    )
}