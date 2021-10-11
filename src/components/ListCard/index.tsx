import styles from './index.module.scss'

import { useContext } from 'react'

import { playlistContext } from '../../context/playlistContext'

export default function ListCard(){

    const {songList,genre} = useContext(playlistContext)

    function createPlaylist(){
        const horaAgora = new Date()
        const listTime = [horaAgora.getTime()]
        const numPlaylist = localStorage.length;
        const keyLocalStorage = `playlist-${horaAgora.getTime()}`
        const listSongJson = JSON.stringify({songList,genre,horaAgora,keyLocalStorage})
        
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
    }

    return(
        <section className={styles.container}>
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
            <button onClick={_=>createPlaylist()}>Adicionar playlist</button>
        </section>
    )
}