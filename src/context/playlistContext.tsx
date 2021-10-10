import React,{ createContext, useState, ReactNode, useContext } from "react";

type Song = {
    title:string;
    artirst:string;
    imagePath:string;

}

type Playlist = {
    genre:string;
    setGenre:React.Dispatch<React.SetStateAction<string>>;
    songList: Song[]
    setSongList:React.Dispatch<React.SetStateAction<Song[]>>;
    createDate: Date
    setCreateDate:React.Dispatch<React.SetStateAction<Date>>;
    chooseGenre: (temp:number)=>string
    addSong:(song:Song)=>void
}

export const playlistContext = createContext({} as Playlist)

type PlaylistContextProviderProps = {
    children:ReactNode
}

export default function PlaylistProvider({children}:PlaylistContextProviderProps){
    const [genre,setGenre] = useState("");
    const [songList,setSongList] = useState<Song[]>([])
    const [createDate,setCreateDate] = useState(new Date())

    function addSong(song:Song){
        setSongList([song,...songList])
    }

    function chooseGenre(temp:number){
        if(temp>=32){
            setGenre("Rock")
            return "rock"
        }
            

        if(temp<32 && temp>=24){
            setGenre("Pop")
            return "Pop"
        }
            

        if(temp<24 && temp>=16){
            setGenre("Classical")
            return "Classical"
        }
            

        if(temp<16){
            setGenre("lofi hip-hop")
            return "lofi hip-hop"
        }
            
        return "";
    }
    
    return(
        <playlistContext.Provider value={{
            genre,setGenre,
            songList,setSongList,
            createDate,setCreateDate,
            chooseGenre,
            addSong
        }}>
            {children}
        </playlistContext.Provider>
    )
}

