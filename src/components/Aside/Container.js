import transition from 'styled-transition-group';

export default transition.div`
  position: absolute;
  left: ${({ isMenuOpen }) => (isMenuOpen ? 0 : '-400px')};

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 400px;
  height: 100%;
  padding: 50px 40px;

  background-color: #14171a;
  
  &:enter {
    left: -400px;
  }

  &:enter-active {
    left: 0;

    transition: left 400ms ease-in;
  }

  &:exit {
    left: 0;
  }

  &:exit-active {
    left: -400px;

    transition: left 400ms ease-in;
  }
`;
