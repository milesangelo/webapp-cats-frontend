import { useEffect, useRef, useState } from 'react';
import { Button, Container, getCardActionsUtilityClass, ImageList, ImageListItem } from '@mui/material';
const axios = require('axios').default;

const CatGiphy = () => {

    const [caturl, setCaturl] = useState('');
    const [caturls, setCaturls] = useState([]);
    const gotCat = useRef(false);
    const getCats = async () => {
        const url = "https://api.thecatapi.com/v1/images/search";
        axios.defaults.headers.common = {
            "X-API-Key": `${process.env.CATS_API_KEY}`,
        };

        const response = await axios.get(
            url,
            { params: { limit: 9, size: "full" } }
        );

        console.log(response);

        const urls = response.data.map(function (item: { id: any; url: any; }) {
            return {
                id: item.id,
                url: item.url
            }
        });

        setCaturls(urls);
    }
    useEffect(() => {
        if (!gotCat.current) {
            getCats();
            gotCat.current = true;
        }
    }, []);

    return (
        <Container maxWidth='md'>
            <Button variant='contained'
                onClick={() => {
                    getCats()
                }}
            >
                Nat wants more cats!
            </Button>
            <ImageList sx={{ width: 600, height: 700 }} cols={3} rowHeight={164}>
                {caturls && caturls.map((item: { id: any; url: any; }) => (
                    <ImageListItem key={item.id}>
                        <img
                            src={`${item.url}?w=164&h=164&fit=crop&auto=format`}
                            srcSet={`${item.url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                            alt={item.id}
                            loading="lazy"
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        </Container>
    )
}


export default CatGiphy