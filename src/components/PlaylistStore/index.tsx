import { useState } from 'react'
import styles from './index.module.scss'

import Link from 'next/link'


export default function PlaylistStore(props:{list:any,deleteToast:any}){
    
    const [disableList,setDisableList] = useState(false);
    
    const titleByGenre = (genre:string) =>{
        if(genre=="Rock")
            return "O melhor do Rock"
        if(genre=="Pop")
            return "O Pop mais ouvido do momento"
        if(genre=="Classical")
            return "O bom e velho clássico"
        return "lofi hip hop beats"
    }

    const day = new Date (props.list.horaAgora).getDate();
    const month = ("00"+(new Date(props.list.horaAgora).getMonth()+1)).slice(-2);
    const year = new Date(props.list.horaAgora).getFullYear();
    const formateDate = `${day}/${month}/${year}` 

    function removerPlaylist(){
        localStorage.removeItem(props.list.keyLocalStorage)
        setDisableList(true)
        props.deleteToast();
    }

    return(
        <div className={disableList? styles.disable:styles.container}>
            <div className={styles.headerNotes}>
                <h1>{titleByGenre(props.list.genre)}</h1>
                {
                    (props.list.city)?<h2>Cidade: {props.list.city}</h2>:<></>
                }
                
                <h2>Data de criação: {formateDate}</h2>
            </div>
            <ul>
                {
                    props.list.songList.map((song:any,index:number)=>{
                        return(
                            <a href={song.songPath} key={index}>
                                <li >
                                    <img src={song.imagePath} alt="Song Image"/>
                                    <p>{index+1}. {song.title} - {song.artirst}</p>
                                </li>
                            </a>
                        )
                    })
                }
            </ul>
            <button onClick={_=>removerPlaylist()} className={styles.removeBtn}>Remover</button>
        </div>
    )
}