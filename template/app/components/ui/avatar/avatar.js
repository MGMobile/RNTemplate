import React from 'react';
import {Image} from 'react-native';
import styled, {css} from 'styled-components/native';
import Text from '@app/components/ui/text/text';
import theme from '@app/theme';
import Icon from '../icon';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';

const STouchable = styled.TouchableOpacity`
  ${({theme, size, marginTop, marginBottom, premium}) => css`
    justify-content: center;
    align-items: center;
    margin-top: ${marginTop}px;
    margin-bottom: ${marginBottom}}px;
  `}
`;
const SContainerImage = styled.View`
  ${({theme, size, isPremium}) => css`
    width: ${size}px;
    height: ${size}px;
    position: relative;
    ${isPremium &&
    css`
      border-color: ${theme.colors.gold};
      border-width: 4px;
      border-radius: 100px;
    `}
  `}
`;

const SImage = styled(Image)`
  ${({theme, border, color, hasError}) => css`
    width: 100%;
    height: 100%;
    resize-mode: cover;
    border-radius: 100px;
    ${border &&
    css`
      border-width: 3px;
    `}
    border-color: ${color};
  `}
`;

const SBadge = styled.View`
  ${({theme, color, badgeColor}) => css`
    padding: 2px 4px;
    border-radius: 5px;
    ${badgeColor !== ''
      ? css`
          background-color: ${badgeColor};
        `
      : css`
          background-color: ${color};
        `}
    position: absolute;
    top: 0;
    left: 20px;
    max-width: 200px;
  `}
`;

const SGrade = styled.TouchableOpacity`
  ${({theme}) => css`
    padding: 2px 4px;
    background-color: ${theme.colors.blueRibbon};
    border-radius: 5px;
    position: absolute;
    bottom: -10;
    left: 3;
  `}
`;

const SBadgeText = styled(Text)`
  ${({theme, color}) => css`
    font-size: 8px;
    font-weight: 700;
    color: ${theme.colors.textColor};
    text-transform: uppercase;
    white-space: nowrap;
    max-width: 100%;
    flex-shrink: 1;
    ${color === '#8DE8FE' &&
    css`
      color: ${theme.colors.haiti};
    `}
  `}
`;

const SContainerTitle = styled.View`
  ${({theme, size}) => css`
    bottom: 0;
    margin-top: 6px;
  `}
`;

const STitle = styled(Text)`
  ${({theme}) => css`
    font-size: ${theme.font.sizes.xsm}px;
    text-overflow: ellipsis;
    margin: auto;
    width: 100%;
    max-width: 70px;
  `}
`;

const SBlur = styled.View`
  opacity: 0.7;
  flex: 1;
  background: ${theme.colors.danger};
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 70px;
`;

const Avatar = ({
  style = {},
  source,
  size = 35,
  color = 'transparent',
  border = false,
  badge,
  badgeColor = '',
  title,
  marginTop = 0,
  marginBottom = 0,
  hasError = false,
  disabled = false,
  isPremium = false,
  canGrade = false,
  onPressIcon,
  ...rest
}) => {
  return (
    <>
      <STouchable
        disabled={disabled}
        hasError={hasError}
        style={style}
        activeOpacity={0.8}
        marginBottom={marginBottom}
        marginTop={marginTop}
        {...rest}>
        <SContainerImage isPremium={isPremium} size={size}>
          <SImage
            hasError={hasError}
            color={color}
            source={source}
            border={border}
          />
          {hasError && (
            <>
              <SBlur />
              <Text
                marginTop={4}
                textAlign="center"
                color={theme.colors.danger}
                fontSize={theme.font.sizes.rg}>
                {hasError}
              </Text>
            </>
          )}
          {badge && (
            <SBadge color={color} badgeColor={badgeColor}>
              <SBadgeText numberOfLines={1} color={color}>
                {badge}
              </SBadgeText>
            </SBadge>
          )}
          {canGrade && (
            <SGrade onPress={onPressIcon}>
              <FontAwesome name="graduation-cap" color="white" />
            </SGrade>
          )}
        </SContainerImage>
        {title && (
          <SContainerTitle size={size}>
            <STitle numberOfLines={1}>{title}</STitle>
          </SContainerTitle>
        )}
      </STouchable>
    </>
  );
};

export default Avatar;
