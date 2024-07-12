
import Grid from '@mui/material/Unstable_Grid2';
import './App.css'
import Indicator from './components/Indicator';
import Summary from './components/Summary';
import BasicTable from './components/BasicTable';
import WeatherChart from './components/WeatherChart';
import ControlPanel from './components/ControlPanel';
import { useEffect, useState } from 'react';
import morningBackground from "./resources/daybackground.gif";
import nightBackground from "./resources/nightbackground2.gif";
import sunupdownBackground from "./resources/dawnbackground.gif";
import sun from "./resources/sun.gif";
import suncloud from "./resources/sun.gif";
import sunrain from "./resources/sun.gif";
import moon from "./resources/sun.gif";
import mooncloud from "./resources/sun.gif";
import moonrain from "./resources/sun.gif";

//Imports de imagenes max 10

function App() {
	//https://api.openweathermap.org/data/2.5/forecast?q=Guayaquil&mode=xml&appid=63162f2cb9dbc8a722518d5c48390088

	let [indicators, setIndicators] = useState([])
	let [backgroundStyle, setBackgroundStyle] = useState({});
	let [icon, setIcon] = useState('');
	 {/* 1. Sirven de comunicación entre Control Panel y WeatherChart */}
	 const [tunnel, setTunnel] = useState("")

	const getCurrentHour = () => {
		return new Date().getHours();
	  };

	  const setBackgroundAndIconBasedOnTime = () => {
		const currentHour = getCurrentHour();
		const morningStart = 6; // Cambiar el fondo a las 6am
		const eveningEnd = 18;  // Cambiar el fondo a las 6pm
	
		// Definir fondos e iconos para la mañana y la tarde
		
	
		// Establecer el estilo del fondo y el icono según la hora actual
		if (currentHour >= morningStart && currentHour < eveningEnd) {
		  setBackgroundStyle(morningBackground);
		  setIcon(sun);
		} else {
		  setBackgroundStyle(nightBackground);
		  setIcon(moon);
		}
	  };


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

			setIndicators(indicatorsElements)
			setBackgroundAndIconBasedOnTime();
		})()
		}, [])



	return (
		<Grid container spacing={5}>
			<Grid xs={12} sm={12} md={6} lg={6}><Summary></Summary></Grid>
			<Grid xs={12} sm={12} md={6} lg={6}><Summary></Summary></Grid>
			<Grid xs={6} lg={4}>{indicators[0]}</Grid>
			<Grid xs={6} lg={4}>{indicators[1]}</Grid>
			<Grid xs={6} lg={4}>{indicators[2]}</Grid>
			<Grid xs={12} lg={2}><ControlPanel  /></Grid>
			<Grid xs={12} lg={10}><WeatherChart ></WeatherChart></Grid>
			<Grid xs={12} sm={12} md={12} lg={12}><BasicTable /></Grid>

		</Grid>
	)
}

export default App

