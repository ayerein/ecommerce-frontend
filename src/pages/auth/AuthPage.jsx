import { useState } from "react"
import { useNavigate } from "react-router-dom"
import styles from './AuthPage.module.css'
import iconUser  from "../../assets/iconUser.png"

import { useUser } from "../../context/User/useUser"
import { ContainerForm } from "./containers/ContainerForm"

export const AuthPage = () => {
    const [ mode, setMode ] = useState('login')
    const [ loading, setLoading ] = useState(false)
    const [ formData, setFormData ] = useState({
        first_name: "",
        last_name: "",
        email: "",
        age: "",
        password: "",
    })
    const [ error, setError ] = useState(null)
    const [ message, setMessage ] = useState(null)

    const { login, register, forgotPassword } = useUser()
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        try {
            let result
            if (mode === 'login') {
                result = await login(formData.email, formData.password)
            } else if (mode === 'register') {
                result = await register(formData)
            } else if (mode === 'forgot') {
                result = await forgotPassword(formData.email)

                if (result.success) {
                    setMessage("¡Listo! Te enviamos un mail con los pasos a seguir.");
                    setFormData({ ...formData, email: "" })
                } else {
                    setError(result.message)
                }
            }

            if (result?.success && mode !== 'forgot') {
                navigate("/");
            } else if (!result?.success) {
                setError(result.message)
            }
        } catch {
            setError("Error de conexión con el servidor")
        } finally {
            setLoading(false)
        }
    }

    const getTitle = () => {
        if (mode === 'login') return "Iniciar Sesión con tu cuenta"
        if (mode === 'register') return "Crear Cuenta"
        return "Recuperar Contraseña"
    }

    return(
        <div className={styles.containerAuthPage}>
            <div className={styles.containerForm}>
                <img src={iconUser} alt="iniciar sesión" className={styles.imgUser} />
                <p className={styles.pTitleAuth}>{getTitle()}</p>

                {message ? (
                    <div className={styles.successBox}>
                        <p className={styles.successMessage}>{message}</p>
                        <button onClick={() => {
                            setMode('login') 
                            setMessage(null)
                            setError(null)
                        }} className={styles.btnBack}>
                            Volver al inicio
                        </button>
                    </div>
                ) : (
                <ContainerForm 
                    loading={loading} 
                    mode={mode} 
                    setMode={setMode}
                    formData={formData} 
                    handleSubmit={handleSubmit} 
                    handleChange={handleChange} 
                    error={error} 
                />
                )}
                
                {mode === 'login' && (
                    <p onClick={() => setMode('register')} className={styles.pIsLogin}>¿No tienes cuenta? Regístrate</p>
                )}
                {(mode === 'register' || mode === 'forgot') && (
                    <p onClick={() => {
                    setMode('login')
                    setError(null)
                    }} className={styles.pIsLogin}>¿Ya tienes cuenta? Inicia sesión</p>
                )}
            </div>
        </div>
    )
}