
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';


export default function BasicTable() {

  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {

    (async () => {

        {/* Request */ }

        let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Guayaquil&mode=xml&appid=63162f2cb9dbc8a722518d5c48390088`)
			  let savedTextXML = await response.text();

        const parser = new DOMParser();
        const xml = parser.parseFromString(savedTextXML, "application/xml");
        let dataTable = new Array()
        let time = xml.getElementsByTagName('time');

        for (let i = 0; i < time.length; i++) {
            const timeFrom = time[i].getAttribute("from")
            const timeDo = time[i].getAttribute("to")

            //temperatura, precipitación, viento, humedad, presión atmosférica y nubosidad

            let temp= time[i].getElementsByTagName("temperature")[0]  
            let valueTemp = temp.getAttribute("value")

            let valueCelsius = `${parseFloat((parseFloat(valueTemp) - 273.15).toFixed(2))}°C`;
            let precipitation = time[i].getElementsByTagName("precipitation")[0]
            let precipValue = precipitation.getAttribute("value")
            
            let windSpeed = time[i].getElementsByTagName("windSpeed")[0]
            let windSpeedValue = windSpeed.getAttribute("mps")

            let humidity = time[i].getElementsByTagName("humidity")[0]
            let humidityValue = humidity.getAttribute("value")

            let pressure = time[i].getElementsByTagName("pressure")[0]
            let pressureValue = pressure.getAttribute("value")

            let clouds = time[i].getElementsByTagName("clouds")[0]
            let cloudValue = clouds.getAttribute("value")
            dataTable.push({ timeFrom, timeDo, valueCelsius,precipValue,windSpeedValue, humidityValue, pressureValue, cloudValue})
        }
        setWeatherData(dataTable);
    })()
}, [])

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell>Hora (desde)</TableCell>
          <TableCell>Hora (hasta)</TableCell>
          <TableCell align="center">Temperatura (°C)</TableCell>
          <TableCell align="center">Precipicación (%)</TableCell>
          <TableCell align="center">Velocidad del Viento (m/s)</TableCell>
          <TableCell align="center">Humedad (%)</TableCell>
          <TableCell align="center">Presión (hPa)</TableCell>
          <TableCell align="center">Nubosidad</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {weatherData.map((row,index) => (
            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">{row.timeFrom}</TableCell>
              <TableCell component="th" scope="row">{row.timeDo}</TableCell>
              <TableCell align="right">{row.valueCelsius}</TableCell>
              <TableCell align="right">{row.precipValue}</TableCell>  
              <TableCell align="right">{row.windSpeedValue}</TableCell>
              <TableCell align="right">{row.humidityValue}</TableCell>
              <TableCell align="right">{row.pressureValue}</TableCell>
              <TableCell align="right">{row.cloudValue}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}