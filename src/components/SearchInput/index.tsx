import { useState,useContext,useEffect } from 'react'
import styles from './index.module.scss'

import { WeatherContext } from '../../context/weatherContext'
import { playlistContext } from '../../context/playlistContext'

import axios from 'axios'


import {useRouter} from 'next/router'

export default function SearchInput(){

    const {city,temp,setCity,latitude,setLatitude,longitude,setLongitude,setTemp,setDesciption,setStatusWeather} = useContext(WeatherContext)
    const {chooseGenre} = useContext(playlistContext)
    const [filter,setFilter] = useState(0)

    const router = useRouter();

    function onChangeOption(value:number){
        if(value==0){
            setFilter(value);
            setLongitude(0);
            setLatitude(0);
        }
        if(value==1){
            setFilter(value)
            setCity("");
        }
    }

    function onClickSearch(){
        if(filter ==0)
            searchFilterByCity()

        if(filter==1)
            searchFilterByLatLong()
    }

    const searchFilterByCity = async () =>{
        if(city!=""){
            const baseUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_WHEATHER_KEY}&units=metric`
            const data:any = await axios.get(baseUrl).then(resp=>resp.data);
            setTemp(data.main.temp);
            setStatusWeather(data.weather[0].main);
            setDesciption(data.weather[0].description);
            router.push(`/search/${chooseGenre(data.main.temp)}`);
            
        }
    }

    const searchFilterByLatLong = async () =>{
        if(latitude!=0 &&longitude!=0){
            const baseUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.NEXT_PUBLIC_WHEATHER_KEY}&units=metric`
            const data:any = await axios.get(baseUrl).then(resp=>resp.data);
            setTemp(data.main.temp);
            setStatusWeather(data.weather[0].main);
            setDesciption(data.weather[0].description);
            router.push(`/search/${chooseGenre(temp)}`);
        }
    }

    return(
        <section className={styles.container}>
            <header>
                <h2>Escolha como deseja pesquisar</h2>
            </header>
            <div className={styles.inputContainer}>
                <select onChange={e=>onChangeOption(+e.target.value)}>
                    <option value={0}>Cidade</option>
                    <option value={1}>Latitude e Longitude</option>
                </select>
                {filter==0?
                <input type="text" placeholder="Nome da cidade" className={styles.cityInput} onChange={e=>setCity(e.target.value)}/>:
                <div className={styles.doubleInputContainer}>
                    <input type="number" placeholder="Latitude" className={styles.doubleInputs} onChange={e=>setLatitude(e.target.valueAsNumber)}/>
                    <input type="number" placeholder="Longitude" className={styles.doubleInputs} onChange={e=>setLongitude(e.target.valueAsNumber)}/>
                </div>
                }
                
                <button onClick={_=>onClickSearch()}>Pesquisar</button>

                
            </div>
        </section>
    )
}