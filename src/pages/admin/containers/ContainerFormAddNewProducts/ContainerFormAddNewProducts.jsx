import { useState } from "react"
import { FormProducts } from "../../components/FormProducts"
import styles from "./ContainerFormAddNewProducts.module.css"
import { useProducts } from "../../../../context/Product/useProducts"

export const ContainerFormAddNewProducts = () => {
    const { addProduct } = useProducts()
    
    const [ formData, setFormData ] = useState({
        nombre_producto: "",
        marca_producto: "",
        descripcion_producto: "",
        precio_producto: "",
        img_producto: "",
        nombre_categoria: "",
        stock_producto: ""
    })
    const [ form, setForm ] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target

        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch("/api/products", {
                method: "POST",
                headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify({
                ...formData,
                precio_producto: Number(formData.precio_producto),
                stock_producto: Number(formData.stock_producto)
            })
        })

        if (!response.ok) {
            throw new Error("Error al crear el producto")
        }

        const newProduct = await response.json()

        addProduct(newProduct)

        setFormData({
            nombre_producto: "",
            marca_producto: "",
            descripcion_producto: "",
            precio_producto: "",
            img_producto: "",
            nombre_categoria: "",
            stock_producto: 0
        })
        } catch (error) {
            console.error(error)
            alert("Hubo un error")
        }
    }

    return(
        <div className={form ? styles.containerForm : styles.containerButtonModal}>
            {
                form ? 
                <FormProducts formData={formData} onChange={handleChange} onSubmit={handleSubmit} closeForm={()=>setForm(false)}/>
                :
                <button onClick={()=>setForm(true)} className={styles.buttonAddProduct}>Crear nuevo producto</button>
            }
        </div>
    )
}