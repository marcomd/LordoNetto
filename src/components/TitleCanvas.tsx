import styled from "styled-components";
import React, { useEffect, useRef } from "react";
import { Particle, IParticle, MouseAttributes } from "../lib/canvasParticle";

const StyledCanvasContainer = styled.div`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledCanvasTitle = styled.canvas`
  z-index: 0;
`;

interface Props {
  children: string;
}

export default function TitleCanvas({ children }: Props) {
  const refCanvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = refCanvas.current;
    if (!canvas) return
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return
    let particleArray: IParticle[] = [];

    ctx.fillStyle = "white";
    ctx.font = "9px Verdana";
    ctx.fillText(children, -1, 7);
    //ctx.strokeStyle = "white";
    //ctx.strokeRect(0, 0, 200, 100);
    const textCoordinates = ctx.getImageData(0, 0, 200, 100);

    const mouse: MouseAttributes = {
      x: 0,
      y: 0,
      radius: 50
    };

    const handleMouseMove = (event: MouseEvent) => {
      const { x: canvasX, y: canvasY } = canvas.getBoundingClientRect();
      mouse.x = event.x - canvasX;
      mouse.y = event.y - canvasY;
      //console.log(`mouse:(${mouse.x}, ${mouse.y}`, canvasX, canvasY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    function initArray() {
      if (!ctx) return
      particleArray = [];
      let adjustX = 1;
      let adjustY = 3;

      for (let y = 0, y2 = textCoordinates.height; y < y2; y++) {
        for (let x = 0, x2 = textCoordinates.width; x < x2; x++) {
          if (
            textCoordinates.data[y * 4 * textCoordinates.width + x * 4 + 3] >
            128
          ) {
            let positionX = x + adjustX;
            let positionY = y + adjustY;
            particleArray.push(
              new Particle(positionX * 10, positionY * 10, ctx, mouse)
            );
          }
        }
      }
    }
    initArray();

    function animate() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].draw();
        particleArray[i].update();
      }
      requestAnimationFrame(animate);
    }
    animate();

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [children]);

  return (
    <StyledCanvasContainer>
      <StyledCanvasTitle ref={refCanvas} width="650" height="130" />
    </StyledCanvasContainer>
  );
}
