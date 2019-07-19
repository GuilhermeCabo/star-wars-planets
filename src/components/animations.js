import styled, { keyframes } from 'styled-components';
import { zoomIn } from 'react-animations';

const zoomInAnimation = keyframes`${zoomIn}`;

export const ZoomyDiv = styled.div`
  animation: ${props => props.animation || '0.7s'} ${zoomInAnimation};
  z-index: 1;
`;