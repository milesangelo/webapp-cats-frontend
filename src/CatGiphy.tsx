import { useEffect, useRef, useState } from 'react';
import { Box, Button, Container, Grid, ImageList, ImageListItem, Stack } from '@mui/material';
const axios = require('axios').default;

const CatGiphy = () => {
    const [caturls, setCaturls] = useState([]);
    const gotCat = useRef(false);
    const getCats = async () => {
        const url = "https://api.thecatapi.com/v1/images/search";
        axios.defaults.headers.common = {
            "X-API-Key": `${process.env.CATS_API_KEY}`,
        };

        const response = await axios.get(
            url,
            { params: { limit: 16, size: "full" } }
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
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            style={{ minHeight: '100vh' }}
        >
            <Grid item xs={3}>
                <Button variant='contained'
                    onClick={() => {
                        getCats()
                    }}>
                    Get more cats
                </Button>
            </Grid>
            <Grid >
                <ImageList sx={{ width: 800, height: 700 }} cols={2} gap={5}>
                    {caturls && caturls.map((item: { id: any; url: any; }) => (
                        <ImageListItem key={item.id} >
                            <img
                                src={`${item.url}?w=164&h=164&fit=crop&auto=format`}
                                srcSet={`${item.url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                alt={item.id}
                                loading="lazy"
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            </Grid>
        </Grid>
    )
}

export default CatGiphy