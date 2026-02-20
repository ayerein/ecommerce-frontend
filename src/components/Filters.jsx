import { useState } from 'react';
import styles from './Filters.module.css'
import iconFilterMobile from '../assets/iconFilterMobile.png'
import iconFilter from '../assets/iconFilter.png'
import { useProducts } from '../context/Product/useProducts';

export const Filters = () => {
    const { categories, updateFilter, filters } = useProducts()

    const [ min, setMin ] = useState("");
    const [ max, setMax ] = useState("");
    const [ isOpen, setIsOpen ] = useState(false);

    const handleClear = () => {
        setMin("")
        setMax("")
        updateFilter("category", "")
        updateFilter("minPrice", "")
        updateFilter("maxPrice", "")
    }

    return(
        <>
        <button className={styles.btnOpenFiltersMobile} onClick={() => setIsOpen(true)}>
            <img src={iconFilterMobile} alt="Filtros" className={styles.imgFilterMobile}/>
            <p className={styles.pFilterMobile}>Filtros</p>
        </button>

        {isOpen && <div className={styles.overlay} onClick={() => setIsOpen(false)} />}

        <div className={`${styles.containerFilters} ${isOpen ? styles.active : ""}`}>
            <button 
                className={styles.btnCloseMobile} 
                onClick={() => setIsOpen(false)}
            >
                &times;
            </button>

            <div className={styles.containerTitleFilters}>
                <img src={iconFilter} alt="Filtrar" className={styles.imgFilters}/>
                <p className={styles.pFilters}>Filtros</p>
            </div>

            <div className={styles.containerCategories}>
                <p className={styles.pTitleFilters}>Categoria</p>
                {categories.map(cat => (
                    <label key={cat} className={styles.categoryItem}>
                    <input
                        type="checkbox"
                        name="category"
                        checked={filters.category === cat}
                        onChange={() => updateFilter("category", filters.category === cat ? "" : cat)}
                    />
                    <span className={styles.customRadio}></span>
                    {cat}
                    </label>
                ))}
            </div>
            
            <div className={styles.containerPrice}>
                <p className={styles.pTitleFilters}>Precio</p>
                <input type="number" placeholder="Mínimo" value={min} onChange={(e) => setMin(e.target.value)} className={styles.inputPriceFilter}/>
                <input type="number" placeholder="Máximo" value={max} onChange={(e) => setMax(e.target.value)} className={styles.inputPriceFilter}/>
                <button className={styles.buttonPriceFilter} onClick={() => {
                    updateFilter("minPrice", min)
                    updateFilter("maxPrice", max)
                }}
                >Aplicar</button>
            </div>

            <div className={`${styles.containerBtnClean}`}>
                <button className={styles.btnCleanFilters} onClick={handleClear}>
                Limpiar filtros
                </button>
            </div>

        </div>
        </>
    )
}