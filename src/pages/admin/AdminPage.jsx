import styles from './AdminPage.module.css'

import { ContainerFormAddNewProducts } from "./containers/ContainerFormAddNewProducts/ContainerFormAddNewProducts"
import { ContainerProducts } from "./containers/ContainerProducts/ContainerProducts"
import { ContainerEditProduct } from "./containers/ContainerEditProduct/ContainerEditProduct"
import { Search } from "../../components/Search"
import { SortSelect } from "../../components/SortSelect"

import { useProductModal } from "../../hooks/useProductModal"
import { useProducts } from "../../context/Product/useProducts";
import { useEffect } from 'react'
import { Filters } from './components/Filters'
import { ButtonsPagination } from './components/ButtonsPagination'


export const AdminPage = () => {
    const { resetFilters } = useProducts()

    const { isOpen, selectedProduct, openModal, closeModal } = useProductModal()

    useEffect(() => {
        resetFilters("admin")
    }, [resetFilters])

    return (
        <div className={styles.containerAdminPage}>
            <div className={styles.containerSearchAdmin}>
                <Search />
            </div>

            <div className={styles.containerFiltersCategories}>
                <Filters />
                <SortSelect enabledFilters={{
                    name_asc: false,
                    name_desc: false,
                    price_asc: true,
                    price_desc: true,
                    stock_desc: true,
                    stock_asc: true
                }}/>
            </div>

            <main className={styles.containerAdminProducts}>

                <ContainerProducts openModal={openModal}/>

                <ButtonsPagination />

                <ContainerFormAddNewProducts />
                {
                    isOpen &&
                    <ContainerEditProduct closeModal={closeModal} selectedProduct={selectedProduct} />
                }
            </main>
        </div>
    )
}