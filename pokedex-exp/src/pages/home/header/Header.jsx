import css from './header.module.scss'
import logo from '../../../assets/Pokemonbg.png.png'
import * as cgIcons from 'react-icons/cg'
import PropTypes from 'prop-types'


export default function Header({obtenerSearch}) {
    return (
        <nav className={css.header}>
            <div className={css.div_header}>
                <div className={css.div_logo}>
                    <img src={logo} alt="logo" />
                </div>
                <div className={css.div_search}>
                    <span > <cgIcons.CgSearch></cgIcons.CgSearch>
                    </span>
                    <input type="search" aria-autocomplete='none' name="busqueda" id="buscar" onChange={e => obtenerSearch(e.target.value)} />
                </div>
            </div>
        </nav>
    )
}
Header.propTypes = {
    obtenerSearch: PropTypes.func.isRequired    
};