import Screen from '@app/components/ui/screen';
import theme from '@app/theme';
import React, {memo} from 'react';
import styled, {css} from 'styled-components/native';

const SModalOuterContainer = styled.View`
  justify-content: center;
  align-items: center;
  padding-vertical: ${theme.container.md}px;
`;

const SModalInnerContainer = styled.View`
  width: 100%;
  padding: 0 ${theme.container.md}px;
`;

const SModalContent = styled.View`
  border-radius: 25px;
  background-color: ${({bgColor}) => bgColor};
  ${theme.boxShadows.md}
  overflow: hidden;
`;

const CustomModal = ({
  children,
  bgColor = theme.colors.haiti,
  outerContentStyle = {},
  keyboardShouldPersistTaps = 'handled',
  paddingHorizontal,
  ...rest
}) => {
  return (
    <Screen
      style={{justifyContent: 'center'}}
      preset="scroll"
      backgroundColor="transparent"
      keyboardShouldPersistTaps={keyboardShouldPersistTaps}>
      <SModalOuterContainer paddingHorizontal={paddingHorizontal}>
        <SModalInnerContainer style={outerContentStyle}>
          <SModalContent bgColor={bgColor}>{children}</SModalContent>
        </SModalInnerContainer>
      </SModalOuterContainer>
    </Screen>
  );
};

export default memo(CustomModal);
