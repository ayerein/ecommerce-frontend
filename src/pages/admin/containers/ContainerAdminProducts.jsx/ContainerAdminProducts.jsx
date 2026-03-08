import styles from './ContainerAdminProducts.module.css'

import { ContainerFormAddNewProducts } from "../ContainerFormAddNewProducts/ContainerFormAddNewProducts.jsx"
import { ContainerProducts } from "../ContainerProducts/ContainerProducts"
import { ContainerEditProduct } from "../ContainerEditProduct/ContainerEditProduct"
import { SortSelect } from "../../../../components/SortSelect"

import { useModal } from "../../../../hooks/useModal"
import { useProducts } from "../../../../context/Product/useProducts";
import { useEffect } from 'react'
import { Filters } from '../../components/Filters/Filters'
import { ButtonsPagination } from '../../components/Pagination/ButtonsPagination'

export const ContainerAdminProducts = () => {
    const { resetFilters, totalPages, updateFilter, page } = useProducts()

    const { isOpen, selected, openModal, closeModal } = useModal()

    useEffect(() => {
        resetFilters("admin")
    }, [resetFilters])

    return (
        <div className={styles.containerAdminPage}>

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

                <ButtonsPagination totalPages={totalPages} prevPage={() => updateFilter("page", page - 1)} nextPage={() => updateFilter("page", page + 1)} page={page}/>

                <ContainerFormAddNewProducts />
                {
                    isOpen &&
                    <ContainerEditProduct closeModal={closeModal} selected={selected} />
                }
            </main>
        </div>
    )
}