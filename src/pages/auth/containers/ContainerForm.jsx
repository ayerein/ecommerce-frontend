import styles from './ContainerForm.module.css'
import { LoaderAuth } from '../components/LoaderAuth.jsx'

export const ContainerForm = ({ loading, mode, setMode, formData, handleSubmit, handleChange, error }) => {
    if (mode === 'forgot') {
        return (
            <form onSubmit={handleSubmit} className={styles.formAuth}>
                <label>Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                {error && <p className={styles.errorMessage}>{error}</p>}
                <button type="submit" className={styles.btnAuth} disabled={loading}>
                    {loading ? <LoaderAuth /> : "Enviar link"}
                </button>
            </form>
        )
    }

    return(
        <form onSubmit={handleSubmit} className={styles.formAuth}>
            {mode === "register" && (
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
            {
                mode === 'login' &&
                <button onClick={() => setMode('forgot')} className={styles.buttonForgot}>Olvidé mi contraseña</button>
            }
            <button type="submit" className={styles.btnAuth}>
                {
                    loading ? 
                    <LoaderAuth />
                    :
                    mode === 'login' ? "Ingresar" : "Crear cuenta"
                }
            </button>

        </form>
    )
}