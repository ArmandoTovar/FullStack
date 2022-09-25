import React from 'react'
import styled from 'styled-components'
export default function Hexagonani({left,z=10,top,opacity=1 ,scales ,img,delay=0}) {
  const rando = Math.random()*3+1;
  return (

   
  
   <Mask left={left} z={z} top={top} scale={scales}  >
        <Content init={rando}   delay={delay}  opacity={opacity}></Content>  

       </Mask>
   )
}

// const Border = styled.div`
//   width: 350px;
//   height: 400px;
//   clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
//   background: rgba(31, 158, 183, 0.3);

// `
const Mask = styled.div`
  display: block;
  z-index:${props=> props.z};
  position: absolute;
  left:${props=> props.left}px;
  top:${props=> props.top}px;
  scale:${props=> props.scale};


`

const Content = styled.div`
height: 400px;
background:white;
width: 400px;
opacity: ${props=>props.opacity};
clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);


animation-name: example;
animation-delay:${props=> props.delay}s;
animation-duration: ${props=>props.init}s;
animation-iteration-count: infinite;
animation-direction: alternate;



@keyframes example {
  0% {

    transform:rotate(0turn) scale(0.1);
    opacity: 1;  }
  25%{
    transform:rotate(1turn) scale(0.5);
    opacity: 0 ;
  }
  50% { 
    transform: rotate(-1turn) scale(0.5);
    opacity: 1;
  }
  60% {

    transform: scale(0.1);

  }
  75%{
    transform:rotate(1turn) scale(0.5);
    opacity: 0 ;
  }
  100% { 
    transform: scale(0.1);
    opacity: 1;
  }
}


`