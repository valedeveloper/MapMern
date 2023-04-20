import {useState, useEffect } from "react";
import {getData} from "../services/getData"
export const useData=({keyword})=>{

    const [location, setLocation] = useState();


    const getPins = (keyword) => {
        getData({keyword}).then(pins=>setLocation(pins))
    };

    const postPin= ({keyword,method,entries})=>{ 
         getData({keyword,method,entries})
    }

    useEffect(getPins(keyword),[])
    return {
        location,
        postPin
    }
}