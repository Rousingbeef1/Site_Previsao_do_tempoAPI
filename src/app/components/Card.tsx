'use client'

import { useEffect, useState } from "react"
import Image from 'next/image'
import { useSearchParams } from "next/navigation"

type Previsao = {
    "name": string,
    "sys": {
        "country": string
    },
    "main": {
        "temp": number
    },

    "weather": [{
        "description": string,
        "icon": string
    }]

}
export default function Card() {
    const [dados, setDados] = useState<Previsao>()
    const latitude = useSearchParams().get('lat')
    const longitude = useSearchParams().get('lon')
    console.log(latitude,longitude)
    useEffect(() => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude === null ? '2.8208478' : latitude}&lon=${longitude === null ? '-60.6719582' : longitude}&appid=ad160cd2eefe1e8064d68c16bbef6791&lang=pt_br&units=metric`).then(async (resp) => {
            const resp2 = await resp.json()
            console.log(resp2)
            setDados(resp2)
        })

    }, [])
    return (

        <div className='rounded-xl relative flex flex-col items-start w-80 h-96 bg-[url(/assets/fundoCard.jpeg)] bg-cover p-6 font-' style={{ color: '#212121' }} >
            <p>Localidade:<span>{dados?.name} - {dados?.sys?.country}</span></p>
            <p>Temperatura:<span>{dados?.main?.temp}</span></p>
            {dados?.weather != undefined && (
                <>
                    <p>Clima: <span>{dados?.weather[0]?.description}</span></p>
                    <img className="absolute top-3 right-1" width={60} height={60} src={`http://openweathermap.org/img/w/${dados?.weather[0].icon}.png`} alt="clima" />
                </>
            )}
        </div>
    )
}