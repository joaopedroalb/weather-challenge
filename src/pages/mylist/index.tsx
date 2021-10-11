import Navbar from "../../components/Navbar";
import styles from './index.module.scss'

import {ToastContainer,toast,Zoom,Bounce} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import { useEffect, useState } from "react";
import PlaylistStore from "../../components/PlaylistStore";
import EmptyplaylistMsg from "../../components/EmptyplaylistMsg";

export default function MyList(){
    const [playlistArr,setPlaylistArr] = useState<any>([]);
    const [loading,setLoading] = useState(true)

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
    
    useEffect(()=>{
        const keys = localStorage.getItem("saveKeys")
        const arrKeys = keys?JSON.parse(keys):[]

        arrKeys.listTime.forEach((e:any) => {
            const playListOnStorage = localStorage.getItem(`playlist-${e}`)
            if(playListOnStorage){
                playlistArr.push(JSON.parse(playListOnStorage));
            }
        });
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
                                <PlaylistStore list={e} key={i} deleteToast={()=>deleteToast()}/>
                            )
                        })
                    }
                 </div>
                :
                <EmptyplaylistMsg/>
            }
            <ToastContainer/>
        </section>
    )
}