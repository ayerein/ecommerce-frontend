import { ContainerAdminProducts } from "./containers/ContainerAdminProducts.jsx/ContainerAdminProducts"
import styles from './AdminPage.module.css'

import { Search } from "../../components/Search.jsx"
import { useState } from "react"
import { ContainerOrders } from "./containers/ContainerOrders/ContainerOrders.jsx"

export const AdminPage = () => {
    const [ optionAdmin, setOptionAdmin ] = useState('Products')

    return(
        <div className={styles.containerAdminPage}>
            <div className={styles.containerSearchAdmin}>
                <Search />
            </div>
            <div className={styles.containerOptionsAdmin}>
                <button type="button" onClick={()=> setOptionAdmin('Orders')}>Ordenes</button>
                <button type="button" onClick={()=> setOptionAdmin('Products')}>Productos</button>
            </div>
            {
                optionAdmin === "Products" ?
                <ContainerAdminProducts/>
                :
                <ContainerOrders />
            }
        </div>
    )
    
}