/* eslint-disable react/prop-types */
/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { scaleTime, scaleLinear } from 'd3-scale';
import { max } from 'd3-array';
import styled from 'styled-components';

import data from '../../config/chartData';
import PrisonersArea from './PrisonersArea';
import Axis from './Axis';
import Slider from './Slider';
import Periods from './Periods';

const Wrap = styled.div`
  position: relative;
  & svg {
    position: relative;
    z-index: 2;
  }
`;

const margin = {
  top: 5,
  right: 20,
  bottom: 70,
  left: 20
};
// const screenWidth = (window.innerWidth < 1500) ? window.innerWidth : 1500;
const height = 300 - margin.top - margin.bottom;

const Chart = (props) => {
  const { periods, openPeriod, showAllYears } = props;
  const innerWidth = window.innerWidth;
  let width;
  if (innerWidth < 1024) {
    width = innerWidth - 40 - margin.left - margin.right;
  } else if (innerWidth < 1280) {
    width = innerWidth - 150 - margin.left - margin.right;
  } else {
    width = innerWidth - 200 - margin.left - margin.right;
  }

  const xScale = scaleTime()
    .domain([new Date(1918, 0, 1), new Date(1960, 11, 31)])
    .range([0, width])
    .clamp(true);

  const yScale = scaleLinear()
    .domain([0, max(data, d => d.prisoners)])
    .range([height, 0]);

  return (
    <Wrap>
      <svg
        width={width + margin.left + margin.right}
        height={height + margin.top + margin.bottom}
      >
        <defs>
          <linearGradient
            id='Gradient'
            x1='0%'
            y1='31%'
            x2='10%'
            y2='0%'
            spreadMethod='repeat'
          >
            <stop offset='0%' stopColor='rgb(225,225,225)' />
            <stop offset='12%' stopColor='rgb(225,225,225)' />
            <stop offset='13%' stopColor='rgb(0,0,0)' />
            <stop offset='25%' stopColor='rgb(0,0,0)' />
            <stop offset='26%' stopColor='rgb(225,225,225)' />
            <stop offset='38%' stopColor='rgb(225,225,225)' />
            <stop offset='39%' stopColor='rgb(0,0,0)' />
            <stop offset='51%' stopColor='rgb(0,0,0)' />
            <stop offset='52%' stopColor='rgb(225,225,225)' />
            <stop offset='64%' stopColor='rgb(225,225,225)' />
            <stop offset='65%' stopColor='rgb(0,0,0)' />
            <stop offset='77%' stopColor='rgb(0,0,0)' />
            <stop offset='78%' stopColor='rgb(225,225,225)' />
            <stop offset='90%' stopColor='rgb(225,225,225)' />
            <stop offset='91%' stopColor='rgb(0,0,0)' />
            <stop offset='100%' stopColor='rgb(0,0,0)' />
          </linearGradient>
          <filter
            id='gaussianBlur'
            width='185.7%'
            height='400%'
            x='-42.9%'
            y='-150%'
            filterUnits='objectBoundingBox'
          >
            <feGaussianBlur stdDeviation='5' in='SourceGraphic' />
          </filter>
        </defs>
        <PrisonersArea
          width={width}
          height={height}
          margin={margin}
          xScale={xScale}
          yScale={yScale}
          data={data}
          showAllYears={showAllYears}
        />
        <Axis
          width={width}
          height={height}
          margin={margin}
          scale={xScale}
        />
        <Slider
          width={width}
          height={height}
          margin={margin}
          xScale={xScale}
          yScale={yScale}
          data={data}
          isVisible={!props.isShowAllPrisons}
        />
      </svg>
      {
        periods &&
        <Periods
          width={width}
          height={height}
          margin={margin}
          xScale={xScale}
          periods={periods}
          onClick={openPeriod}
        />
      }
    </Wrap>
  );
};

Chart.propTypes = {
  periods: PropTypes.object,
  openPeriod: PropTypes.func
};

export default connect(
  state => ({
    periods: state.toJS().data.periods,
    isShowAllPrisons: state.toJS().ui.isShowAllPrisons
  })
)(Chart);
