
import Grid from '@mui/material/Unstable_Grid2';
import './App.css'
import Indicator from './components/Indicator';
import Summary from './components/Summary';
import BasicTable from './components/BasicTable';
import WeatherChart from './components/WeatherChart';
import ControlPanel from './components/ControlPanel';
import { useEffect, useState } from 'react';



function App() {
	//https://api.openweathermap.org/data/2.5/forecast?q=Guayaquil&mode=xml&appid=63162f2cb9dbc8a722518d5c48390088

	let [indicators, setIndicators] = useState([])

		// PREGUNTAR AL PROFESOR COMO HACER BIEN LA PARTE DEL TIEMPO 
		// YA QUE COMUNMENTE SE TE DAÑA AL IMPLEMENTARLO.


	useEffect(() => {
		(async () => {

				{/* Request */}

			let API_KEY = "63162f2cb9dbc8a722518d5c48390088"
			let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Guayaquil&mode=xml&appid=${API_KEY}`)
			let savedTextXML = await response.text();

			{/* XML Parser */ }
			const parser = new DOMParser();
			const xml = parser.parseFromString(savedTextXML, "application/xml");

			//Array para poner los datos.
			let dataToIndicators = new Array()

			let nCuidad = xml.getElementsByTagName("name")[0]
			let cuidad= nCuidad.textContent	

			let location = xml.getElementsByTagName("location")[1]

			let geobaseid = location.getAttribute("geobaseid")
			dataToIndicators.push([cuidad, "geobaseid", geobaseid])

			let latitude = location.getAttribute("latitude")
			dataToIndicators.push(["Location", "Latitude", latitude])

			let longitude = location.getAttribute("longitude")
			dataToIndicators.push(["Location", "Longitude", longitude])

			console.log(dataToIndicators)

			let indicatorsElements = Array.from(dataToIndicators).map(
				(element) => <Indicator title={element[0]} subtitle={element[1]} value={element[2]} />
			)

			{/* Modificación de la variable de estado mediante la función de actualización */ }

			setIndicators(indicatorsElements)})()
		}, [])



	return (
		<Grid container spacing={5}>
			<Grid xs={12} sm={12} md={6} lg={6}><Summary></Summary></Grid>
			<Grid xs={12} sm={12} md={6} lg={6}><Summary></Summary></Grid>
			<Grid xs={6} lg={4}>

		{indicators[0]}

{/* <Indicator title='Precipitación' subtitle='Probabilidad' value={0.13} /> */}

</Grid>

<Grid xs={6} lg={4}>

{indicators[1]}

{/* <Indicator title='Precipitación' subtitle='Probabilidad' value={0.13} /> */}

</Grid>

<Grid xs={6} lg={4}>

{indicators[2]}

{/* <Indicator title='Precipitación' subtitle='Probabilidad' value={0.13} /> */}

</Grid>
			<Grid xs={12} sm={12} md={12} lg={12}><BasicTable /></Grid>
			<Grid xs={12} lg={2}><ControlPanel /></Grid>
			<Grid xs={12} lg={10}><WeatherChart></WeatherChart></Grid>
		</Grid>
	)
}

export default App

