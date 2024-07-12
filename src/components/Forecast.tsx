import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

interface Config {
    imageUrl?: string;
    date?:String;
    from?: String;
    temp?:Number;
    cloud?: String;
    precipitation?: Number;
    humidity?: Number;
}

export default function Indicator(config: Config) {
	return (
        <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center', 
              textAlign: 'center',
            }}
          >
            
            {config.imageUrl && (
                <img src={config.imageUrl} alt="Weather Icon" style={{ width: '50px', height: '50px', borderRadius: '50%' }}/>
                )}
            <Typography component="h6" variant="h6" color="primary" gutterBottom>
                Fecha: {config.date} 
            </Typography>
            <Typography component="p" variant="h6">
                Hora: {config.from}
            </Typography>
            <Typography component="h6" variant="h6">
                Temperatura: {config.temp.toString()}
            </Typography>
            <Typography component="h6" variant="h6" color="primary" gutterBottom>
                Nubosidad: {config.cloud} 
            </Typography>
            <Typography component="p" variant="h6">
                Precipitacion: {config.precipitation.toString()}
            </Typography>
            <Typography component="h6" variant="h6">
                Humedad:{config.humidity.toString()}
            </Typography>
        </Paper> 
    )
}