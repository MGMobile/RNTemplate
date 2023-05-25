import React from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import styled, {css} from 'styled-components/native';

const STouchable = styled.TouchableOpacity`
  ${({theme, isRound, isGrey, white, size}) => css`
    align-items: center;
    justify-content: center;
    background: ${isGrey
      ? theme.colors.fiord
      : white
      ? theme.colors.white
      : theme.colors.dodgerBlue};
    width: ${size}px;
    height: ${size}px;
    border-radius: ${isRound ? '50px' : '8px'};
  `}
`;

const SView = styled.View`
  align-items: center;
  justify-content: center;
`;

const SIcon = styled.View`
  align-items: center;
  justify-content: center;
`;

const SmallButton = ({
  style = {},
  icon,
  isRound = false,
  isGrey = false,
  white,
  size = 36,
  onFocus,
  onBlur,
  ...rest
}) => {
  const [isFocus, setIsFocus] = useState(false);

  const handleFocus = useCallback(
    e => {
      setIsFocus(true);

      if (onFocus) {
        onFocus(e);
      }
    },
    [onFocus],
  );

  const handleBlur = useCallback(
    e => {
      setIsFocus(false);

      if (onBlur) {
        onBlur(e);
      }
    },
    [onBlur],
  );
  return (
    <STouchable
      onBlur={handleBlur}
      onFocus={handleFocus}
      white={white}
      size={size}
      isGrey={isGrey}
      isRound={isRound}
      style={style}
      activeOpacity={0.8}
      {...rest}>
      <SView>
        <SIcon>{icon}</SIcon>
      </SView>
    </STouchable>
  );
};

export default SmallButton;
