// TODO - Agregar prop-types despues...
/* eslint-disable react/prop-types */
import cartLogo from '../../assets/cartLogo.svg'
// import './CartCounter.scss'

const CartWidget = ({items}) => {

    return (
        <>
            <img src={cartLogo} alt="Logo" className='h-10 w-10'/>
            <span>
                {items.length}
            </span>
        </>
    )
}

export default CartWidget