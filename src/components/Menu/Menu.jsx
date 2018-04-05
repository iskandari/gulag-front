import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { t } from '../../intl/helper';

// action
import { toggleMenu } from '../App/reducers/uiReducer';

// icon
import menu from '../menu.svg';

// styled
import Container from './Container';
import Button from '../Button';
import Title from './Title';

const Menu = ({ dispatch, isDataLoading }) => (
  <Container mountOnEnter in={!isDataLoading} timeout={2000}>
    <Button onClick={dispatch.bind(null, toggleMenu())}>
      <img src={menu} alt='menu' />
    </Button>
    <Title>{t('menu.title')}</Title>
  </Container>
);

Menu.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isDataLoading: PropTypes.bool.isRequired
};

export default connect(state => ({
  isDataLoading: state.getIn(['ui', 'isDataLoading'])
}))(Menu);
