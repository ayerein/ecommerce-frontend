import styles from './AdminCardSkeleton.module.css';

export const AdminCardSkeleton = () => {
  return (
    <div className={styles.cardSkeleton}>
      <div className={`${styles.imagePlaceholder} ${styles.skeleton}`}></div>
      <div className={styles.contentPlaceholder}>
        <div className={`${styles.titleSkeleton} ${styles.skeleton}`}></div>
        <div className={`${styles.stockSkeleton} ${styles.skeleton}`}></div>
      </div>
      <div className={`${styles.buttonSkeleton} ${styles.skeleton}`}></div>
    </div>
  );
};