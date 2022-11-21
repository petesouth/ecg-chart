
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


    const animate = (canvas: any, ctx: any) => {
        console.log("x", x, data[x])

        if (continueAnimation === false) {
            x = 0;
            return;
        }

        if (x >= data.length - 1) {
            x = 0;
        }

        if (x === 0) {
            ctx.lineWidth = 1;
            ctx.moveTo(x, data[x]);

        }

        ctx.fillStyle = "white";
        ctx.fillRect(x + 1, 0, 5, canvas.height)

        ctx.strokeStyle = props.chartcolor;
        ctx.lineTo(x, data[x]);
        ctx.stroke();
        x += 1;
    }


    useEffect(() => {
        const canvas: any = canvasRef.current
        const ctx: any = canvas.getContext('2d')
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
            
        interval = setInterval(() => {
            animate(canvas, ctx);
        }, 100);
    }, [])


    return (<Container key={uuidv4()}>
        <Row>
            <Col>
                <canvas style={{ background: "white", border: "solid 1px black" }} width={props.width} height={props.height} id={canvasId} key={canvasId} ref={canvasRef} />
            </Col>
        </Row>
        <Row>
            <Col>
                <Container style={{ width: props.width }}>
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
                                        animate(canvas, ctx);
                                    }, 100);
                                }}>Start</Button>
                        </Col>
                    </Row>

                </Container>
            </Col>



        </Row>

    </Container>)
}