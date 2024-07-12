
import Grid from '@mui/material/Unstable_Grid2';
import './App.css'
import Indicator from './components/Indicator';
import Summary from './components/Summary';
import BasicTable from './components/BasicTable';
import WeatherChart from './components/WeatherChart';
import ControlPanel from './components/ControlPanel';
import Forecast from './components/Forecast'
import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import sun from '../src/assets/sun.gif';
import moon from '../src/assets/night.gif';
import night from '../src/assets/night (1).gif'
import rainy from '../src/assets/weather.gif'
import cloudy from '../src/assets/cloudy.gif'

function App() {
	//https://api.openweathermap.org/data/2.5/forecast?q=Guayaquil&mode=xml&appid=63162f2cb9dbc8a722518d5c48390088

	let [indicators, setIndicators] = useState([])
	const [selectedVariable, setSelectedVariable] = useState(-1);
	let [forecasts, setForecasts] = useState([])
	useEffect(() => {
		(async () => {

				{/* Request */}

			let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Guayaquil&mode=xml&appid=63162f2cb9dbc8a722518d5c48390088`)
			let savedTextXML = await response.text();

			{/* XML Parser */ }
			const parser = new DOMParser();
			const xml = parser.parseFromString(savedTextXML, "application/xml");

			//Array para poner los datos.
			let dataToIndicators = new Array()
			let dataToForecast = []
			let nCuidad = xml.getElementsByTagName("name")[0]
			let cuidad= nCuidad.textContent	

			let location = xml.getElementsByTagName("location")[1]

			let altitude = location.getAttribute("altitude")
			dataToIndicators.push(["Altitude Sea Level", cuidad, altitude])

			let latitude = location.getAttribute("latitude")
			dataToIndicators.push(["Latitude", cuidad, latitude])

			let longitude = location.getAttribute("longitude")
			dataToIndicators.push(["Longitude", cuidad, longitude])
			let time = xml.getElementsByTagName('time');

			for (let i = 0; i < time.length; i++) {
				const timeFrom = time[i].getAttribute("from")
				const fechaActual = new Date();
				const diaSiguiente = new Date();
				diaSiguiente.setDate(fechaActual.getDate() + 1);
				const formattedTime = new Date(timeFrom);
				const formattedDate = new Date(timeFrom).toLocaleDateString([], {
					weekday: 'long',
					year: 'numeric',
					month: 'long',
					day: 'numeric',
				});
		
				

				if((formattedTime.getDate() === diaSiguiente.getDate()) &&
				(formattedTime.getHours() === 6 || formattedTime.getHours() === 12 || formattedTime.getHours() === 18)){
					console.log(formattedTime)
				//temperatura, precipitación, viento, humedad, presión atmosférica y nubosidad
				let iconToUse = null
				let FRTime = new Date(timeFrom).toLocaleTimeString([], { hour12: false });
				let timetoUse=formattedDate
				console.log(timetoUse)
				let temp= time[i].getElementsByTagName("temperature")[0]  
				let valueTemp = temp.getAttribute("value")
				let valueCelsius = `${parseFloat((parseFloat(valueTemp) - 273.15).toFixed(2))}°C`;
				
				let precipitation = time[i].getElementsByTagName("precipitation")[0]
				let precipValue = (parseFloat(precipitation.getAttribute("probability"))*100).toFixed(2)+"%"

				let humidity = time[i].getElementsByTagName("humidity")[0]
				let humidityValue = humidity.getAttribute("value")
				
				let clouds = time[i].getElementsByTagName("clouds")[0]
				let cloudValue = clouds.getAttribute("value")

				if (formattedTime.getHours() === 6 ){
					iconToUse=sun
				}
				if (formattedTime.getHours() === 6 && (cloudValue === "overcast clouds" || cloudValue === "broken clouds")){
					iconToUse=cloudy
				}
				if (formattedTime.getHours() === 6 && (cloudValue === "overcast clouds" || cloudValue === "broken clouds" && precipValue === "5.00%")){
					iconToUse=rainy
				}
				if(formattedTime.getHours() === 12 ){
					iconToUse=sun
				}
				if(formattedTime.getHours() === 12 && (cloudValue === "overcast clouds" || cloudValue === "broken clouds")){
					iconToUse=cloudy
				}
				if(formattedTime.getHours() === 12 && (cloudValue === "overcast clouds" || cloudValue === "broken clouds" && precipValue === "5.00%")){
					iconToUse=rainy
				}
				if(formattedTime.getHours() === 18){ 
					iconToUse=night
				}
				if(formattedTime.getHours() === 18 && (cloudValue === "overcast clouds" || cloudValue === "broken clouds")){ 
					iconToUse=moon
				}
				if(formattedTime.getHours() === 18 && (cloudValue === "overcast clouds" || cloudValue === "broken clouds") && precipValue === "5.00%"){ 
					iconToUse=moon
				}

				
				dataToForecast.push([iconToUse,timetoUse,FRTime,valueCelsius,precipValue,humidityValue,cloudValue])
				}

			}

			console.log(dataToIndicators)
			console.log(dataToForecast)
			let indicatorsElements = Array.from(dataToIndicators).map(
				(element) => <Indicator title={element[0]} subtitle={element[1]} value={element[2]} />
			)
			let ForecastElements = Array.from(dataToForecast).map(
				(element) => <Forecast imageUrl={element[0]} date={element[1]} from={element[2]} temp={element[3]} 
				precipitation={element[4]} humidity={element[5]} cloud={element[6]}
				/>
			)

			/* imageUrl?: string;
    date?:String;
    from?: String;
    temp?:Number;
    cloud?: String;
    precipitation?: Number;
    humidity?: Number;*/


			{/* Modificación de la variable de estado mediante la función de actualización */ }

			setIndicators(indicatorsElements)
			setForecasts(ForecastElements)
		})()
		}, [])



	return (
		<Grid container spacing={5}>
			 <Grid xs={12} sm={12} md={12} lg={12}><Box bgcolor="white" p={2} borderRadius={4}>
                    <Typography variant="h3" gutterBottom style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 'bold' }} >
					<img src={sun} alt="Image" style={{ width: 60, height: 60, marginRight: '0.5em', borderRadius: '50%' }}/>Weather Planner
					<img src={moon} alt="Image" style={{ width: 60, height: 60, marginLeft: '0.5em', borderRadius: '50%' }} /> 
                    </Typography>
             </Box></Grid>
			<Grid xs={12} sm={12} md={12} lg={12}><Box bgcolor="lightblue" p={2} borderRadius={4}>
                    <Typography variant="h5" gutterBottom style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 'bold' }}>
                        Current Time
                    </Typography><Summary></Summary>
             </Box></Grid>
			 
			<Grid xs={6} lg={4}><Box bgcolor="lightblue" p={2} borderRadius={4}>
			{indicators[0]}
             </Box></Grid>
			<Grid xs={6} lg={4}><Box bgcolor="lightblue" p={2} borderRadius={4}>
			{indicators[1]}
             </Box></Grid>
			<Grid xs={6} lg={4}><Box bgcolor="lightblue" p={2} borderRadius={4}>
			{indicators[2]}
             </Box></Grid>

		<Grid xs={12} sm={12} md={12} lg={12}>
        <Box bgcolor="lightblue" p={2} borderRadius={4}>
          <Typography variant="h4" gutterBottom style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 'bold' }}>
            Pronóstico
          </Typography>
        </Box></Grid>
		<Grid xs={6} lg={4}><Box bgcolor="lightblue" p={2} borderRadius={4}>
			{forecasts[0]}
             </Box></Grid>
			<Grid xs={6} lg={4}><Box bgcolor="lightblue" p={2} borderRadius={4}>
			{forecasts[1]}
             </Box></Grid>
			<Grid xs={6} lg={4}><Box bgcolor="lightblue" p={2} borderRadius={4}>
			{forecasts[2]}
             </Box></Grid>

			 
			
			<Grid xs={12} lg={12}><Box bgcolor="lightblue" p={2} borderRadius={4}>
                    <Typography variant="h4" gutterBottom style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 'bold' }}>
                        Grafica del Clima
                    </Typography><ControlPanel setSelectedVariable={setSelectedVariable} /><WeatherChart selectedVariable={selectedVariable} />
             </Box></Grid>
			<Grid xs={12} sm={12} md={12} lg={12}><Box bgcolor="lightblue" p={2} borderRadius={4}>
                    <Typography variant="h4" gutterBottom style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 'bold' }}>
					Tabla de Comparacion
                    </Typography><BasicTable />
             </Box></Grid>
		</Grid>
	)
}

export default App

