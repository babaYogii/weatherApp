import React, { useEffect, useState, useCallback } from 'react'
import { Typography, Box, Card, Grid, CardMedia, CardContent } from '@mui/material'






const MainComponent = (location) => {

  const [data, setData] = useState([]);






  console.log(location)

  const handelSearch = useCallback(async () => {
    const axios = require('axios');

    const options = {
      method: 'GET',
      url: 'https://travel-advisor.p.rapidapi.com/locations/search',
      params: {
        query: location,
        limit: '30',
        offset: '0',
        units: 'km',
        location_id: '1',
        currency: 'USD',
        sort: 'relevance',
        lang: 'en_US'
      },
      headers: {
        'X-RapidAPI-Key': '6f45ab08afmshd00259be7cf8d30p188666jsneb0539fc4f03',
        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      setData(response.data.data)
      // console.log(response)
      // console.log(response.data, "waiting for response",location);
    } catch (error) {
      console.error(error);
    }
  }, [location]);

  useEffect(() => {
    handelSearch()
  }, [location, handelSearch])
  console.log(data)


  return (
    <Grid container spacing={5}

    >


{
        data.length > 0 && data.map((place, ind) => {

          return <Grid item key={ind} xs={4}


          >
            <Card elevation={6}>
              <CardMedia style={{ height: 250 }}
                image={place.result_object.photo ? place.result_object.photo.images.large.url : "https://t3.ftcdn.net/jpg/03/24/73/92/360_F_324739203_keeq8udvv0P2h1MLYJ0GLSlTBagoXS48.jpg"}
                title={place.result_object.name}
              />
              <CardContent>
                <Typography gutterBottom variant='h5'>{place.result_object.name}</Typography>
                <Box display='flex' justifyContent='space-between'>
                  <Typography variant='subtitle1'>Rating</Typography>
                  <Typography variant='subtitle1' gutterBottom >{place.result_object.rating ? place.result_object.rating : "5.0"}</Typography>

                </Box>
              </CardContent>


            </Card>


          </Grid>
        })
      }
    </Grid>
  )
}

export default MainComponent