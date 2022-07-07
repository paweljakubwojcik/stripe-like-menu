import { useState } from 'react'
import { AnimatedCanvas } from './components/animated-canvas'
import { NavBar } from './components/navbar'

function App() {
    return (
        <div className="App bg-slate-50  w-screen h-screen">
            <AnimatedCanvas className="w-full h-[75%] absolute -z-0" />
            <header className="w-full relative flex justify-between text-white p-4">
                <h1 className='font-bold'>STRIPE</h1>
                <NavBar />
                <button className='text-inherit'>Sign in</button>
            </header>
            <div className="content relative bg-slate-50"></div>
        </div>
    )
}

export default App
