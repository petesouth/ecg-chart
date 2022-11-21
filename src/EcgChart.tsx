
import React, { useState, useEffect, useRef } from "react";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


import styled from "styled-components";
import { v4 as uuidv4 } from 'uuid';
import { Button } from "react-bootstrap";




export interface EcgChartProps {
    chartcolor: string;
    height: number,
    width: number
}


export default function EcgChart(props: EcgChartProps) {
    const canvasId = "canvas_" + uuidv4();

    const canvasRef = useRef(null);
    const data: number[] = [];


    // TESTING: fill data with some test values
    for (var i = 0; i < props.width; i++) {
        data.push(Math.sin(i / 10) * 70 + 100);
    }


    let x = 0;
    let continueAnimation = true;
    let interval: any = null;


    const drawGrid = (ctx:any) => {
        let s = props.width / 50;
        let pL = 0
        let pT = 0
        let pR = 0
        let pB = 0
        
        ctx.beginPath()
        ctx.strokeStyle = 'lightgrey'
        ctx.lineWidth = 1;
            
        for (var x = pL; x <= props.width - pR; x += s) {
           ctx.moveTo(x, pT)
           ctx.lineTo(x, props.height - pB)
        }
        for (var y = pT; y <= props.height - pB; y += s) {
           ctx.moveTo(pL, y)
           ctx.lineTo(props.width - pR, y)
        }
        ctx.stroke()
     }
                                 

    const drawChart = (ctx: any) => {

        if (continueAnimation === false) {
            x = 0;
            return;
        }

        if (x >= data.length - 1) {
            x = 0;
        }

        ctx.beginPath();
        ctx.strokeStyle = 'blue'

        ctx.moveTo(0, data[0]);
        ctx.lineWidth = 4;
        ctx.strokeStyle = props.chartcolor;
            
        for( let ix = 0; ix <= x; ++ix ) {
            ctx.lineTo(ix, data[ix]);        
        }    
        ctx.stroke();
        x += 1;
    }

    const animate = (ctx:any) => {
        drawGrid(ctx);
        drawChart(ctx);
    }   


    useEffect(() => {
        const canvas: any = canvasRef.current
        const ctx: any = canvas.getContext('2d')
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
            
        interval = setInterval(() => {
            animate(ctx);
        }, 100);
    }, [])


    return (<Container key={uuidv4()}>
        <Row>
            <Col>
                <canvas style={{ background: "white", 
                                 border: "lightgrey 1px solid",
                                 position: "relative"}} width={props.width} height={props.height} id={canvasId} key={canvasId} ref={canvasRef} onResize={()=>{

                }}/>
            </Col>
        </Row>
        <Row>
            <Col>
                <Container style={{ width: props.width, padding: 20 }}>
                    <Row>
                        <Col>
                            <Button
                                onClick={() => {
                                    clearInterval(interval);
                                    interval = null;
                                }}>Stop</Button>
                        </Col>
                        <Col>
                            <Button
                                onClick={() => {
                                    if (interval) {
                                        return;
                                    }
                                    const canvas: any = canvasRef.current;
                                    const ctx: any = canvas.getContext('2d');
                                    interval = setInterval(() => {
                                        animate(ctx);
                                    }, 100);
                                }}>Start</Button>
                        </Col>
                    </Row>

                </Container>
            </Col>



        </Row>

    </Container>)
}