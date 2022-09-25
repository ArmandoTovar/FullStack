import logo from './logo.svg';
import './App.css';
import Hexagon from './components/Hexagon';
import Hexagonani from './components/Hexagonani';
import styled from 'styled-components';

function App() {
  return (
    <div className="App">
       <Caja></Caja>
       <img className='imagen2' src='./image2.svg' alt='lim'/>
       <img className='imagen' src='./limitado.svg' alt='lim'/>
      <div className='fecha'>23</div>
      <Hexagon name={1} left={-50} top={460} scales={4.2} delay={0.9} opacity={0.4} img={'image3.jpg'}/>
      <Hexagon name={2} left={1355} top={800} scales={3} delay={0.1} opacity={0.4}  img={'image2.jpg'}/>
      <Hexagon name={3} left={0} top={330} scales={1.6} delay={1.6} posx={-150} posy={-10} img={'image1.webp'}/>
      <Hexagon name={4} left={570} top={400} scales={1.25} delay={0.64} posx={-100} posy={-100} img={'ana3.jpeg'}/>
      <Hexagon name={5} left={290} top={870} scales={1.25} delay={1} posx={-10} posy={-50} img={'ana2.png'}/>
      <Hexagon name={6} left={290} top={1850} scales={3} delay={0.63} opacity={0.1} img={'blanco.jpg'}/>
      <Hexagonani z={10} left={185} top={460} scales={1} delay={0.3} opacity={1} />
      <Hexagonani z={10} left={-200} top={60} scales={2} delay={0.1} opacity={1} />
      <Hexagonani z={10} left={0} top={1000} scales={0.5} delay={0.4} opacity={1} />
      <Hexagonani z={10} left={800} top={600} scales={1.2} delay={0.2} opacity={1} />
      <Hexagonani z={10} left={400} top={1700} scales={3} delay={0.2} opacity={1} />
      <h2> <img className='wap' src='./whatsapp.png' alt='lim'/>+58 424-670-6582</h2>
      <h3>Jornadas</h3>
      <h4>Consultas de Cirugía General + Ecografía </h4>
      <h4 className='lugar'><img className='wapa' src='./posi.png' alt='lim'/>Centro Clinico ‘ Dr Galue ’</h4>
      <h5>20$</h5>
    </div>
  );
}


const Caja = styled.div`
position:relative;
background:rgba(27, 150, 173, 1);
top:1300px;
z-index:9;
left:-250px;
transform:rotate(30deg);
width:1500px;
height:550px;
background: linear-gradient(90deg, rgba(27, 150, 173, 1) 0%, rgba(24, 179, 185, 1) 85%, rgba(30, 182, 190, 1) 100%);
box-shadow: 37px 10px 70px 1px rgba(0, 0, 0, 0.7);
animation-name: barra;
animation-duration: 2s;




@keyframes barra {
  0% {
    top:1800px;
    transform:scale(1, 0.2)
 }
  100%{
  top:1300px;
  transform:scale(1 1)
  }
`

export default App;
