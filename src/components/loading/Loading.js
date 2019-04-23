import React from 'react';
import PropTypes from 'prop-types';

import { DormifyLogo } from './Icons';
import { StyledWrapper, StyledDiv } from './LoadingStyles';

const Loading = props => (
  <StyledWrapper>
    <StyledDiv>
      <DormifyLogo />
      <p>{props.text || 'Loading...'}</p>
    </StyledDiv>
  </StyledWrapper>
);

Loading.propTypes = {
  text: PropTypes.string,
};

export default Loading;
