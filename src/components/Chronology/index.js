import { createSelector } from 'reselect';
import { List } from 'immutable';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';

import { periodsSelector, langSelector } from '../App/selectors';

import { closeMenus } from '../App/reducers/uiReducer';

import Chronology from './Chronology';

const mapStateToProps = createSelector(
  periodsSelector,
  langSelector,
  (periods, lang) => {
    if (!periods) {
      return { periods: List(), lang };
    }
    return {
      periods: periods.sort((a, b) => {
        if (a.get('year') > b.get('year')) return 1;
        if (a.get('year') < b.get('year')) return -1;
        return 0;
      }),
      lang
    };
  }
);
const mapDispatchToProps = dispatch => ({
  pushToRoot: () => { 
    dispatch(closeMenus());
    dispatch(push('/'));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Chronology);
