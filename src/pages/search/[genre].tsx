import styles from './index.module.scss'

import { useContext,useEffect,useState } from 'react'

import { playlistContext } from '../../context/playlistContext'
import { WeatherContext } from '../../context/weatherContext'

import {useRouter} from 'next/router'

import axios from 'axios'

import ListCard from '../../components/ListCard'
import Navbar from '../../components/Navbar'

export default function Search(){
    
    const {chooseGenre,setSongList} = useContext(playlistContext)
    const {temp} = useContext(WeatherContext)

    const [data, setData] = useState([])

    const router = useRouter();
    const genreParams = router.query.genre;

    useEffect(()=>{
        console.log("Genero: "+genreParams)
        getData()
    },[])

    const getData = async ()  =>{ 
        setSongList([])
        chooseGenre(temp)
        const baseUrl = `https://shazam.p.rapidapi.com/search?`
        const dataAux:any = await axios.get(baseUrl,{
            headers:{
                'x-rapidapi-host':"shazam.p.rapidapi.com",
                'x-rapidapi-key':process.env.NEXT_PUBLIC_SHAZAM_KEY!=null?process.env.NEXT_PUBLIC_SHAZAM_KEY:""
            },
            params:{
                term:`${genreParams}`,
                locale:"en-US",
                offset:Math.random() * (20 - 1) + 1,
                limit:5,
            }
        }).then(resp=>resp.data);
        console.log(dataAux.tracks.hits)
        setData(dataAux.tracks.hits);
        let songListAux:any = [];
        dataAux.tracks.hits.map((e:any,i:number)=>{
            songListAux.push({title:e.track.title,artirst:e.track.subtitle,imagePath:e.track.images.coverart,songPath:e.track.share.href});
        })
        setSongList(songListAux);
    }

    return(
        <section className={styles.container}>
            <Navbar/>
            {data.length>0?
            <div>
                <h1 className={styles.title}>Para acompanhar esse clima de {Math.round(temp)}°C talvez você curta essa playlist de <strong>{genreParams}</strong></h1>
                <ListCard/>
            </div>
            
             :
             <div>Loading</div>}

        </section>
    )
}