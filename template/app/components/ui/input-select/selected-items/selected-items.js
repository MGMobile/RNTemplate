import React from 'react';
import Text from '@app/components/ui/text';
import styled, {css} from 'styled-components/native';
import theme from '@app/theme';

const SViewContainer = styled.View`
  ${({marginTop, marginBottom}) => css`
    margin-top: ${marginTop}px;
    margin-bottom: ${marginBottom}}px;
    flex-direction: row;
    flex-wrap: wrap;
  `}
`;

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
    font-family: ${theme.font.families.mavenPro.regular};
    color: ${theme.colors.white};
    ${color === '#8DE8FE' &&
    css`
      color: ${theme.colors.haiti};
    `}
  `}
`;
const SelectedItems = ({
  data,
  marginTop = -6,
  marginBottom = 15,
  color = theme.colors.info,
  fontSize = theme.font.sizes.rg,
  fontWeight = 'bold',
  ...rest
}) => {
  console.log('BULLES', data);
  return (
    <SViewContainer marginBottom={marginBottom} marginTop={marginTop}>
      {data.map(item => {
        return (
          <SBadge color={color} disabled activeOpacity={0.8} {...rest}>
            <SText fontWeight={fontWeight} fontSize={fontSize} color={color}>
              {item.name_short ? item.name_short.toUpperCase() : item.name}
            </SText>
          </SBadge>
        );
      })}
    </SViewContainer>
  );
};

export default SelectedItems;
