import React from 'react';
import styled from 'styled-components/native';
import theme from '@app/theme/index';
import LottieView from 'lottie-react-native';

const SView = styled.View`
  flex: 1;
  position: absolute;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  justify-content: center;
  align-items: center;
  background: ${theme.colors.dodgerBlue};
  opacity: 0.75;
  ${theme.boxShadows.lg}
`;

const SLoader = styled.View`
  width: 90px;
  height: 90px;
  justify-content: center;
  align-items: flex-end;
  background-color: ${theme.colors.dodgerBlue};
  border-radius: 20px;
  margin-bottom: ${theme.spaces.sm}px;
`;

const Loader = () => {
  return (
    <SView>
      <SLoader>
        {/* <LottieView
          source={require(''}
          autoPlay
          loop
        /> */}
      </SLoader>
    </SView>
  );
};

export default Loader;
