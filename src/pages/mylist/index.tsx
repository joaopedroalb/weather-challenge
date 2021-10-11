import Navbar from "../../components/Navbar";
import styles from './index.module.scss'

import { useEffect, useState } from "react";
import PlaylistStore from "../../components/PlaylistStore";
import EmptyplaylistMsg from "../../components/EmptyplaylistMsg";

export default function MyList(){
    const [playlistArr,setPlaylistArr] = useState<any>([]);
    const [loading,setLoading] = useState(true)
    
    useEffect(()=>{
        const tamanho = localStorage.length
        for(let i:number = 0; i<tamanho; i++){
            const playListOnStorage = localStorage.getItem(`playlist-${i}`)
            if(playListOnStorage){
                playlistArr.push(JSON.parse(playListOnStorage));
            }
            
        }
        setLoading(false)
    },[])    

    return(
        <section className={styles.container}>
            <Navbar/>
            {
                playlistArr.length>0?
                
                <div className={styles.listContainer}>
                    {
                        playlistArr.map((e:any,i:number)=>{
                            return(
                                <PlaylistStore list={e} key={i} />
                            )
                        })
                    }
                 </div>
                :
                <EmptyplaylistMsg/>
            }
            
        </section>
    )
}