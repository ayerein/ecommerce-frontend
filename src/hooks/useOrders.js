import { useState, useEffect } from 'react'

export const useOrders = () => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchOrders = async () => {
        try {
            setLoading(true)
            const baseUrl = import.meta.env.VITE_API_URL || ""
            const response = await fetch(`${baseUrl}/api/orders`, { 
                credentials: 'include'
            })
            
            if (!response.ok) throw new Error('Error al obtener las órdenes')

            const data = await response.json()
            setOrders(data.payload)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchOrders()
    }, [])

    return { orders, loading, error, refetch: fetchOrders }
}