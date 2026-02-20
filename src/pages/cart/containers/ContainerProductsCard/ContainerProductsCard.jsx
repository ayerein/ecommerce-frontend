import { ProductCard } from "../../components/ProductCard";
import styles from "./ContainerProductsCard.module.css";
import { useCart } from "../../../../context/Cart/useCart";
import { EmptyCart } from "../../components/EmptyCart";
import { useNavigate } from "react-router-dom";

export const ContainerProductsCard = () => {
    const { cart, totalPrice, clearCart, createOrder } = useCart()
    const navigate = useNavigate();

    const handleCheckout = async () => {
        try {
            const orderData = await createOrder()
            navigate("/order-success", {
            state: orderData
            })
        } catch (err) {
            alert(err.message)
        }
    }

    if (!cart || cart.items.length === 0) {
        return(
            <EmptyCart />
        )
    }

    return(
        <div className={styles.containerProductCards}>

            <div className={styles.containerTitle}>
                <p className={styles.pTitle}>Carrito</p>
            </div>

            <div className={styles.containerButtonCleanCart}>
                <button onClick={clearCart} className={styles.buttonCleanCart}>Vaciar carrito</button>
            </div>
            
            <div className={styles.containerCards}>
                <div className={styles.containerTitles}>
                    <p>Producto</p>
                    <div></div>
                    <p>Precio</p>
                    <p>Cantidad</p>
                    <p className={styles.pTotal}>Total</p>
                    <div></div>
                </div>

                {cart?.items?.map(item => (
                    <ProductCard
                    key={item.product._id}
                    quantity={item.quantity}
                    id={item.product._id}
                    nombre={item.product.nombre_producto}
                    precio={item.product.precio_producto}
                    stock={item.product.stock_producto}
                    img={item.product.img_producto}
                    />
                ))}
            </div>

            <div className={styles.containerCheckout}>
                <div className={styles.containerTotalPrice}>
                    <p>Total a pagar</p>
                    <p>${totalPrice}</p>
                </div>
                <div className={styles.containerButtonCheckout}>
                    <button  onClick={handleCheckout} className={styles.buttonCheckout}>Finalizar Compra</button>
                </div>
            </div>
        </div>
    )
}
