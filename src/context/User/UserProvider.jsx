import { useCallback, useEffect, useState } from "react"
import { UserContext } from "./user.context"


export function UserProvider({ children }) {
    const [ user, setUser ] = useState(null)
    const [ loading, setLoading ] = useState(true)

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


    return (
        <UserContext.Provider
        value={{
            user, 
            register,
            login, 
            logout, 
            loading
        }}
        >
        {children}
        </UserContext.Provider>
    );
}