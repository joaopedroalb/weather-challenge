import Navbar from "../../components/Navbar";
import styles from './index.module.scss'

import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import { useEffect, useState } from "react";
import PlaylistStore from "../../components/PlaylistStore";
import EmptyplaylistMsg from "../../components/EmptyplaylistMsg";

export default function MyList(){
    const [playlistArr,setPlaylistArr] = useState<any>([]);

    const deleteToast = () =>{
        toast.error('Playlist removida com sucesso', {
            position: "bottom-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme:'colored'
            });
    }

    const deleteItem = (index:number) =>{
        const lstAux = [...playlistArr]
        lstAux.splice(index,1)        
        setPlaylistArr(lstAux)
    }
    
    useEffect(()=>{
        const keys = localStorage.getItem("saveKeys")
        const arrKeys = keys?JSON.parse(keys):[]
        if(keys){
            let playlist:any = []
            arrKeys.listTime.forEach((e:any) => {
                const playListOnStorage = localStorage.getItem(`playlist-${e}`)
                if(playListOnStorage){
                    playlist.push(JSON.parse(playListOnStorage));
                }
            })
            setPlaylistArr(playlist)
        };
    },[])    

    return(
        <section className={styles.container}>
            <Navbar/>
            {
                playlistArr.length>0?
                
                (<div className={styles.listContainer}>
                    {
                        playlistArr.map((e:any,i:number)=>{
                            return(
                                <PlaylistStore list={e} key={i} deleteToast={()=>deleteToast()} deleteItem={()=>deleteItem(i)}/>
                            )
                        })
                    }
                 </div>)
                :
                <EmptyplaylistMsg/>
            }
            <ToastContainer/>
        </section>
    )
}