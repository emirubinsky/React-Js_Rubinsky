// TODO - Agregar prop-types despues...
/* eslint-disable react/prop-types */
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import cartLogo from '../../assets/cartLogo.svg'
// import './CartCounter.scss'

const CartWidget = () => {
    const { cart  } = useContext(CartContext);

    return (
        <div>
            <img src={cartLogo} alt="Logo" className='h-10 w-10'/>
            <span>
                {cart.length}
            </span>
        </div>
    )
}

export default CartWidget