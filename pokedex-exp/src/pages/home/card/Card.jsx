import { useEffect, useState } from 'react'
import css from './card.module.scss'
import axios from 'axios'
import { URL_ESPECIES, URL_EVOUCIONES, URL_POKEMON } from '../../../assets/api/apiRest'
import PropTypes from 'prop-types'

export default function Card({ card }) {

    const [itemPokemon, setitemPokemon] = useState({})
    const [idPokemon, setidPokemon] = useState({})
    const [evoluciones, setevoluciones] = useState([])

    //Listando nombre y Url de los pokemon-----------------------------------
    useEffect(() => {
        const dataPokemon = async () => {
            const api = await axios.get(`${URL_POKEMON}/${card.name}`)
            setitemPokemon(api.data)

        }
        dataPokemon();
    }, [card.name])
    //obteniendo ID de los Pokemon----------------------------------
    useEffect(() => {

        const especiePokemon = async () => {
            const URL = card.url.split("/")
            const api = await axios.get(`${URL_ESPECIES}/${URL[6]}`)
            setidPokemon({
                url_especie: api?.data?.evolution_chain,
                data: api?.data
            })
        }
        especiePokemon();
    }, [card.url])

    //obteniendo evoluciones------------------------------------------------------    
    // useEffect(() => {
    //     async function getPokemonImagen(id) {
    //         const res = await axios.get(`${URL_POKEMON}/${id}`);
    //         return res?.data?.sprites?.other["official-artwork"]?.front_default;
    //     }

    //     if (idPokemon?.url_especie) {
    //         const obtEvolucion = async () => {
    //             const arrayEvoluciones = []
    //             const URL = idPokemon?.url_especie?.url?.split("/")
    //             const api = await axios.get(`${URL_EVOUCIONES}/${URL[6]}`)
    //             const URL2 = api?.data?.chain?.species?.url?.split("/")
    //             const img1 = await getPokemonImagen(URL2[6])
    //             arrayEvoluciones.push({
    //                 img: img1,
    //                 name: api?.data?.chain?.species?.name,
    //             })
    //             if (api?.data?.chain?.evolves_to?.length !== 0) {
    //                 const DATA2 = api?.data?.chain?.evolves_to[0]?.species;
    //                 const ID = DATA2?.url?.split("/")
    //                 const img2 = await getPokemonImagen(ID[6])
    //                 arrayEvoluciones.push({
    //                     img: img2,
    //                     name: DATA2?.name,
    //                 })
    //                 if (api?.data?.chain?.evolves_to[0]?.evolves_to.length !== 0) {
    //                     const DATA3 = api?.data?.chain?.evolves_to[0]?.evolves_to[0]?.species;
    //                     const ID = DATA3?.url?.split("/")
    //                     const img3 = await getPokemonImagen(ID[6])
    //                     arrayEvoluciones.push({
    //                         img: img3,
    //                         name: DATA3?.name,
    //                     })
    //                 }
    //             }
    //             setevoluciones(arrayEvoluciones)
    //         }
    //         obtEvolucion();
    //     }
    // }, [idPokemon?.url_especie])    
    useEffect(() => {
        async function getPokemonImagen(id) {
            const res = await axios.get(`${URL_POKEMON}/${id}`);
            return res?.data?.sprites?.other["official-artwork"]?.front_default;
        }

        if (idPokemon?.url_especie) {
            const obtEvolucion = async () => {
                let arrayEvoluciones = [];
                const URL = idPokemon?.url_especie?.url?.split("/");
                const api = await axios.get(`${URL_EVOUCIONES}/${URL[6]}`);
                const URL2 = api?.data?.chain?.species?.url?.split("/");
                const img1 = await getPokemonImagen(URL2[6]);
                arrayEvoluciones.push({
                    img: img1,
                    name: api?.data?.chain?.species?.name,
                });

                for (let i = 0; i < api?.data?.chain?.evolves_to?.length; i++) {
                    // Si el Pokémon es Eevee, agregar solo la evolución inmediata
                    if ((api?.data?.chain?.species?.name === 'eevee' && idPokemon?.data?.name === api?.data?.chain?.evolves_to[i]?.species?.name)
                        || (api?.data?.chain?.species?.name === 'tyrogue' && idPokemon?.data?.name === api?.data?.chain?.evolves_to[i]?.species?.name)) {
                        const DATA2 = api?.data?.chain?.evolves_to[i]?.species;
                        const ID = DATA2?.url?.split("/");
                        const img2 = await getPokemonImagen(ID[6]);
                        arrayEvoluciones.push({
                            img: img2,
                            name: DATA2?.name,
                        });
                        break;  // Salir del bucle una vez que se encuentra la evolución
                    }
                }

                if (api?.data?.chain?.evolves_to?.length !== 0 && api?.data?.chain?.species?.name !== 'eevee') {
                    const DATA2 = api?.data?.chain?.evolves_to[0]?.species;
                    const ID = DATA2?.url?.split("/")
                    const img2 = await getPokemonImagen(ID[6])
                    arrayEvoluciones.push({
                        img: img2,
                        name: DATA2?.name,
                    })
                    if (api?.data?.chain?.evolves_to[0]?.evolves_to.length !== 0 && api?.data?.chain?.species?.name !== 'eevee') {
                        const DATA3 = api?.data?.chain?.evolves_to[0]?.evolves_to[0]?.species;
                        const ID = DATA3?.url?.split("/")
                        const img3 = await getPokemonImagen(ID[6])
                        arrayEvoluciones.push({
                            img: img3,
                            name: DATA3?.name,
                        })
                    }
                }


                setevoluciones(arrayEvoluciones);
            };

            obtEvolucion();
        }
    }, [idPokemon]);


    //ID de los pokemon para mostrar con 00
    let id = itemPokemon?.id?.toString()
    if (id?.length === 1) {
        id = "00" + id;
    } else if (id?.length === 2) {
        id = "0" + id;
    }


    return (
        <div className={css.card}>
            <img className={css.img_poke} src={itemPokemon?.sprites?.other["official-artwork"]?.front_default} alt={card.name} />
            <div className={`bg-${idPokemon?.data?.color?.name} ${css.sub_card}`}>
                <strong className={css.id_card}> #{id}  </strong>
                <strong className={css.name_card}> {itemPokemon.name}</strong>
                <h4 className={`${idPokemon?.data?.color?.name === 'yellow' ? 'bg-yellow' : ''} ${css.altura} `}> Altura: {itemPokemon?.height / 10} m</h4>
                <h4 className={css.peso}> Peso: {itemPokemon?.weight / 10} Kgs</h4>
                <h4 className={css.habitat}>Habitat: {idPokemon?.data?.habitat?.name}</h4>
                <div className={css.div_stats}>{itemPokemon?.stats?.map((sta, index) => {
                    return (<h6 key={index} className={css.item_stats}>
                        <span className={css.name}>{sta.stat.name}  </span>
                        <progress value={sta.base_stat} max={255}></progress>
                        <span className={css.numero}>  {sta.base_stat} </span>
                    </h6>);
                })}
                </div>
                <div className={css.div_type_color}>
                    {itemPokemon?.types?.map((tipo, index) => {
                        return (<h6 key={index} className={`color-${tipo.type.name} ${css.color_type}`}>
                            <span>{tipo.type.name}</span>
                        </h6>
                        )
                    })}
                </div>
                <div className={css.div_evo}>
                    {evoluciones.map((evo, index) => {
                        return (
                            <div key={index} className={css.item_evo}>
                                <img src={evo.img} alt={evo.name} className={css.img} />
                                <h6>{evo.name}</h6>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

Card.propTypes = {
    card: PropTypes.shape({
        name: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
    }).isRequired,
};