
import React, { useState, useEffect, useRef } from "react";
import { setConstantValue } from "typescript";
import { v4 as uuidv4 } from 'uuid';
import { isContext } from "vm";


export default function EcgChart() {
    const canvasId = "canvas_" + uuidv4();

    const canvasRef = useRef(null)
    
    const data: number[] = [];

    // TESTING: fill data with some test values
    for (var i = 0; i < 300; i++) {
        data.push(Math.sin(i / 10) * 70 + 100);
    }


    let x = 0;
    let continueAnimation = true;
    let interval:any = null;


    const animate = () => {
        console.log("x", x, data[x])
        const canvas: any = canvasRef.current
        const ctx: any = canvas.getContext('2d')
    
        if( continueAnimation === false ) {
            x = 0;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.beginPath();
            return;
        }

        if (x >= data.length - 1) {
            x = 0;
            ctx.beginPath();
        }

        if( x === 0 ) {
            ctx.lineWidth = 1;
            ctx.moveTo(x, data[x]);
            
        }

        ctx.strokeStyle = "black"
        ctx.fillRect(x, data[x], 1, 1)
        
        ctx.fillStyle = "white"
        ctx.fillRect(x + 1, data[x + 1], 1, 1)
        
        ctx.strokeStyle = "black"
        ctx.lineTo(x, data[x]);
        ctx.stroke();

    
        x += 1;
    }


    useEffect(() => {
        interval = setInterval(() => {
            animate();
        }, 100);
    }, [])


    return (<div key={uuidv4()}>
        <div>
            <button id="stop" onClick={() => {
                continueAnimation = ! continueAnimation;
            }}>Stop</button>
        </div>
        <div>
            <canvas style={{background: "white"}} width={300} height={300}  id={canvasId} key={canvasId} ref={canvasRef}/>
        </div>
    </div>)
}