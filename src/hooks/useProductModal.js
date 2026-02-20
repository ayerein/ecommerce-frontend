import { useState } from "react"

export const useProductModal = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [ selectedProduct, setSelectedProduct ] = useState(null)

    const openModal = (product) => {
        setSelectedProduct(product)
        setIsOpen(true)
    }

    const closeModal = () => {
        setSelectedProduct(null)
        setIsOpen(false)
    }

    return {
        isOpen,
        selectedProduct,
        openModal,
        closeModal
    }
}