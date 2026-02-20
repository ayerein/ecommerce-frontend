import { useEffect, useState } from "react"

export const useProduct = (id) => {
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!id) return

    const fetchProduct = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_URL || "";

        const res = await fetch(`${baseUrl}/api/products/${id}`)
        
        if (!res.ok) throw new Error("Error al obtener producto")

        const data = await res.json()
        setProduct(data)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  return { product, loading, error }
}