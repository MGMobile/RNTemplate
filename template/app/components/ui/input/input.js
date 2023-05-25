import React, {forwardRef, useCallback, useState} from 'react';
import styled, {css} from 'styled-components/native';
import theme from '@app/theme';
import Text from '@app/components/ui/text';
import Icon from '@app/components/ui/icon';

const SView = styled.View`
  ${({marginTop, marginBottom}) => css`
    margin-top: ${marginTop}px;
    margin-bottom: ${marginBottom}px;
  `}
`;

const SInput = styled.View`
  ${({iconRight, iconLeft, isPassword, multiline}) => css`
    flex-direction: row;
    min-height: 48px;
    padding: 0px 18px;
    background: transparent;
    border-radius: 14px;
    border: 2px solid ${theme.colors.white};

  ${({isFocus, touched, login}) =>
    (isFocus || touched) &&
    !login &&
    css`
      color: ${theme.colors.blueRibbon};
      border: 2px solid ${theme.colors.blueRibbon};
    `}}
    
  ${({hasError}) =>
    hasError &&
    css`
      color: ${theme.colors.danger};
      border: 2px solid ${theme.colors.danger};
    `}
  
    ${
      multiline &&
      css`
        min-height: 150px;
        align-items: flex-start;
      `
    }
    ${
      iconLeft &&
      css`
        padding-left: 0px;
      `
    }
    ${
      (iconRight || isPassword) &&
      css`
        padding-right: 0px;
      `
    }
  `}
`;

const STextInput = styled.TextInput`
  ${({multiline}) => css`
    flex-direction: row;
    flex: 1;
    font-size: ${theme.font.sizes.rg}px;
    text-align: left;
    padding: 0px;
    font-family: ${theme.font.families.mavenPro.regular};
    color: ${theme.colors.white};
    ${multiline &&
    css`
      padding-top: 13px;
      padding-bottom: 13px;
    `}
  `}
`;

const SButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  min-width: 48px;
`;

const SIcon = styled(Icon)`
  ${({isFocus, touched, login}) => css`
    color: ${theme.colors.white};
    font-size: 16px;
    ${({isFocus, touched, login}) =>
      (isFocus || touched) &&
      !login &&
      css`
        color: ${theme.colors.blueRibbon};
      `}}
  `}
`;

const STextError = styled(Text)`
  color: ${theme.colors.danger};
  font-size: ${theme.font.sizes.sm}px;
  margin-top: 4px;
  margin-left: 4px;
`;

const Input = forwardRef(
  (
    {
      withButton = false,
      isPassword = false,
      hasError,
      hasSucceed = false,
      touched = false,
      center = false,
      iconLeft,
      iconRight,
      style = {},
      marginBottom = 15,
      marginTop = 0,
      inputStyle = {},
      onFocus,
      onBlur,
      icon,
      labelRight = false,
      keyboardType,
      multiline = false,
      login = false,
      ...rest
    },
    ref,
  ) => {
    const [isPwd, setIsPwd] = useState(isPassword);
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

    const showHidePwd = () => {
      setIsPwd(!isPwd);
    };

    return (
      <SView
        marginBottom={marginBottom}
        marginTop={marginTop}
        isPassword={isPwd}
        style={style}>
        <SInput
          login={login}
          isFocus={isFocus}
          isTouched={touched}
          hasError={hasError}
          iconLeft={iconLeft}
          iconRight={iconRight}
          isPassword={isPassword}
          multiline={multiline}>
          {iconLeft && (
            <SButton disabled activeOpacity={0.8}>
              <SIcon
                isFocus={isFocus}
                isTouched={touched}
                login={login}
                name={iconLeft}
              />
            </SButton>
          )}
          <STextInput
            ref={ref}
            isFocus={isFocus}
            touched={touched}
            hasError={hasError}
            hasSucceed={hasSucceed}
            secureTextEntry={isPwd ? true : false}
            center={center}
            placeholderTextColor={theme.colors.white}
            selectionColor={theme.colors.primary}
            style={inputStyle}
            onFocus={handleFocus}
            onBlur={handleBlur}
            keyboardType={keyboardType}
            multiline={multiline}
            textAlignVertical={multiline ? 'top' : 'auto'}
            {...rest}
          />
          {iconRight && (
            <SButton disabled activeOpacity={0.8}>
              <SIcon
                isFocus={isFocus}
                isTouched={touched}
                login={login}
                name={iconRight}
              />
            </SButton>
          )}
          {isPassword && (
            <SButton onPress={showHidePwd} activeOpacity={0.8}>
              <SIcon
                isFocus={isFocus}
                isTouched={touched}
                login={login}
                name="eye-open"
              />
            </SButton>
          )}
        </SInput>
        {hasError && <STextError>{hasError}</STextError>}
      </SView>
    );
  },
);

export default React.memo(Input);
