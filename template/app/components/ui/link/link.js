import React from 'react';
import {Text} from 'react-native';
import styled, {css} from 'styled-components/native';
import theme from '@app/theme';

const SText = styled(Text)`
  ${({fontSize, color, textAlign, marginBottom, marginTop}) => css`
    font-family: ${theme.font.families.montserrat.regular};
    font-size: ${fontSize}px;
    color: ${color};
    text-align: ${textAlign};
    text-decoration: underline ${color};
    margin-top: ${marginTop}px;
    margin-bottom: ${marginBottom}px;
  `}
`;

const Link = ({
  text,
  style = {},
  textStyle = {},
  fontSize = theme.font.sizes.rg,
  color = theme.colors.textColor,
  textAlign = 'left',
  marginTop = 0,
  marginBottom = 0,
  ...rest
}) => {
  return (
    <SText
      fontSize={fontSize}
      color={color}
      textAlign={textAlign}
      style={textStyle}
      activeOpacity={0.8}
      hitSlop={{left: 10, top: 10, right: 10, bottom: 10}}
      marginTop={marginTop}
      marginBottom={marginBottom}
      {...rest}>
      {text}
    </SText>
  );
};

export default Link;
