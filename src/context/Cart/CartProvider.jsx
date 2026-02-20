import { useEffect, useState, useCallback, useMemo } from "react"
import { CartContext } from "./cart.context"
import { useProducts } from "../Product/useProducts"

export function CartProvider ({ children }) {
    const { refreshProducts } = useProducts()
    const [ cart, setCart ] = useState({ items: [] })
    const [ loading, setLoading ] = useState(true)
    

    const addToCart = useCallback(async (productId, quantity) => {
        const cartId = localStorage.getItem("cartId")
        
        const res = await fetch("/api/cart/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
            cartId,
            productId,
            quantity
            })
        })

        const data = await res.json()

        if (!res.ok) {
            alert(data.message)
            return
        }

        localStorage.setItem("cartId", data._id)
        setCart(data)
    }, [])

    const deleteProduct = useCallback(async (productId) => {
        const cartId = localStorage.getItem("cartId")

        const res = await fetch(`/api/cart/${cartId}/product/${productId}`, {
        method: "DELETE"
        })  

        const updatedCart = await res.json()
        
        setCart(updatedCart)
    }, [])

    const clearCart = useCallback(async () => {
        const cartId = localStorage.getItem("cartId")

        const res = await fetch(`/api/cart/${cartId}`, {
        method: "DELETE"
        }) 

        const updatedCart = await res.json()

        setCart(updatedCart)
    }, [])

    const createOrder = useCallback(async () => {
        const cartId = localStorage.getItem("cartId")

        const res = await fetch("/api/orders", {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify({ cartId })
        })

        const data = await res.json()

        if (!res.ok) {
            throw new Error(data.message)
        }

        localStorage.removeItem("cartId")
        setCart({ items: [] })
        await refreshProducts()

        return data
    }, [refreshProducts])

    const totalPrice = useMemo(() => {
        return cart.items.reduce((acc, item) => {
            return acc + (item.product.precio_producto * item.quantity)
        }, 0)
    }, [cart])

    const totalUnits = useMemo(() => {
        return cart.items.reduce((acc, item) => acc + item.quantity, 0)
    }, [cart])

    useEffect(() => {
        const cartId = localStorage.getItem("cartId")

        if (!cartId) {
        setLoading(false)
        return
        }

        const fetchCart = async () => {
        try {
            const res = await fetch(`/api/cart/${cartId}`)
            const data = await res.json()
            setCart(data)
        } catch (error) {
            console.error(error)
            localStorage.removeItem("cartId")
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
            totalPrice,
            totalUnits
        }}
        >
        {children}
        </CartContext.Provider>
    )
}