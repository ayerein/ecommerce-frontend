import styles from './ContainerModalOrder.module.css'
import iconBack from '../../../../assets/iconBack.png'
import { useState } from 'react'
import { StatusBadge } from '../../../../components/StatusBadge/StatusBadge'

export const ContainerModalOrder = ({ selected, closeModal, updateStatus }) => {
    const [ selectedProduct, setSelectedProduct ] = useState(null)
    const [ isUpdating, setIsUpdating ] = useState(false)

    const handleAction = async (nextStatus) => {
        setIsUpdating(true)
        await updateStatus(selected._id, nextStatus)
        setIsUpdating(false)
    }

    return(
        <div className={styles.containerModal}>
            <div className={styles.containerCloseModal}>
                <div className={styles.close} onClick={closeModal}>
                    <img src={iconBack} alt="Volver" className={styles.imgClose}/>
                    <p>Volver a las ordenes</p>
                </div>
            </div>
            <div className={styles.order}>
                <div className={styles.dataUserOrder}>
                    <p>ID de la orden: {selected._id}</p>
                    <p>Usuario: {selected.user?.first_name} {selected.user?.last_name}</p>
                    <p>Email: {selected.user?.email}</p>
                    <p>Fecha de compra: {new Date(selected.createdAt).toLocaleDateString()}</p>
                    <StatusBadge status={selected.status}/>
                </div>
                <div className={styles.containerProductsOrder}>
                    {
                        selected.items.map(prod=>(
                            <div className={styles.containerProd} key={prod.product._id} onClick={() => setSelectedProduct(prod.product)}>
                                <img src={prod.product.img_producto} alt={prod.product.nombre_producto} className={styles.imgProd}/>
                                <p className={styles.nameProd}>{prod.product.nombre_producto}</p>
                                <p className={styles.quantityProd}>Ud: {prod.quantity}</p>
                            </div>
                        ))
                    }
                </div>
                <div className={styles.containerTotal}>
                    <p>Total de productos: {selected.items.length}</p>
                    <p>Precio Final: ${selected.total}</p>
                </div>
                <div className={styles.containerStatus}>
                    {isUpdating ? (
                    <p>Actualizando...</p> 
                    ) : (
                        <>
                            {selected.status === 'Pendiente de aprobación.' && (
                                <>
                                <button 
                                    type='button' 
                                    className={styles.buttonStatus}
                                    onClick={() => handleAction('Orden en proceso.')}
                                >
                                    Aprobar orden
                                </button>
                                <button 
                                    type='button' 
                                    className={styles.buttonStatus}
                                    onClick={() => handleAction('Orden cancelada.')}
                                >
                                    Cancelar orden
                                </button>
                                </>
                            )}

                            {selected.status === 'Orden en proceso.' && (
                                <>
                                <button 
                                    type='button' 
                                    className={styles.buttonStatus}
                                    onClick={() => handleAction('Orden lista.')}
                                >
                                    Orden completa
                                </button>
                                <button 
                                    type='button' 
                                    className={styles.buttonStatus}
                                    onClick={() => handleAction('Orden cancelada.')}
                                >
                                    Cancelar orden
                                </button>
                                </>
                            )}

                            {selected.status === 'Orden lista.' && (
                                <p className={styles.finalizedText}>✅ Esta orden ya está lista para entrega.</p>
                            )}
                        </>
                    )}  
                </div>
            </div>

            {selectedProduct && (
                <div className={styles.overlayModalDetail} onClick={() => setSelectedProduct(null)}>
                    <div className={styles.containerModalDetail}>
                        <p className={styles.titleProduct}>Detalles del producto</p>
                        <img src={selectedProduct.img_producto} alt={selectedProduct.nombre_producto} className={styles.imgProdModal}/>
                        <p className={styles.nameProd}>{selectedProduct.nombre_producto}</p>
                        <p className={styles.barCodeProd}>Código: {selectedProduct.codigo_barras}</p>
                        <p className={styles.stockProd}>Stock: {selectedProduct.stock_producto}</p>
                    </div>
                </div>
            )}
        </div>
    )
}