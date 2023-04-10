import {Link} from 'react-router-dom';
import Button from '@mui/material/Button';


export const NavBar = () => {
  return (
    <div style={{display:'flex', flexDirection:'row', marginTop:'2%'}}>
      <div style={{display:'flex', flex:'0.4',  marginLeft:'2%', alignContent:'center'}}>
        <p style={{display:'flex', height:'100%', alignItems:'center', marginTop:0, fontFamily:'sans-serif', fontWeight:'bold', color:'white', marginLeft:'3%'}}>  GptBots</p>
      </div>
      <div style={{display:'flex', flex:'0.5', marginLeft:'2%', justifyContent:'space-around', alignItems:'center'}}>
        <Link style={{textDecoration:'none', color:'white'}} to="/my-bots">Mis Bots</Link>
        <Link style={{textDecoration:'none', color:'white'}}  to="/create-bot">Crear nuevo bot</Link>
        {/*
        <Button variant="contained">
            Poner en producción
        </Button>*/}
      </div>
      </div>
  )
}