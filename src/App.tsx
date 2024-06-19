
import Grid from '@mui/material/Unstable_Grid2';
import './App.css'
import Indicator from './components/Indicator';
import Summary from './components/Summary';
import BasicTable from './components/BasicTable';

function App() {
//https://api.openweathermap.org/data/2.5/forecast?q=Guayaquil&mode=xml&appid=63162f2cb9dbc8a722518d5c48390088

	return (
	  <Grid container spacing={5}>
		  
	      <Grid xs={12} sm={12} md={12} lg={12}><Indicator title='Precipitación' subtitle='Probabilidad' value={0.13} /></Grid>
		  
	      <Grid xs={12} sm={12} md={6} lg={6}><Summary></Summary></Grid>
	      <Grid xs={12} sm={12} md={6} lg={6}><Summary></Summary></Grid>
	      <Grid xs={12} sm={12} md={6} lg={4}><Indicator title='Precipitación' subtitle='Probabilidad' value={0.13} /></Grid>
	      <Grid xs={12} sm={12} md={6} lg={4}><Indicator title='Precipitación' subtitle='Probabilidad' value={0.13} /></Grid>
	      <Grid xs={12} sm={12} md={12} lg={4}><Indicator title='Precipitación' subtitle='Probabilidad' value={0.13} /></Grid>
		  <Grid xs={12} sm={12} md={12} lg={12}><BasicTable /></Grid>
	    </Grid>
    )
}

export default App

