import { Chart } from "react-google-charts";
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';

export default function WeatherChart({ selectedVariable }) {
    const [chartData, setChartData] = useState([]);
    let TempData=[]
    let WSpeedData=[]
    let HumidityData=[]
    let CloudData=[]
    useEffect(() => {
        (async () => {
            try {
                console.log(selectedVariable)
                // Realizar la solicitud de datos del clima
                let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Guayaquil&mode=xml&appid=63162f2cb9dbc8a722518d5c48390088`);
                let savedTextXML = await response.text();
                const parser = new DOMParser();
                const xml = parser.parseFromString(savedTextXML, "application/xml");
                let dataTable = [];
                let time = xml.getElementsByTagName('time');

                for (let i = 0; i < time.length; i++) {
                    const timeFrom = time[i].getAttribute("from");
                    let temp = time[i].getElementsByTagName("temperature")[0];  
                    let valueTemp = temp.getAttribute("value");
                    let valueCelsius = parseFloat((parseFloat(valueTemp) - 273.15).toFixed(2));        
                    TempData.push([new Date(timeFrom),valueCelsius]);            
                    let windSpeed = time[i].getElementsByTagName("windSpeed")[0];
                    let windSpeedValue = parseFloat(windSpeed.getAttribute("mps"));
                    WSpeedData.push([new Date(timeFrom),windSpeedValue]);
                    let humidity = time[i].getElementsByTagName("humidity")[0];
                    let humidityValue = parseFloat(humidity.getAttribute("value"));
                    HumidityData.push([new Date(timeFrom),humidityValue]);
                    let clouds = time[i].getElementsByTagName("clouds")[0];
                    let cloudValue = parseFloat(clouds.getAttribute("all"));
                    CloudData.push([new Date(timeFrom),cloudValue])
                    // Agregar cada punto de datos como un array
                    dataTable.push([new Date(timeFrom), humidityValue, valueCelsius, windSpeedValue, cloudValue]);
                }
                // Agregar encabezados al inicio de los datos
                switch(selectedVariable){
                    case -1:                      
                        setChartData([['Fecha-Hora', 'Humedad (%)', 'Temperatura (°C)', 'Velocidad del viento (m/s)', 'Nubosidad']].concat(dataTable));
                        break;
                    case 0:
                        setChartData([['Fecha-Hora', 'Humedad (%)']].concat(HumidityData));
                        break;
                    case 1:
                        setChartData([['Fecha-Hora', 'Nubosidad']].concat(CloudData));
                        break;
                     case 2:
                        setChartData([['Fecha-Hora', 'Velocidad del viento (m/s)']].concat(WSpeedData));
                        break;
                    case 3:
                        setChartData([['Fecha-Hora', 'Temperatura (°C)']].concat(TempData));
                        break;
                    default:
                        break;
                }
            } catch (error) {
                console.error('Error al cargar datos del clima:', error);
            }
        })();
    },[selectedVariable]);
    

    // Configuración de opciones para el gráfico
    let options = {
        title: "Precipitación, Humedad, Nubosidad, Temperatura, Velocidad de Viento vs Hora",
        curveType: "function",
        legend: { position: "right" },
        hAxis: {
            format: 'dd/MM/yyyy HH:mm', // Formato de fecha/hora en el eje x
        }
    };

    return (
        <Paper
            sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <Chart
                chartType="LineChart"
                data={chartData}
                width="100%"
                height="400px"
                options={options}
            />
        </Paper>
    );
}