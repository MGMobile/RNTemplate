import React from 'react';
import styled, {css} from 'styled-components/native';
import Theme from '@app/theme';

const SText = styled.Text`
  ${({
    theme,
    variant,
    fontSize,
    fontWeight,
    color,
    textAlign,
    marginBottom,
    marginTop,
  }) =>
    css`
      font-weight: ${fontWeight};
      font-size: ${fontSize}px;
      color: ${color};
      text-align: ${textAlign};
      margin-top: ${marginTop}px;
      margin-bottom: ${marginBottom}px;

      ${variant === 'h1' &&
      css`
        font-size: ${theme.font.sizes.xl}px;
        font-family: ${theme.font.families.mavenPro.bold};
        font-weight: 700;
      `}

      ${variant === 'h2' &&
      css`
        font-size: ${theme.font.sizes.md}px;
        font-family: ${theme.font.families.mavenPro.bold};
        font-weight: 700;
      `}
    `}
`;

const Text = ({
  variant,
  fontSize = Theme.font.sizes.rg,
  fontWeight = 400,
  color = Theme.colors.textColor,
  textAlign = 'left',
  marginTop = '0',
  marginBottom = '0',
  style,
  ...rest
}) => {
  return (
    <SText
      style={style}
      variant={variant}
      fontSize={fontSize}
      fontWeight={fontWeight}
      color={color}
      textAlign={textAlign}
      marginTop={marginTop}
      marginBottom={marginBottom}
      {...rest}
    />
  );
};

export default Text;
