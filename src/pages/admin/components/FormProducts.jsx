import styles from "./FormProducts.module.css"

export const FormProducts = ({ onSubmit, formData, onChange, handleDelete, closeForm }) => {
    return(
        <div className={styles.containerForm}>

            <form className={styles.productForm} onSubmit={onSubmit}>

                <div className={styles.containerCloseButton}>
                    <button onClick={closeForm} className={styles.closeButton}>X</button>
                </div>
                
                {
                    formData.img_producto === "" ?
                    <p className={styles.titleNewProduct}>Crear nuevo producto</p>
                    :
                    <div className={styles.containerImgEdit}>
                        <img src={formData.img_producto} alt={formData.nombre_producto} className={styles.imgEdit}/>
                        <p className={styles.barCode}>{formData.codigo_barras}</p>
                    </div>
                }

                <div className={styles.containerInputs}>
                    <input
                        type="text"
                        name="nombre_producto"
                        placeholder="Nombre del producto"
                        value={formData.nombre_producto}
                        onChange={onChange}
                        required
                        className={styles.inputForm}
                    />

                    <input
                        type="text"
                        name="marca_producto"
                        placeholder="Marca"
                        value={formData.marca_producto}
                        onChange={onChange}
                        required
                        className={styles.inputForm}
                    />

                    <textarea
                        name="descripcion_producto"
                        placeholder="Descripción"
                        value={formData.descripcion_producto}
                        onChange={onChange}
                        className={`${styles.inputForm} ${styles.textForm}`}
                        
                    />

                    <input
                        type="number"
                        name="precio_producto"
                        placeholder="Precio"
                        min="0"
                        value={formData.precio_producto}
                        onChange={onChange}
                        required
                        className={styles.inputForm}
                    />

                    <input
                        type="text"
                        name="img_producto"
                        placeholder="URL de imagen"
                        value={formData.img_producto}
                        onChange={onChange}
                        required
                        className={styles.inputForm}
                    />

                    <input
                        type="text"
                        name="nombre_categoria"
                        placeholder="Categoría"
                        value={formData.nombre_categoria}
                        onChange={onChange}
                        required
                        className={styles.inputForm}
                    />

                    <input
                        type="number"
                        name="stock_producto"
                        placeholder="Stock"
                        min="0"
                        value={formData.stock_producto}
                        onChange={onChange}
                        className={styles.inputForm}
                    />
                </div>
                
                <div className={styles.containerButtonSubmit}>
                    <button type="submit" className={styles.buttonSubmit}>Guardar</button>
                </div>
                <div className={styles.containerButtondelete}>
                    <button type="button" className={styles.buttonDelete} onClick={() => handleDelete(formData._id)}>Eliminar Producto</button>
                </div>
            </form>
        </div>
    )
}