import { useCallback, useEffect, useState } from "react"
import { UserContext } from "./user.context"
import { useNavigate } from "react-router-dom"


export function UserProvider({ children }) {
    const [ user, setUser ] = useState(null)
    const [ loading, setLoading ] = useState(true)
    const navigate = useNavigate()

    const checkSession = useCallback(async () => {
        try {
            const baseUrl = import.meta.env.VITE_API_URL
            const response = await fetch(`${baseUrl}/api/sessions/current`, {
                method: "GET",
                credentials: "include",
            })

            if (response.ok) {
                const data = await response.json()
                setUser(data.payload)
            } else {
                setUser(null)
            }
        } catch (error) {
            console.error("Error verificando sesión:", error)
            setUser(null)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        checkSession()
    }, [checkSession])

    const register = useCallback(async (userData) => {
        try {
            const baseUrl = import.meta.env.VITE_API_URL

            const guestCartId = localStorage.getItem("cartId")

            const response = await fetch(`${baseUrl}/api/sessions/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...userData, guestCartId }),
                credentials: "include"
            })

            const data = await response.json()

            if (response.ok) {
                if (data.payload && data.payload.cart) {
                    localStorage.setItem("cartId", data.payload.cart)
                }
                setUser(data.payload)
                return { success: true }
            }

            return { success: false, message: data.message }
        } catch (error) {
            console.error("Error al registrarse:", error)
            return { success: false, message: "Error de conexión con el servidor" }
        }
        
    }, [])

    const login = useCallback(async (email, password) => {
        const guestCartId = localStorage.getItem("cartId")
        try {
            const baseUrl = import.meta.env.VITE_API_URL
            const response = await fetch(`${baseUrl}/api/sessions/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password, guestCartId }),
                credentials: "include", 
            })

            const data = await response.json()

            if (response.ok) {
                if (data.payload && data.payload.cart) {
                    localStorage.setItem("cartId", data.payload.cart)
                }
                setUser(data.payload)
                return { success: true }
            }

            return { success: false, message: data.message }
        } catch (error) {
            console.error("Error en login:", error)
            return { success: false, message: "Error de conexión con el servidor" }
        }
        
    }, [])

    const logout = useCallback(async () => {
        try{
            const baseUrl = import.meta.env.VITE_API_URL
            await fetch(`${baseUrl}/api/sessions/logout`, {
                method: "POST",
                credentials: "include",
            })
        } catch (error) {
            console.error("Error en logout:", error)
        } finally{
            localStorage.removeItem("cartId")
            setUser(null)
        }
    }, [])

    const forgotPassword = useCallback(async (email) => {
        try {
            const baseUrl = import.meta.env.VITE_API_URL
            const res = await fetch(`${baseUrl}/api/sessions/forgot-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: email.toLowerCase().trim() }),
            })

            const data = await res.json()

            if (res.ok) {
                return { success: true }
            } else {
                return { 
                    success: false, 
                    message: data.message || "No se pudo enviar el correo de recuperación." 
                }
            }
        } catch (error) {
            console.error("Error en forgotPassword:", error)
            return { 
                success: false, 
                message: "Error de conexión con el servidor." 
            }
        }
    }, [])

    const resetPassword = useCallback(async (token, password) => {
        try {
            const baseUrl = import.meta.env.VITE_API_URL
            const res = await fetch(`${baseUrl}/api/sessions/reset-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, password }),
            })

            const data = await res.json()

            if (res.ok) {
                return { success: true }
            } else {
                return { success: false, message: data.message }
            }
        } catch (error) {
            return { success: false, message: error }
        }
    }, [])

    const deleteAccount = useCallback(async () => {
        const confirmDelete = window.confirm(
            "¿Estás seguro de que quieres eliminar tu cuenta? Esta acción borrará tu carrito y es irreversible."
        )
        
        if (!confirmDelete) return

        try{
            const baseUrl = import.meta.env.VITE_API_URL
            const res = await fetch(`${baseUrl}/api/sessions/delete`, {
                method: "DELETE",
                credentials: "include",
            })

            if (!res.ok) {
                const errorData = await res.json()
                throw new Error(errorData.message || "Error al eliminar la cuenta")
            }

            setUser(null)

            localStorage.removeItem("cartId")

            navigate("/")

        } catch (error) {
            console.error("Error al eliminar cuenta:", error);
            alert(error.message);
        }
    }, [setUser, navigate])


    return (
        <UserContext.Provider
        value={{
            user, 
            setUser,
            register,
            forgotPassword,
            resetPassword,
            login, 
            logout, 
            deleteAccount,
            loading
        }}
        >
        {children}
        </UserContext.Provider>
    );
}