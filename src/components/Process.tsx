import { useEffect, useState } from "react";
import { styled } from "styled-components";

const Gauge = styled.div`
  display: inline-block;
  width: 80%;
  background-color: rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-top: 0.2rem;
  height: 0.6rem;
  float: right;
  position: relative;

  span {
    display: block;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    border-radius: inherit;
    background-color: #000;
    transition: all 0.3s ease-out;
  }
`;

export default function Process(value: any) {
  const [width, setWidth] = useState<number>(0);
  useEffect(() => {
    setInterval(() => {
      setWidth(value.value);
    }, 300);
  }, []);

  return (
    <>
      <Gauge>
        <span style={{ width: width + "%" }}></span>
      </Gauge>
    </>
  );
}
