import React from 'react'
import styled from 'styled-components'
export default function Hexagon({left ,posx=0,posy=0,z=10,blur=0,name,top,opacity=1 ,scales ,img,delay=0}) {
  
  return (

   
  
   <Mask blur={blur} name={name} left={left} z={z} top={top} scale={scales} delay={delay} >
        <Content src={img} posx={posx} posy={posy} scale={scales}  opacity={opacity}></Content>
        <svg >
              <defs>
                <clipPath  transform={"scale("+scales*0.9/1.36+" "+scales/1.4 +")"}   id="myClip">
                      <path
                      d="m 38.184568,140.48078 -34.2635369,-19.80256 -0.067,-39.656577 -0.067,-39.65658 34.2398669,-19.76846 c 18.83193,-10.87265 34.37157,-19.7684531 34.53254,-19.7684531 0.33345,0 67.639652,38.7763531 68.349612,39.3774731 0.43717,0.37015 0.46279,2.58708 0.45897,39.7078 -0.002,21.623667 -0.0915,39.448057 -0.19844,39.609757 -0.15791,0.23883 -68.504942,39.826 -68.671782,39.77527 -0.0273,-0.008 -15.46828,-8.92626 -34.31323,-19.81767 z m 68.434512,-0.7574 33.82695,-19.53185 0.067,-39.171197 0.067,-39.1712 L 106.56997,22.214153 72.559898,2.5791859 38.637328,22.164793 4.7147611,41.750393 v 39.23276 39.232757 l 33.7343669,19.50214 c 18.55391,10.72618 33.87132,19.51003 34.03868,19.51966 0.16737,0.01 15.52643,-8.77182 34.131252,-19.51433 z"  
                      />
                      <path
                      d="M 381.13066,250.15412 156.91135,379.6072 -67.307965,250.15412 -67.307963,-8.752038 156.91135,-138.20512 381.13066,-8.7520361 Z"
                      transform="matrix(0.28028542,0,0,0.28028542,28.736339,47.648475)"/> 
                </clipPath>
              </defs>
              </svg>               
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
  filter: blur(${props=> props.blur}px);
  display: block;
  opacity:0;
  z-index:${props=> props.z};
  position: absolute;
  left:${props=> props.left}px;
  top:${props=> props.top}px;
  scale:${props=> props.scale};
  width: 550px;
  height: 550px;
  
  animation-name: example${props=>props.name};
  animation-delay:${props=> props.delay}s;
  animation-duration: 10s;
  animation-fill-mode: forwards;
  @keyframes example${props=>props.name} {
    0% {
      opacity:1;
      top:${props=> props.top-400}px;
      clip-path: polygon(49% 37%, 100% 49%, 100% 75%, 44% 62%, 0 52%, 0% 25%);
    }
    50% { 
    clip-path: polygon(56% 0, 100% 14%, 100% 100%, 51% 100%, 0 75%, 0 0);
  }
    75% {
      clip-path: polygon(100% 0, 100% 0, 100% 100%, 50% 100%, 0 100%, 0 0);
      top:${props=> props.top}px;

    }
    100% {
      opacity:1;
      clip-path: polygon(50% 0%, 100% 0, 100% 50%, 100% 100%, 0 100%, 0 50%, 0 0);
    }
  }
`

const Content = styled.img`
background: rgb(223,241,244);
background: linear-gradient(40deg, rgba(223,241,244,1) 40%, rgba(168,198,220,1) 70%);
height: 550px;
width: 450px;
object-fit: cover;
object-position: ${props=>props.posx +"px "+props.posy+"px"};
opacity: ${props=>props.opacity};
clip-path: url(#myClip);`