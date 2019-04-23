import styled, { keyframes } from 'styled-components';

const drawInLogo = () => keyframes`
  to {
    stroke-dashoffset: 0;
  }
}`;

export const StyledWrapper = styled.div`
  grid-column: 1 / -1;
  min-height: 400px;
  position: relative;
  width: 100%;
`;

export const StyledDiv = styled.div`
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  svg {
    height: 60px;
    margin-bottom: 10px;
    width: 200px;

    .fill-animation {
      /* animation: fill 2.5s ease-in-out infinite; */
      stroke-width: 1.3px;
      stroke: #e83a9f;
      fill: #fff;
      stroke-dasharray: 150;
      stroke-dashoffset: 150;
      animation: ${drawInLogo} 2s linear infinite;
    }
  }

  p {
    font-size: 18px;
  }
`;
