import styles from './StatusBadge.module.css'

export const StatusBadge = ({status}) => {
    const statusClasses = {
        'Pendiente de aprobación.': styles.statusPending,
        'Orden en proceso.': styles.statusProcess,
        'Orden lista.': styles.statusReady,
        'Orden cancelada.': styles.statusCancelled
    }

    return (
        <div className={styles.containerPStatus}>
            <p>Estado de la orden: </p>
            <p className={`${styles.statusBadge} ${statusClasses[status]}`}>{status}</p>
        </div>
    )
}