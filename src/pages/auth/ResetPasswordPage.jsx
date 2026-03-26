import styles from './AuthPage.module.css'
import { useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useUser } from "../../context/User/useUser"
import iconUser  from "../../assets/iconUser.png"

export const ResetPasswordPage = () => {
    const [ searchParams ] = useSearchParams()
    const token = searchParams.get('token')
    const navigate = useNavigate()
    const { resetPassword } = useUser()

    const [passwords, setPasswords] = useState({
        newPassword: "",
        confirmPassword: ""
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)

    const handleChange = (e) => {
        setPasswords({ ...passwords, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)

        if (passwords.newPassword !== passwords.confirmPassword) {
            return setError("Las contraseñas no coinciden.")
        }

        setLoading(true)
        try {
            const result = await resetPassword(token, passwords.newPassword)
            
            if (result.success) {
                setSuccess(true)
                setTimeout(() => navigate("/login"), 3000)
            } else {
                setError(result.message)
            }
        } catch (err) {
            setError("Error al conectar con el servidor.", err)
        } finally {
            setLoading(false)
        }
    }

    if (success) {
        return (
            <div className={styles.containerAuthPage}>
                <div className={styles.containerSuccessPassword}>
                    <p>¡Contraseña actualizada!</p>
                    <p>Tu contraseña ha sido cambiada con éxito. Serás redirigido al inicio de sesión...</p>
                    <button onClick={() => navigate("/auth")} className={styles.btnSuccess}>Ir al Login ahora</button>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.containerAuthPage}>
            <div className={styles.containerForm}>
                <img src={iconUser} alt="iniciar sesión" className={styles.imgUser} />
                <p className={styles.pTitleAuth}>Restablecer Contraseña</p>
                <form onSubmit={handleSubmit} className={styles.formAuth}>
                    <label htmlFor="newPassword">Nueva Contraseña</label>
                    <input 
                        type="password" 
                        name="newPassword" 
                        placeholder="Nueva Contraseña"
                        value={passwords.newPassword} 
                        onChange={handleChange} 
                        required 
                    />

                    <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                    <input 
                        type="password" 
                        name="confirmPassword" 
                        placeholder="Repetí tu contraseña"
                        value={passwords.confirmPassword} 
                        onChange={handleChange} 
                        required 
                    />

                    {error && <p className={styles.errorText}>{error}</p>}

                    <button type="submit" className={styles.btnAuth} disabled={loading}>
                        {loading ? "Actualizando..." : "Cambiar Contraseña"}
                    </button>
                </form>
            </div>
        </div>
    )
}