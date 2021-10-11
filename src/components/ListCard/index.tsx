import styles from './index.module.scss'

import {ToastContainer,toast,Zoom,Bounce} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import { useContext } from 'react'

import { playlistContext } from '../../context/playlistContext'
import { WeatherContext } from '../../context/weatherContext';

export default function ListCard(){

    const {songList,genre} = useContext(playlistContext)
    const {city} = useContext(WeatherContext)

    const sucessToast = () =>{
        toast.success('Playlist adicionada com sucesso', {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme:'colored'
            });
    }

    function createPlaylist(){
        const horaAgora = new Date()
        const listTime = [horaAgora.getTime()]
        const keyLocalStorage = `playlist-${horaAgora.getTime()}`
        const listSongJson = JSON.stringify({songList,genre,horaAgora,city,keyLocalStorage})
        
        localStorage.setItem(keyLocalStorage,listSongJson);
        if(!localStorage.getItem("saveKeys")){
            localStorage.setItem("saveKeys",JSON.stringify({listTime}));
        }else{
            let keys =localStorage.getItem("saveKeys");
            if(keys){
                let arrKeys = JSON.parse(keys)
                arrKeys.listTime.push(horaAgora.getTime())
                console.log(arrKeys.listTime)
                localStorage.setItem("saveKeys",JSON.stringify(arrKeys));
            }  
        }
        sucessToast()
    }

    return(
        <section className={styles.container}>
            <ToastContainer/>
            <ul>
                {
                    songList.map((e,i:number)=>{
                        return <li key={i}>
                                    <img src={e.imagePath} alt="album image"/>
                                    <p>{i+1}. {e.title} - {e.artirst}</p>
                                </li>
                    })
                }
            </ul>
            <button onClick={_=>createPlaylist()} className={styles.btnAdd}>Adicionar playlist</button>
        </section>
    )
}