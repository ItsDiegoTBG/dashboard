import { Chart } from "react-google-charts";
import Paper from '@mui/material/Paper';
import React, { useEffect, useState } from 'react';

export default function WeatherChart() {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                // Realizar la solicitud de datos del clima
                let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Guayaquil&mode=xml&appid=63162f2cb9dbc8a722518d5c48390088`);
                let savedTextXML = await response.text();
    
                const parser = new DOMParser();
                const xml = parser.parseFromString(savedTextXML, "application/xml");
    
                let dataTable = [];
                let time = xml.getElementsByTagName('time');
    
                for (let i = 0; i < time.length; i++) {
                    const timeFrom = time[i].getAttribute("from");
                    const timeDo = time[i].getAttribute("to");
    
                    let temp = time[i].getElementsByTagName("temperature")[0];  
                    let valueTemp = temp.getAttribute("value");
                    let valueCelsius = parseFloat((parseFloat(valueTemp) - 273.15).toFixed(2));
    
                    let precipitation = time[i].getElementsByTagName("precipitation")[0];
                    let precipValue = parseFloat(precipitation.getAttribute("probability")) * 100;
                    
                    let windSpeed = time[i].getElementsByTagName("windSpeed")[0];
                    let windSpeedValue = parseFloat(windSpeed.getAttribute("mps"));
    
                    let humidity = time[i].getElementsByTagName("humidity")[0];
                    let humidityValue = parseFloat(humidity.getAttribute("value"));
    
                    let pressure = time[i].getElementsByTagName("pressure")[0];
                    let pressureValue = parseFloat(pressure.getAttribute("value"));
    
                    let clouds = time[i].getElementsByTagName("clouds")[0];
                    let cloudValue = parseFloat(clouds.getAttribute("all"));
    
                    // Agregar cada punto de datos como un array
                    dataTable.push([new Date(timeFrom), humidityValue, valueCelsius, windSpeedValue, cloudValue]);
                }
    
                // Agregar encabezados al inicio de los datos
                let chartDataFormatted = [['Fecha-Hora', 'Humedad (%)', 'Temperatura (°C)', 'Velocidad del viento (m/s)', 'Nubosidad']].concat(dataTable);
    
                setChartData(chartDataFormatted);
            } catch (error) {
                console.error('Error al cargar datos del clima:', error);
            }
        })();
    }, []);

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