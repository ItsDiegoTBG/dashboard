
import Grid from '@mui/material/Unstable_Grid2';
import './App.css'
import Indicator from './components/Indicator';
import Summary from './components/Summary';
import BasicTable from './components/BasicTable';
import WeatherChart from './components/WeatherChart';
import ControlPanel from './components/ControlPanel';
import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import sun from '../src/assets/sun.gif';
import moon from '../src/assets/night.gif';

function App() {
	//https://api.openweathermap.org/data/2.5/forecast?q=Guayaquil&mode=xml&appid=63162f2cb9dbc8a722518d5c48390088

	let [indicators, setIndicators] = useState([])
	const [selectedVariable, setSelectedVariable] = useState(-1);

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

			let altitude = location.getAttribute("altitude")
			dataToIndicators.push(["Altitude Sea Level", cuidad, altitude])

			let latitude = location.getAttribute("latitude")
			dataToIndicators.push(["Latitude", cuidad, latitude])

			let longitude = location.getAttribute("longitude")
			dataToIndicators.push(["Longitude", cuidad, longitude])

			console.log(dataToIndicators)

			let indicatorsElements = Array.from(dataToIndicators).map(
				(element) => <Indicator title={element[0]} subtitle={element[1]} value={element[2]} />
			)

			{/* Modificación de la variable de estado mediante la función de actualización */ }

			setIndicators(indicatorsElements)
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
                    <Typography variant="h5" gutterBottom>
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

			
			<Grid xs={12} lg={12}><Box bgcolor="lightblue" p={2} borderRadius={4}>
                    <Typography variant="h4" gutterBottom>
                        Grafica del Clima
                    </Typography><ControlPanel setSelectedVariable={setSelectedVariable} /><WeatherChart selectedVariable={selectedVariable} />
             </Box></Grid>
			<Grid xs={12} sm={12} md={12} lg={12}><Box bgcolor="lightblue" p={2} borderRadius={4}>
                    <Typography variant="h5" gutterBottom>
					Tabla de Comparacion
                    </Typography><BasicTable />
             </Box></Grid>
		</Grid>
	)
}

export default App

