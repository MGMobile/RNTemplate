import React from 'react';
import styled, {css} from 'styled-components/native';
import theme from '@app/theme';
import Text from '@app/components/ui/text/text';
import Icon from '@app/components/ui/icon/icon';

const SBanner = styled.View`
  ${({color}) => css`
    min-height: 30px;
    background: ${color};
    padding: 4px ${theme.container.rg}px;
    flex-direction: row;
    align-items: center;
  `}
`;

const SIcon = styled(Icon)`
  ${({color, fontSize, name}) => css`
    min-width: 30px;
    text-align: center;
    font-size: ${fontSize}px;
    color: ${theme.colors.white};
    ${color === '#8DE8FE' &&
    css`
      color: ${theme.colors.haiti};
    `}
    ${name === 'check' &&
    css`
      font-size: ${fontSize - 4}px;
    `}
    ${name === 'eye-open' &&
    css`
      font-size: ${fontSize - 2}px;
    `}
  `}
`;

const SText = styled(Text)`
  ${({fontSize, color}) => css`
    font-size: ${fontSize}px;
    font-weight: 600;
    color: ${theme.colors.white};
    ${color === '#8DE8FE' &&
    css`
      color: ${theme.colors.haiti};
    `}
  `}
`;

const Banner = ({
  text,
  color = theme.colors.info,
  fontSize = theme.font.sizes.rg,
  icon,
  ...rest
}) => {
  return (
    <SBanner color={color} disabled activeOpacity={0.8} {...rest}>
      <SIcon name={icon} color={color} fontSize={fontSize} />
      <SText fontSize={fontSize} color={color}>
        {text}
      </SText>
    </SBanner>
  );
};

export default Banner;
