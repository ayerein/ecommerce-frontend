import { useState } from "react"
import { FormProducts } from "../../components/FormProducts"
import styles from "./ContainerEditProduct.module.css"
import { useProducts } from "../../../../context/Product/useProducts"

export const ContainerEditProduct = ({ closeModal, selectedProduct }) =>  {
    const { updateProduct } = useProducts()
    const [ formData, setFormData ] = useState(selectedProduct)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const baseUrl = import.meta.env.VITE_API_URL || "";
            const res = await fetch(`${baseUrl}/api/products/${selectedProduct._id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ...formData,
                precio_producto: Number(formData.precio_producto),
                stock_producto: Number(formData.stock_producto)
            })
            })

            const updated = await res.json()

            updateProduct(updated)
            closeModal()
        } catch (error) {
            console.error("Error:", error);
        }
    }

    return(
        <div className={styles.containerModal}>
            <FormProducts 
                formData={formData}
                onChange={handleChange}
                onSubmit={handleSubmit}
                closeForm={closeModal}
            />
        </div>
    )
}