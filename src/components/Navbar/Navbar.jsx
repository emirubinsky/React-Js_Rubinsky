// import './Navbar.scss'
import logo from '../../assets/organicaLogo32.png'
import CartCounter from '../CartCounter/CartCounter'
import NavLink from './NavLink'

// TODO - esto luego será parte de la logica intera
const items = [1,2,3]

const Navbar = () => {

    return (
        <header className="bg-organica">
            <div className="container m-auto py-6 flex justify-between items-center">
                {/* <h1 className="header__title">LOGO</h1> */}
                {/* <img src="/imgs/react.svg" alt="Logo"/> */}
                <img src={logo} alt="Logo"/>

                <nav className="flex gap-4">
                    <NavLink href={"#"} text={"Enlace 1"}/>
                    <NavLink href={"#"} text={"Enlace 2"}/>
                    <NavLink href={"#"} text={"Enlace 3"}/>
                    <NavLink href={"#"} text={"Enlace 4"}/>
                    <NavLink href={"#"} text={"Enlace 5"}/>
                </nav>

                <CartCounter items={items}/> 
            </div>
        </header>
    )
}

export default Navbar