import styles from './SortSelect.module.css'
import { useProducts } from '../context/Product/useProducts'
import { useEffect, useRef, useState } from 'react'
import iconSortMobile from '../assets/iconSortMobile.png'
import iconOpen from '../assets/iconOpen.png'

export const SortSelect = ({ enabledFilters }) => {
    const { updateFilter, filters } = useProducts()
    const [ isOpen, setIsOpen ] = useState(false)
    const dropdownRef = useRef(null);

    const options = [
        { id: "name_asc", label: "Nombre A-Z", enabled: enabledFilters.name_asc },
        { id: "name_desc", label: "Nombre Z-A", enabled: enabledFilters.name_desc },
        { id: "price_asc", label: "Precio: Menor a Mayor", enabled: enabledFilters.price_asc },
        { id: "price_desc", label: "Precio: Mayor a Menor", enabled: enabledFilters.price_desc },
        { id: "stock_asc", label: "Stock: Menor a Mayor", enabled: enabledFilters.stock_asc },
        { id: "stock_desc", label: "Stock: Mayor a Menor", enabled: enabledFilters.stock_desc },
    ];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const currentLabel = options.find(o => o.id === filters.sort)?.label || "Ordenar por";

    const handleSelect = (value) => {
        updateFilter("sort", value)
        setIsOpen(false)
    };

    return(
        <div className={styles.containerSort} ref={dropdownRef}>
            <div className={styles.containerButtonSort}>
                <p className={styles.pSortTitle}>Ordenar por</p>
                <button className={styles.dropdownTrigger} onClick={() => setIsOpen(!isOpen)}>
                    <img src={iconSortMobile} alt="Ordenar" className={styles.imgSortMobile}/>
                    <p className={styles.pSortMobile}>{currentLabel}</p>
                    <img src={iconOpen} alt="Ordenar" className={styles.imgSort}/>
                    <p className={styles.pSortTitleMobile}>Ordenar por</p>
                </button>
            </div>
            
            {isOpen && <div className={styles.overlay} onClick={() => setIsOpen(false)} />}

            <div className={`${styles.optionsWrapper} ${isOpen ? styles.active : ""}`}>
                <div className={styles.headerMobile}>
                    <p className={styles.pSortTitle}>Ordenar por</p>
                    <button className={styles.btnClose} onClick={() => setIsOpen(false)}>&times;</button>
                </div>

                <div className={styles.listOptions}>
                    <p className={styles.pSortDesktop}>Ordenar por:</p>
                    {options.map(opt => opt.enabled && (
                        <button 
                            key={opt.id}
                            className={`${styles.sortButton} ${filters.sort === opt.id ? styles.selected : ""}`}
                            onClick={() => handleSelect(opt.id)}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}