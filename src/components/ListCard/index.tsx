import styles from './index.module.scss'

import { useContext } from 'react'

import { playlistContext } from '../../context/playlistContext'

export default function ListCard(){

    const {songList,genre} = useContext(playlistContext)

    function createPlaylist(){
        const horaAgora = new Date()
        const numPlaylist = localStorage.length;
        const keyLocalStorage = `playlist-${numPlaylist}`
        const listSongJson = JSON.stringify({songList,genre,horaAgora,keyLocalStorage})
        
        localStorage.setItem(keyLocalStorage,listSongJson);
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