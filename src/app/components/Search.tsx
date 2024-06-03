'use client'

import { Autocomplete, TextField } from "@mui/material";
import { red } from "@mui/material/colors";
import { url } from "inspector";
import { useEffect, useState } from "react";

type Busca = [{
    "lat": string,
    "lon": string
    "display_name": string
}]

export default function Search() {
    const searchImagem = require('../../../public/assets/searchfundo.jpeg')
    const [pesquisa, setPesquisa] = useState('')
    const [options, setOptions] = useState([{
        "label": '',
        "lat": '',
        "lon": ''
    }])

    useEffect(() => {
        fetch(`https://nominatim.openstreetmap.org/search?q="${pesquisa}"&format=json`).then(async (resp) => {
            const resp2: Busca = await resp.json()
            const resp3 = resp2.map((i) => {
                return {
                    "label": i.display_name,
                    "lat": i.lat,
                    "lon": i.lon
                }

            })
            setOptions(resp3)
        })
    },[pesquisa])
    return (
        <div>
            {/* <TextField onChange={(e) => { setPesquisa(e.target.value) }} id="outlined-basic" label="Outlined" variant="outlined" />*/}
            <Autocomplete className="mb-10 rounded-xl" style={{backgroundColor:'lightblue', color:'black'}}
            onChange={(e,v)=>{document.location.href=`/?lat=${v?.lat}&lon=${v?.lon}`}}
                disablePortal
                id="combo-box-demo"
                options={options}
                sx={{ width: 300,color:red, backgroundColor:red
                }}
                renderInput={(params) => <TextField onChange={(e)=>setPesquisa(e.target.value)}{...params} label="Movie" />}
            />
        </div>


    )
}