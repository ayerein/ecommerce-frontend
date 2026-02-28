import styles from './ContainerForm.module.css'

export const ContainerForm = ({ isLogin, formData, handleSubmit, handleChange, error }) => {
    return(
        <form onSubmit={handleSubmit} className={styles.formAuth}>
            {!isLogin && (
            <>
                <label htmlFor="firstName">Nombre</label>
                <input type="text" id='firstName' name="first_name" placeholder="Nombre" value={formData.first_name} onChange={handleChange} required />
                <label htmlFor="lastName">Apellido</label>
                <input type="text" id='lastName' name="last_name" placeholder="Apellido" value={formData.last_name} onChange={handleChange} required />
                <label htmlFor="age">Edad</label>
                <input type="number" id='age' name="age" placeholder="Edad" value={formData.age} onChange={handleChange} required />
            </>
            )}
            
            <label htmlFor="email">Correo Electrónico</label>
            <input type="email" name="email" id="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
            <label htmlFor="password">Contraseña</label>
            <input type="password" name="password" id="password" placeholder="Contraseña" value={formData.password} onChange={handleChange} required />
            {error && <p>{error}</p>}
            <button type="submit" className={styles.btnAuth}>
                {isLogin ? "Ingresar" : "Crear cuenta"}
            </button>

        </form>
    )
}