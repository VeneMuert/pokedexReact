import css from './header.module.scss'
import logo from '../../../assets/Pokemonbg.png.png'
import * as cgIcons from 'react-icons/cg'

export default function Header() {
    return (
        <nav className={css.header}>
            <div className={css.div_header}>
                <div className={css.div_logo}>
                    <img src={logo} alt="logo" />
                </div>
                <div className={css.div_search}>
                    <span > <cgIcons.CgSearch></cgIcons.CgSearch>
                    </span>
                    <input type="search" name="busqueda" id="buscar" />
                </div>
            </div>
        </nav>
    )
}