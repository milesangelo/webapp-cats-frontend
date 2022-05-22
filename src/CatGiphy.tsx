import { useEffect, useRef, useState } from 'react';
const axios = require('axios').default;

const CatGiphy = () => {

    const [caturl, setCaturl] = useState('');
    const gotCat = useRef(false);

    useEffect(() => {
        const getCats = async () => {
            const url = "https://api.thecatapi.com/v1/images/search";
            axios.defaults.headers.common = {
                "X-API-Key": `${process.env.CATS_API_KEY}`,
            };

            const response = await axios.get(
                url,
                { params: { limit: 1, size: "full" } }
            );

            console.log(response.data[0].id);
            console.log(response.data[0].url);
            setCaturl(response.data[0].url);
        }
        if (!gotCat.current){
            getCats();
            gotCat.current = true;
        }
    }, []);

    return (
        <div>
        <div></div>
        <img src={caturl || ''} width="400" height={ 400}></img> 
        </div>
    )
}


export default CatGiphy