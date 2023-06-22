import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { Button, FormControlLabel, FormGroup, Box, Switch } from '@mui/material'
import MainComponent from './Component/MainComponent'

function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  const [farenhite, setFarenhite] = useState(true);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=895284fb2d2c50a520ea537456963d9c`
  const url1 = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=895284fb2d2c50a520ea537456963d9c`

  const searchLocation = useCallback((event) => {
    try {
      if (farenhite) {
        axios.get(url).then((response) => {
          setData(response.data)
          console.log(response.data)
          return response.data;
        })
      } else {
        axios.get(url1).then((response) => {
          setData(response.data)
          console.log(response.data)
          return response.data;
        })
      }
      
    }
    catch (error) {
      return error;
    }

  },[farenhite,url,url1])


  useEffect(() => {
    searchLocation()
  }, [location,searchLocation])

  console.log(data.coord)

  const handelChange = () => {
    setFarenhite(!farenhite);
  }

  return (

    
    <div className="app">
    
    <div className="search">
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          placeholder='Enter Location'
          type="text" />

        <Button onClick={searchLocation} variant='contained' 
        sx={{marginX:'20px',background:'rgba(255,255,255, 0.1);'
        ,borderRadius:'12px'
        ,"&:hover": {backgroundColor: "rgba(255,255,255, 0.1);",border:"0.5px solid yellow"}
      
      }}>Get Details</Button>

      </div>



     <Box display='flex'>

     
        <Box flex='1' minHeight={500}>

        
          { data &&
        <FormGroup sx={{alignContent:'center'}}>
          <FormControlLabel

            control={<Switch
              checked={farenhite}
              onChange={handelChange}
            />}

            label={farenhite ? "Farenhite" : "Degree"}

          />
        </FormGroup>
}

      {farenhite ?
        <div className="container">
          <div className="top">
            <div className="location">
              <p>{data.name}</p>
            </div>
            <div className="temp">
              {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
            </div>
            <div className="description">
              {data.weather ? <p>{data.weather[0].main}</p> : null}
            </div>
          </div>

          {data.name !== undefined &&
            <div className="bottom">
              <div className="feels">
                {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°F</p> : null}
                <p>Feels Like</p>
              </div>
              <div className="humidity">
                {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
                <p>Humidity</p>
              </div>
              <div className="wind">
                {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
                <p>Wind Speed</p>
              </div>
            </div>
          }
        </div> :
        <div className="container">
          <div className="top">
            <div className="location">
              <p>{data.name}</p>
            </div>
            <div className="temp">
              {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
            </div>
            <div className="description">
              {data.weather ? <p>{data.weather[0].main}</p> : null}
            </div>
          </div>

          {data.name !== undefined &&
            <div className="bottom">
              <div className="feels">
                {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°C</p> : null}
                <p>Feels Like</p>
              </div>
              <div className="humidity">
                {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
                <p>Humidity</p>
              </div>
              <div className="wind">
                {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
                <p>Wind Speed</p>
              </div>
            </div>
          }
        </div>}

        </Box>

        <Box sx={{backgroundColor:"black",border:'2px solid red', height:'100%'}} flex='3'>

                      
            <MainComponent location={location}/>
        
         </Box>

      </Box>
      
      
    </div>
  );
}

export default App;
