import { useState } from "react"
import { useNavigate } from "react-router-dom"
import styles from './AuthPage.module.css'
import iconUser  from "../../assets/iconUser.png"

import { useUser } from "../../context/User/useUser"
import { ContainerForm } from "./containers/ContainerForm"

export const AuthPage = () => {
    const [ isLogin, setIsLogin ] = useState(true)
    const [ formData, setFormData ] = useState({
        first_name: "",
        last_name: "",
        email: "",
        age: "",
        password: "",
    })
    const [ error, setError ] = useState(null)

    const { login, register } = useUser()
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)

        if (isLogin) {
            const result = await login(formData.email, formData.password)
            if (result.success) {
                navigate("/")
            } else {
                setError(result.message)
            }
        } else {
            const result = await register(formData)
            if (result.success) {
                navigate("/")
            } else {
                setError(result.message)
            }
        }
    }

    return(
        <div className={styles.containerAuthPage}>
            <div className={styles.containerForm}>
                <img src={iconUser} alt="iniciar sesión" className={styles.imgUser} />
                <p className={styles.pTitleAuth}>{isLogin ? "Iniciar Sesión con tu cuenta" : "Crear Cuenta"}</p>
                
                <ContainerForm isLogin={isLogin} formData={formData} handleSubmit={handleSubmit} handleChange={handleChange} error={error} />

                <p onClick={() => setIsLogin(!isLogin)} className={styles.pIsLogin}>
                    {isLogin ? "Regístrate aquí" : "Inicia sesión"}
                </p>
            </div>
        </div>
    )
}