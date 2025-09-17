import { keyframes } from 'styled-components';

export const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

export const translateIn = keyframes`
  from { transform: translateY(25px); }
  to { transform: translateY(0); }
`;

export const translateOut = keyframes`
  from { transform: translateY(0); }
  to { transform: translateY(25px); }
`;

export const shimmer = keyframes`
  0% { background-position: -300px 0; }
  100% { background-position: 300px 0; }
`;