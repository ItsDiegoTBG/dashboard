import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import { useState, useEffect } from 'react';

import daytimeG from '../assets/daytimeG.jpg';
import afternoonG from '../assets/afternoonG.jpg';
import eveningG from '../assets/eveningG.jpg';
import nighttimeG from '../assets/nighttimeG.jpg';
import sun from '../assets/sun.gif';
import moon from '../assets/night.gif';


export default function Summary(){
    const [time, setTime] = useState(new Date());
    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const utcOffset = -5 * 60 * 60 * 1000*0; // SE ESTA USANDO ESTO PARA VERIFICAR
    //FUNCIONAMIENTO, MULTIPLICAR POR 0 PARA QUITAR EFECTO YA TIENE LA HORA LOCAL
    //QUITE EL CERO Y PONGA MAS O MENOS PARA VER LOS CAMBIOS SI NO QUIERE ESPERAR.
    
    const timeInUTC5 = new Date(time.getTime() + utcOffset);

    const formattedTime = timeInUTC5.toLocaleTimeString([], { hour12: false });
    const formattedDate = timeInUTC5.toLocaleDateString([], {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
    //LA SANIDAD YA SE ACABO LO QUEDA ES EL DIEGO LOCO TRABAJANDO A FULL VAPOR
    const hour = timeInUTC5.getHours();
    let timeOfDay = "";
    let currenttimepicture = null
    let currentemoji = null

   
    if (hour >= 5 && hour < 12){
        timeOfDay = 'Guayaquil: Mañana';
        currenttimepicture = daytimeG
        currentemoji = sun
    } else if (hour >= 12 && hour < 17) {
        timeOfDay = 'Guayaquil: Tarde';
        currentemoji = sun
        currenttimepicture = afternoonG
    } else if (hour >= 17 && hour < 19) {
        timeOfDay = 'Guayaquil: Atardecer';
        currenttimepicture = eveningG 
        currentemoji = sun
    } else {
        timeOfDay = 'Guayaquil: Noche';
        currenttimepicture = nighttimeG
        currentemoji = moon
    }

    return (
        <Card >
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={currenttimepicture}
                    alt="Amanecer"
                />
                <CardContent>
                    <Typography gutterBottom component="h2" variant="h6" color="primary">
                    <img src={currentemoji} alt="Image" style={{ width: 40, height: 40, marginRight: '0.5em' }}/>{timeOfDay}
                    </Typography>
                    <Typography component="p" variant="h4">
                    {formattedTime}
                    </Typography>
                    <Typography color="text.secondary" sx={{ flex: 1 }}>
                    	en {formattedDate}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}