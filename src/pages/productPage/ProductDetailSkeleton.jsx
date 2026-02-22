import styles from './ProductDetailSkeleton.module.css';

export const ProductDetailSkeleton = () => {
  return (
    <div className={styles.containerProductPage}>
      <div className={styles.containerDetailProduct}>

        <div className={`${styles.containerImgDetail} ${styles.skeleton}`}></div>
        
        <div className={styles.containerDetails}>

          <div className={`${styles.brandSkeleton} ${styles.skeleton}`}></div>

          <div className={`${styles.nameSkeleton} ${styles.skeleton}`}></div>

          <div className={`${styles.priceSkeleton} ${styles.skeleton}`}></div>
          
          <div className={styles.containerAddButton}>
            <div className={`${styles.buttonSkeleton} ${styles.skeleton}`}></div>
          </div>
        </div>
      </div>
    </div>
  );
};