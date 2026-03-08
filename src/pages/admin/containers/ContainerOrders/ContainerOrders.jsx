import { useOrders } from "../../../../hooks/useOrders";
import { Loader } from '../../../../components/Loader.jsx'
import styles from './ContainerOrders.module.css'
import { useModal } from "../../../../hooks/useModal.js";
import { ButtonsPagination } from '../../components/Pagination/ButtonsPagination'
import { ContainerModalOrder } from "../ContainerModalOrder/ContainerModalOrder.jsx";
import { StatusBadge } from "../../../../components/StatusBadge/StatusBadge.jsx";

export const ContainerOrders = () => {
    const { orders, data, loading, updateFilter, updateStatus } = useOrders()
    const { isOpen, openModal, selected, closeModal } = useModal()

    const currentOrder = orders.find(o => o._id === selected?._id) || selected

    if (loading) return <Loader />  
    
    return(
        <div className={styles.containerPageOrders}>
            {
                isOpen ?
                <ContainerModalOrder selected={currentOrder} closeModal={closeModal} updateStatus={updateStatus}/>
                :
                <>
                    <div className={styles.containerOrders}>
                        {
                            orders.map(order => (
                                <div className={styles.containerOrder} key={order._id} onClick={() => openModal(order)}>
                                    <div className={styles.orderIDDate}>
                                        <p>ID de la orden: {order._id}</p>
                                        <p>Fecha: {new Date(order.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <div className={styles.itemsStatus}>
                                        <p>Items: {order.items.length}</p>
                                        <StatusBadge status={order.status}/>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    
                    <ButtonsPagination totalPages={data.totalPages} prevPage={() => updateFilter(data.page - 1)} nextPage={() => updateFilter(data.page + 1)} page={data.page} />
                </>
            }
        </div>
    )
} 