import React from 'react';
import {Text, View} from 'react-native';
import styled, {css} from 'styled-components/native';
import Icon from '../icon';
import TextCustom from '@app/components/ui/text';

const STouchable = styled.TouchableOpacity`
  ${({
    theme,
    color,
    size,
    disabled,
    iconRight,
    iconLeft,
    maxWidth,
    marginTop,
    marginBottom,
    isDemi,
  }) => css`
    width: ${isDemi ? '49%' : '100%'};
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: ${isDemi ? '6px 5px' : '6px 20px'};
    ${color === 'primary' &&
    css`
      background-color: ${theme.colors.primary};
    `};
    ${color === 'secondary' &&
    css`
      background-color: ${theme.colors.fiord};
    `};
    ${color === 'premium' &&
    css`
      background-color: ${theme.colors.gold};
    `};
    ${size === 'regular' &&
    css`
      min-height: 65px;
      border-radius: 18px;
    `};
    ${size === 'small' &&
    css`
      min-height: 45px;
      border-radius: 12px;
    `};
    ${size === 'note' &&
    css`
      min-height: 20px;
      border-radius: 9px;
      padding: 4px 6px;
    `};
    ${(iconLeft || iconRight) &&
    css`
      justify-content: space-between;
    `};
    ${disabled &&
    css`
      background-color: ${theme.colors.lynch};
    `};

    margin-bottom: ${marginBottom}px;
    margin-top: ${marginTop}px;
    max-width: ${maxWidth};
  `};
`;

const STitle = styled(Text)`
  ${({theme, disabled, color}) => css`
    font-family: ${theme.font.families.mavenPro.bold};
    font-weight: 700;
    font-size: ${theme.font.sizes.md}px;
    text-align: center;
    color: ${color === 'premium' ? '#000' : theme.colors.textColor};
    ${disabled &&
    css`
      color: ${theme.colors.silverChalice};
    `};
  `};
`;

const SSubtitle = styled(Text)`
  ${({theme, disabled, color}) => css`
    font-family: ${theme.font.families.mavenPro.regular};
    font-size: ${theme.font.sizes.sm}px;
    color: ${color === 'premium' ? '#000' : theme.colors.textColor};
    ${disabled &&
    css`
      color: ${theme.colors.silverChalice};
    `};
  `};
`;

const SIconContainer = styled.View`
  ${({theme, hasMarginRight}) => css`
    width: 25px;
    margin-right: ${hasMarginRight ? 10 : 0}px;
  `};
`;

const Button = ({
  title,
  subtitle,
  color = 'primary',
  size = 'regular',
  block = false,
  style = {},
  textStyle = {},
  disabled = false,
  selected = false,
  uppercase = false,
  maxWidth = '100%',
  marginTop = '0',
  marginBottom = '15',
  textRight,
  icon,
  iconLeft,
  iconRight,
  isDemi = false,
  showIconInsteadTitle = false,
  hasMarginRight = true,
  ...rest
}) => {
  return (
    <STouchable
      block={block}
      disabled={disabled}
      selected={selected}
      style={style}
      activeOpacity={0.8}
      color={color}
      size={size}
      iconRight={iconRight}
      iconLeft={iconLeft}
      marginTop={marginTop}
      marginBottom={marginBottom}
      maxWidth={maxWidth}
      isDemi={isDemi}
      {...rest}>
      {(iconLeft || iconRight) && <SIconContainer>{iconLeft}</SIconContainer>}
      <View flexDirection="row" alignItems="center">
        {icon && <View>{icon}</View>}
        <View>
          {showIconInsteadTitle ? (
            <View alignItems="center" flexDirection="row">
              <Icon
                style={{marginLeft: 14, marginRight: 4}}
                name="interrogation"
                size={33}
                color="white"
              />
              <TextCustom fontWeight="bold" fontSize={23} color="white">
                /10 Notes du Match
              </TextCustom>
            </View>
          ) : (
            <STitle
              color={color}
              disabled={disabled}
              selected={selected}
              style={textStyle}>
              {title}
            </STitle>
          )}
          {subtitle && (
            <SSubtitle
              color={color}
              disabled={disabled}
              selected={selected}
              style={textStyle}>
              {subtitle}
            </SSubtitle>
          )}
        </View>
      </View>
      {(iconLeft || iconRight) && (
        <SIconContainer hasMarginRight={hasMarginRight}>
          {iconRight}
        </SIconContainer>
      )}
      {textRight && (
        <STitle
          color={color}
          disabled={disabled}
          selected={selected}
          style={textStyle}>
          {textRight}
        </STitle>
      )}
    </STouchable>
  );
};

export default Button;
