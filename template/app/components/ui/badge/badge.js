import React from 'react';
import styled, {css} from 'styled-components/native';
import theme from '@app/theme';
import Text from '@app/components/ui/text/text';

const SBadge = styled.TouchableOpacity`
  ${({color}) => css`
    min-height: 21px;
    min-width: 45px;
    background: ${color};
    padding: 1px 10px;
    align-self: flex-start;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    margin: 4px 8px 4px 0px;
  `}
`;

const SText = styled(Text)`
  ${({fontSize, color, fontWeight}) => css`
    font-size: ${fontSize}px;
    font-weight: ${fontWeight};
    font-family: ${theme.font.families.montserrat.semiBold};
    color: ${theme.colors.white};
    ${color === '#8DE8FE' &&
    css`
      color: ${theme.colors.haiti};
    `}
  `}
`;

const Badge = ({
  text,
  color = theme.colors.info,
  fontSize = theme.font.sizes.rg,
  fontWeight = 'normal',
  ...rest
}) => {
  return (
    <SBadge color={color} disabled activeOpacity={0.8} {...rest}>
      <SText fontWeight={fontWeight} fontSize={fontSize} color={color}>
        {text}
      </SText>
    </SBadge>
  );
};

export default Badge;
