/* eslint-disable react/prop-types */
/* eslint-disable react/require-default-props */
import React, { PureComponent } from 'react';
// import { toPairs } from 'ramda';
import PropTypes from 'prop-types';
import { select } from 'd3-selection';
import { axisBottom } from 'd3-axis';
import styled from 'styled-components';

// const axisStyle = {
//   stroke: '#fff',
//   strokeWidth: 1,
//   opacity: 0.25
// };

const G = styled.g`
  .ticks {
    @media (max-width: 1023px) {
      display: none;
    }
  }
`;

class Axis extends PureComponent {
  componentWillReceiveProps() {
    const { scale, width } = this.props;

    const axis = axisBottom(scale);
    if (width < 833) {
      axis
        .tickSize(0)
        .tickFormat('');
    } else {
      axis
        .ticks(42)
        .tickFormat('');
    }

    const el = select(this.axis);
    el.call(axis);

    // const elPath = el.selectAll('path');
    // const elLine = el.selectAll('line');

    // toPairs(axisStyle).forEach(([key, value]) => {
    //   elPath.style(key, value);
    //   elLine
    //     .style(key, value)
    //     .attr('class', 'ticks');
    // });
  }

  render() {
    const { height, margin } = this.props;

    return (
      <G
        innerRef={(ref) => {
          this.axis = ref;
        }}
        transform={`translate(${margin.left}, ${height + margin.top})`}
      />
    );
  }
}

Axis.propTypes = {
  scale: PropTypes.func.isRequired,
  height: PropTypes.number,
  margin: PropTypes.shape({
    top: PropTypes.number,
    right: PropTypes.number,
    bottom: PropTypes.number,
    left: PropTypes.number
  }),
  width: PropTypes.number
};

export default Axis;
