/* eslint-disable react/jsx-no-target-blank */
import { useState, useRef } from 'react'
import { animated, useSpring, easings } from '@react-spring/web'
import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import background from './assets/backdrop.jpg';
import './App.css'

function App() {
  const [blockX, setBlockX] = useState(0);
  const [blockColor, setBlockColor] = useState('coral');

  const parallaxRef = useRef();

  const [spring, springApi] = useSpring(() => ({
    from: {x: 0}
  }));

  const [bounce, bounceApi] = useSpring(() => ({
    from: {y: 0},
    to: [{y: 100},{y: 0}],
    loop: true,
    config:{
      duration: 800,
      easing: easings.easeInOutCubic
    }
  }));

  const moveBlock = () => {
    const r = Math.round(Math.random() * 255);
    const g = Math.round(Math.random() * 255);
    const b = Math.round(Math.random() * 255);
    const newColor = `rgb(${r}, ${g}, ${b})`;
    springApi.start({
      from: {x: blockX, backgroundColor: blockColor}, 
      to: {x: blockX + 150, backgroundColor: newColor},
    });
    setBlockX((prev) => prev + 150);
    setBlockColor(newColor);
  }

  const resetBlock = () => {
    springApi.start({
      from: {x: blockX},
      to: {x: 0}
    });
    setBlockX(0);
  }

  const movingBlock = (
    <animated.div className="bg-red-400 rounded-lg w-48 h-48 flex justify-center items-center " style={{...spring}} onClick={moveBlock}>
      <h2 className="p-16">Click me to move me to the left!</h2>
    </animated.div>
  )

  const scrollIndicator = (
    <animated.div style={{...bounce, position: 'absolute', bottom: 100}}>
      <p className="bg-black rounded-lg p-8 text-white">Scroll down!!</p>
    </animated.div>
  )

  return (
    <Parallax pages={3} className="top-0 left-0" ref={parallaxRef}>
      <ParallaxLayer speed={5} className="z-20 flex justify-center items-center" onClick={() => parallaxRef.current.scrollTo(1)}>
        <h1 className="text-6xl font-sans font-bold">Hello there!</h1>
      </ParallaxLayer>
      <ParallaxLayer offset={0} style={{backgroundImage: `url(${background})`, backgroundSize: 'cover'}} className="flex justify-center items-center flex-col z-10">
        {scrollIndicator}
      </ParallaxLayer>
      <ParallaxLayer offset={1} speed={2} className="flex flex-col justify-center items-center gap-10 bg-blue-400">
      <h1 className="text-2xl">Camden Hao A2.2 - React-Spring and Tailwind!</h1>
      {movingBlock}
      <button onClick={resetBlock} className="w-1/6">Reset block</button>
      </ParallaxLayer>
      <ParallaxLayer offset={2} className="flex justify-center items-center">
        <p>You reached the bottom!</p>
      </ParallaxLayer>
    </Parallax>
  )
}

export default App;
