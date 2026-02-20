import { useState, useEffect, useCallback } from "react"
import { ProductContext } from "./product.context"

const initialFiltersShop = {
    search: "",
    category: "",
    minPrice: "",
    maxPrice: "",
    sort: "name_asc",
    inStock: true,
    limit: 8,
    page: 1,
};
const initialFiltersAdmin = { 
    search: "", 
    category: "", 
    minPrice: "", 
    maxPrice: "", 
    sort: "name_asc", 
    inStock: false, 
    limit: 16, 
    page: 1,
}

export function ProductProvider({ children }) {
    const path = window.location.pathname;

    const [ products, setProducts ] = useState([]);
    const [ filters, setFilters ] = useState(path.includes("/admin") ? initialFiltersAdmin : initialFiltersShop);
    const [ totalPages, setTotalPages ] = useState(1);
    const [ categories, setCategories ] = useState([]);
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(null)

    const getProducts = useCallback(async (filters, append = false) => {
        setLoading(true)
        setError(null)

        try {
        const params = new URLSearchParams();

        Object.entries(filters).forEach(([key, value]) => {
            if (value !== "" && value !== undefined && value !== null) {
            params.set(key, value)
            }
        })

        const isDev = import.meta.env.DEV
        const baseUrl = isDev ? "" : import.meta.env.VITE_API_URL
        
        const url = `${baseUrl}/api/products?${params.toString()}`

        const res = await fetch(url)
        
        if (!res.ok) {
            throw new Error("Error al obtener productos")
        }
        
        const data = await res.json()
        
        if(window.location.pathname.includes("/admin")){
            setProducts(data.docs)
        } else {
            setProducts(prev => append ? [...prev, ...data.docs] : data.docs)
        }
        setTotalPages(data.totalPages);

        } catch (err) {
        console.error(err)
        setError(err.message)
        setProducts([])
        } finally {
        setLoading(false)
        }
    }, [])

    const updateFilter = useCallback((key, value) => {
        setFilters(prev => ({
            ...prev,
            [key]: value,
            page: key === "page" ? value : 1,
        }));
    }, []);
    
    const resetFilters = useCallback((mode) => {
        setFilters(prev => {
            const baseFilters = mode === "admin" ? initialFiltersAdmin : initialFiltersShop;
            
            return{
                ...baseFilters,
                search: prev.search
            }
        });
    }, []);

    useEffect(() => {
        const isAppend = filters.page > 1;
        getProducts(filters, isAppend);
    }, [filters, getProducts]);

    useEffect(() => {
        const fetchCategories = async () => {
            const res = await fetch("/api/products/categories");
            const data = await res.json();
            setCategories(data);
        };
        fetchCategories();
    }, []);

    const refreshProducts = useCallback(() => {
        getProducts(filters, false)
    }, [filters, getProducts])

    return (
        <ProductContext.Provider
        value={{
            products,
            categories,
            filters,
            totalPages,
            loading,
            resetFilters,
            updateFilter,
            refreshProducts,
            error
        }}
        >
        {children}
        </ProductContext.Provider>
    );
    
}