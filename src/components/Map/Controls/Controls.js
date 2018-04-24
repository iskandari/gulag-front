import styled from 'styled-components';

export default styled.div`
  position: fixed;
  top: calc(${({ slideUp }) => (slideUp ? '19%' : '50%')} - 76px);
  right: 0;

  width: 50px;
  height: 152px;

  z-index: 1;

  & button {
    display: block;
    margin-bottom: 1px;
  }

  @media (max-width: 925px) {
    display: none;
  }
`;
