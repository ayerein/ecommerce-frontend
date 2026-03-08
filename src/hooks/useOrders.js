import { useState, useEffect, useCallback } from 'react'

export const useOrders = () => {
    const [ orders, setOrders ] = useState([])
    const [ data, setData ] = useState(1)
    const [ loading, setLoading ] = useState(true)
    const [ error, setError ] = useState(null)
    const [ page, setPage ] = useState(1)

    const fetchOrders = useCallback(async () => {
        try {
            setLoading(true)
            const baseUrl = import.meta.env.VITE_API_URL || ""
            const response = await fetch(`${baseUrl}/api/orders?page=${page}`, { 
                credentials: 'include'
            })
            
            if (!response.ok) throw new Error('Error al obtener las órdenes')

            const data = await response.json()
            setOrders(data.payload)
            setData(data)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }, [page])

    const updateStatus = async (orderId, newStatus) => {
        try {
            const baseUrl = import.meta.env.VITE_API_URL || ""
            const response = await fetch(`${baseUrl}/api/orders/${orderId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
                credentials: 'include'
            })

            if (response.ok) {
                await fetchOrders()
                return true
            }
        } catch (err) {
            console.error("Error actualizando estado:", err);
        }
    }

    useEffect(() => {
        fetchOrders()
    }, [fetchOrders])

    const updateFilter = (newPage) => {
        setPage(newPage)
    }

    return { orders, data, loading, error, updateFilter, updateStatus, refetch: fetchOrders }
}