import styled from 'styled-components';

export default styled.div`
  position: absolute;
  top: 30%;

  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  width: 100%;
  min-height: 70%;
  padding: 40px 100px 80px 40px;

  font-family: 'Formular', sans-serif;
  color: #fff;

  background-color: #000;

  overflow: scroll;
  transition: .4s;
  z-index: 1;

  @media (max-width: 425px) {
    padding: 15px;

    &:before {
      content: '';
      width: 36px;
      height: 5px;
      border-radius: 5px;
      margin: -9px auto 10px;

      opacity: 0.2;
      background-color: #cfd0d0;
    }
  }
`;
