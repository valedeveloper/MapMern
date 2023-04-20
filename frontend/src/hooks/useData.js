import {useState, useEffect } from "react";
import {getData} from "../services/getData"
export const useData=({keyword})=>{

    const [location, setLocation] = useState();

    const getPins = (keyword) => {
        getData({keyword}).then(pins=>setLocation(pins))
    };

    useEffect(getPins(keyword),[])
    return {
        location
    }
}