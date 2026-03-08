import { ContainerAdminProducts } from "./containers/ContainerAdminProducts.jsx/ContainerAdminProducts"
import styles from './AdminPage.module.css'

import { Search } from "../../components/Search.jsx"
import { useState } from "react"
import { ContainerOrders } from "./containers/ContainerOrders/ContainerOrders.jsx"

export const AdminPage = () => {
    const [ optionAdmin, setOptionAdmin ] = useState(false)

    return(
        <div className={styles.containerAdminPage}>
            <div className={styles.containerSearchAdmin}>
                <Search />
            </div>
            <div className={styles.containerOptionsAdmin}>
                <button type="button" onClick={()=> setOptionAdmin(true)} className={`${styles.btnOptionsAdmin} ${optionAdmin ? styles.active : ''}`}>Ordenes</button>
                <button type="button" onClick={()=> setOptionAdmin(false)} className={`${styles.btnOptionsAdmin} ${optionAdmin ? '' : styles.active}`}>Productos</button>
            </div>
            {
                optionAdmin ?
                <ContainerOrders />
                :
                <ContainerAdminProducts/>
            }
        </div>
    )
    
}