import { useEffect, useState } from "react"
import styles from './Search.module.css'
import iconSearch from '../assets/iconSearch.png'
import { useLocation, useNavigate } from "react-router-dom"
import { useProducts } from "../context/Product/useProducts"

export const Search = () => {
    const { updateFilter, filters } = useProducts()
    const [ input, setInput ] = useState(filters.search)
    const [ prevSearch, setPrevSearch ] = useState(filters.search)
    
    const navigate = useNavigate();
    const location = useLocation();
    
    const isAdmin = location.pathname.includes("/admin")

    if (filters.search !== prevSearch) {
        setPrevSearch(filters.search);
        setInput(filters.search);
    }

    useEffect(() => {
        if (isAdmin) {
            const delayDebounceFn = setTimeout(() => {
                updateFilter("search", input)
            }, 400)

            return () => clearTimeout(delayDebounceFn);
        }
    }, [input, isAdmin, updateFilter]);

    const handleSubmit = (e) => {
        e.preventDefault()
        updateFilter("search", input)

        if (!isAdmin && location.pathname !== "/") {
            navigate("/");
        }
    }

    return(
        <form onSubmit={handleSubmit} className={styles.containerSearch}>
            <input
                type="text"
                placeholder="Buscar producto"
                value={input || ""}
                onChange={(e) => setInput(e.target.value)}
                className={styles.searchBar}
            />
            {!isAdmin && (
                <button type="submit" className={styles.buttonSearch}>
                    <img src={iconSearch} alt="Buscar" className={styles.imgSearch}/>
                </button>
            )}
        </form>
    )
}
