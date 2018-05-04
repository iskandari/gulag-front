import { connect } from 'react-redux';

import {
  toggleAllPrisons,
  changeCurrentYear,
  toggleDemo
} from '../App/reducers/uiReducer';

import Chart from './Chart';

const mapStateToProps = state => {
  const campFilters = state.getIn(['ui', 'campTypeFilters']);
  const isDataLoading = state.getIn(['ui', 'isDataLoading']);
  const isChartVisible =
    campFilters.get('1') &&
    !campFilters.get('2') &&
    !campFilters.get('3') &&
    !campFilters.get('4') &&
    !campFilters.get('5') &&
    !campFilters.get('6') &&
    !isDataLoading;

  return {
    currentYear: state.getIn(['ui', 'currentYear']),
    isDemoPlay: state.getIn(['ui', 'isDemoPlay']),
    isShowAll: state.getIn(['ui', 'isShowAllPrisons']),
    isDataLoading,
    isChartVisible,
    lang: state.getIn(['intl', 'locale'])
  };
};

const mapDispatchToProps = { toggleAllPrisons, changeCurrentYear, toggleDemo };

export default connect(mapStateToProps, mapDispatchToProps)(Chart);