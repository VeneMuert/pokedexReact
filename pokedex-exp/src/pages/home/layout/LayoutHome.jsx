import { useEffect, useState } from 'react'
import css from './layout.module.scss'
import Header from '../header/Header'
import axios from 'axios'
import { URL_POKEMON } from '../../../assets/api/apiRest'
import Card from '../card/Card'
import * as cgIcons from 'react-icons/cg'

export default function LayoutHome() {

    const [arrayPokemon, setArrayPokemon] = useState([])
    const [xpage, setXpage] = useState(1)
    const [global, setGlobal] = useState([])
    const [search, setSearch] = useState('')

    // URL para obtener pokemon segun su url
    useEffect(() => {
        const api = async () => {
            const limit = 25
            const xp = (xpage - 1) * limit
            const apiPoke = await axios.get(`${URL_POKEMON}/?offset=${xp}&limit=${limit}`)
            setArrayPokemon(apiPoke.data.results)
        }
        api()
        getglobalPokemon()
    }, [xpage])

    // URL para tener un limite de busqueda
    const getglobalPokemon = async () => {
        const res = await axios.get(`${URL_POKEMON}?offset=0&limit=1025`)
        const promises = res.data.results.map(pokemon => {
            return pokemon;
        })
        const results = await Promise.all(promises)
        setGlobal(results)
    }

    // Configurar el Buscar
    const obtenerSearch = (e)=>{
        const texto = e.toLowerCase()
        setSearch(texto)
        setXpage (1)
    }

    const filterPokemon  = search.length>0 ? 
    global?.filter(pokemon=> pokemon?.name?.includes(search)) 
    : arrayPokemon

    //HTML
    return (
        <div className={css.layout}>
            <Header obtenerSearch={obtenerSearch}/>
            <section className={css.section_page}>
                <div className={css.div_page}>
                    <span className={css.item_izq}
                        onClick={() => {
                            xpage === 1 ? setXpage : setXpage(xpage - 1)
                        }

                        }>
                        <cgIcons.CgArrowLeft />
                    </span>
                    <span className={css.item}>{xpage}</span>
                    <span className={css.item}> DE </span>
                    <span className={css.item}>{" "}{Math.round(global?.length / 25)}{" "} </span>
                    <span className={css.item_der}
                        onClick={() => {
                            xpage === 41 ? setXpage : setXpage(xpage + 1)
                        }

                        }
                    >
                        {" "}
                        <cgIcons.CgArrowRight />{" "}
                    </span>
                </div>
            </section >
            {/*Contenido */}
            <div className={css.card_content}>
                {filterPokemon.map((card, index) => {
                    return <Card key={index} card={card} />
                })}
            </div>
            {/*flechas footer */}
            <section className={`${css.section_page} ${css.secbottom}`}>
                <div className={css.div_page}>
                    <span
                        className={css.item_izq}
                        onClick={() => {
                            xpage === 1 ? setXpage : setXpage(xpage - 1)
                        }

                        }><cgIcons.CgArrowLeft />
                    </span>
                    <span className={css.item}>{xpage}</span>
                    <span className={css.item}> DE </span>
                    <span className={css.item}>{" "}{Math.round(global?.length / 25)}{" "} </span>
                    <span
                        className={css.item_der}
                        onClick={() => {
                            xpage === Math.round(global?.length / 25) ? setXpage : setXpage(xpage + 1)
                        }
                        }>{" "}<cgIcons.CgArrowRight />{" "}
                    </span>
                </div>
            </section >
        </div >
    )
}

