import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { styled } from "styled-components";

const Loder = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;

  background: white;
  z-index: 999;
  h1 {
    text-align: center;
    margin-bottom: 1rem;
  }
  .icon {
    width: 3rem;

    svg {
      width: 100%;
      height: 100%;
      display: block;
      animation: animate 2s infinite;
    }
  }
  @keyframes animate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(720deg);
    }
  }
`;

export default function Loading() {
  return (
    <Loder>
      <h1>Loading,,,</h1>
      <span className="icon">
        <AiOutlineLoading3Quarters />
      </span>
    </Loder>
  );
}
