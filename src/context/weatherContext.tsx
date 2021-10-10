import React,{ createContext, useState, ReactNode, useContext } from "react";

type Weather={
    city:string;
    setCity:React.Dispatch<React.SetStateAction<string>>;
    latitude:number;
    setLatitude:React.Dispatch<React.SetStateAction<number>>;
    longitude:number;
    setLongitude:React.Dispatch<React.SetStateAction<number>>;
    temp:number;
    setTemp:React.Dispatch<React.SetStateAction<number>>;
    statusWeather:string;
    setStatusWeather:React.Dispatch<React.SetStateAction<string>>;
    description:string;
    setDesciption:React.Dispatch<React.SetStateAction<string>>;

}

export const WeatherContext = createContext({} as Weather)

type WeatherContextProviderProps = {
    children:ReactNode
}

export default function WeatherProvider({children}:WeatherContextProviderProps){

    const [city,setCity] = useState("");
    const [latitude,setLatitude] = useState(0);
    const [longitude,setLongitude] = useState(0);
    const [temp,setTemp] = useState(0);
    const [statusWeather,setStatusWeather] = useState("");
    const [description, setDesciption] = useState("");


    return(
        <WeatherContext.Provider value={{
            city,setCity,
            latitude,setLatitude,
            longitude,setLongitude,
            temp,setTemp,
            statusWeather,setStatusWeather,
            description,setDesciption,
        }}>
            {children}
        </WeatherContext.Provider>
    )
}