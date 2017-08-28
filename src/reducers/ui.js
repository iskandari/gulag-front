const initState = {
  currentYear: 1937,
  currentPrison: 1,
  currentPeriod: null,
  isSearchOpen: false,
  isAboutOpen: false,
  isDemoPlay: false,
  isShowAllPrisons: false
};

const CURRENT_YEAR_CHANGED = 'CURRENT_YEAR_CHANGED';
const CURRENT_PRISON_CHANGED = 'CURRENT_PRISON_CHANGED';
const CURRENT_PERIOD_CHANGED = 'CURRENT_PERIOD_CHANGED';

export const changeCurrentYear = year => ({ type: CURRENT_YEAR_CHANGED, payload: year });
export const changeCurrentPrison = id => ({ type: CURRENT_PRISON_CHANGED, payload: id });
export const changeCurrentPeriod = id => ({ type: CURRENT_PERIOD_CHANGED, payload: id });

export default (state = initState, action) => {
  switch (action.type) {
    case CURRENT_YEAR_CHANGED:
      return { ...state, currentYear: action.payload };
    case CURRENT_PRISON_CHANGED:
      return { ...state, currentPrison: action.payload };
    case CURRENT_PERIOD_CHANGED:
      return { ...state, currentPeriod: action.payload };
    default:
      return state;
  }
};
