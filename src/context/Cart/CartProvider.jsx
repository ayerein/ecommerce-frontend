import { useEffect, useState, useCallback } from "react"
import { CartContext } from "./cart.context"
import { useProducts } from "../Product/useProducts"

export function CartProvider ({ children }) {
    const { refreshProducts } = useProducts()
    const [ cart, setCart ] = useState({ items: [] })
    const [ loading, setLoading ] = useState(true)
    

    const addToCart = useCallback(async (productId, quantity) => {
        try {
            const baseUrl = import.meta.env.VITE_API_URL || "";
        
            const cartId = localStorage.getItem("cartId")
            
            const bodyData = {
                productId,
                quantity
            }

            if (cartId && cartId !== "null" && cartId !== "undefined") {
                bodyData.cartId = cartId
            }

            const res = await fetch(`${baseUrl}/api/cart/add`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(bodyData)
            })

            if (!res.ok) throw new Error("Error al añadir al carrito");

            const data = await res.json()

            localStorage.setItem("cartId", data._id)
            setCart(data)
        } catch (error) {
            console.error("Error:", error)
        }
    }, [])

    const deleteProduct = useCallback(async (productId) => {
        try {
            const baseUrl = import.meta.env.VITE_API_URL || "";
            const cartId = localStorage.getItem("cartId")

            const res = await fetch(`${baseUrl}/api/cart/${cartId}/product/${productId}`, {
            method: "DELETE"
            })  

            if (!res.ok) throw new Error("Error al eliminar el producto del carrito.");

            const updatedCart = await res.json()
            
            setCart(updatedCart)
        } catch (error) {
            console.error("Error:", error);
        }
    }, [])

    const clearCart = useCallback(async () => {
        try {
            const baseUrl = import.meta.env.VITE_API_URL || "";

            const cartId = localStorage.getItem("cartId")

            const res = await fetch(`${baseUrl}/api/cart/${cartId}`, {
            method: "DELETE"
            }) 

            if (!res.ok) throw new Error("Error al limpiar el carrito");

            const updatedCart = await res.json()

            setCart(updatedCart)
        } catch (error) {
            console.error("Error:", error);
        }
    }, [])

    const createOrder = useCallback(async () => {
        try {
            const baseUrl = import.meta.env.VITE_API_URL || "";

            const res = await fetch(`${baseUrl}/api/orders`, {
                method: "POST",
                headers: {
                "Content-Type": "application/json"
                },
                credentials: "include"
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.message)
            }

            setCart({ items: [] })
            await refreshProducts()

            return data
        } catch (error) {
            console.error("Error:", error);
        }
    }, [refreshProducts])


    useEffect(() => {
        const cartId = localStorage.getItem("cartId")

        if (!cartId) {
        setLoading(false)
        return
        }

        const fetchCart = async () => {
            try {
                const baseUrl = import.meta.env.VITE_API_URL || "";
                const res = await fetch(`${baseUrl}/api/cart/${cartId}`)
                if (!res.ok) {
                    if (res.status === 404) {
                        localStorage.removeItem("cartId")
                        setCart({ items: [] })
                    }
                    return
                }
                const data = await res.json()
                setCart(data)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }

        fetchCart()
    }, [])
    
    return (
        <CartContext.Provider
        value={{
            cart,
            loading,
            addToCart,
            deleteProduct,
            clearCart,
            createOrder,
            totalPrice: cart?.totalPrice || 0,
            totalUnits: cart?.totalUnits || 0
        }}
        >
        {children}
        </CartContext.Provider>
    )
}