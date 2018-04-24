import { Map } from 'immutable';
import { createSelector } from 'reselect';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { branch, compose, renderNothing } from 'recompose';

// selectors
import { langSelector, activitiesSelector } from '../App/selectors';
import prisonSelector from './selector';

import { changeViewport } from '../App/reducers/uiReducer';

import CampCard from './CampCard';

const mapStateToProps = createSelector(
  langSelector,
  prisonSelector,
  activitiesSelector,
  (lang, camp, activities) => {
    if (!activities) {
      return {
        lang,
        camp,
        activities: null
      };
    }

    return {
      lang,
      camp,
      activities: activities.reduce(
        (acc, ativity) => acc.set(ativity.get('id'), ativity),
        Map()
      )
    };
  }
);
const mapDispatchToProps = dispatch => ({
  closeCard: () => dispatch(push('/')),
  changeViewport: newViewport => dispatch(changeViewport(newViewport))
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withBranch = branch(({ camp }) => !camp, renderNothing);

const enhance = compose(withConnect, withBranch);
export default enhance(CampCard);
