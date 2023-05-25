/* eslint-disable react-hooks/exhaustive-deps */
import React, {forwardRef, useState} from 'react';
import styled, {css} from 'styled-components/native';
import Text from '@app/components/ui/text';
import {View} from 'react-native';
import {useRef} from 'react';
import {useMemo} from 'react';
import {useEffect} from 'react';

const STouchableOpacity = styled.TouchableOpacity`
  ${({theme, isRadio, marginBottom, marginTop}) => css`
    flex-direction: row;
    margin-top: ${marginTop}px;
    margin-bottom: ${marginBottom}px;
    ${isRadio &&
    css`
      padding: 16px 20px;
      background: rgba(66, 71, 106, 0.75);
      border-radius: 14px;
      min-height: 50px;
    `};
  `}
`;

const SCheckbox = styled.View`
  ${({theme, isRadio, size}) => css`
    align-items: center;
    justify-content: center;
    width: ${size}px;
    height: ${size}px;
    border-radius: 3px;
    background: transparent;
    border: 2px solid ${theme.colors.primary};
    margin-right: 10px;
    ${isRadio &&
    css`
      border-radius: ${size}px;
    `};
  `}
`;

const SCheck = styled.View`
  ${({theme, isRadio, size}) => css`
    width: ${size - 8}px;
    height: ${size - 8}px;
    border-radius: 2px;
    background-color: ${theme.colors.primary};
    ${isRadio &&
    css`
      border-radius: ${size}px;
    `};
  `}
`;

const SLabel = styled(Text)`
  ${({theme}) => css`
    flex-direction: row;
    flex: 1;
    color: ${theme.colors.white};
    font-size: ${theme.font.sizes.rg};
  `}
`;

const SError = styled(Text)`
  ${({theme, marginTop}) => css`
    margin-top: ${marginTop};
    color: ${theme.colors.danger};
    font-size: ${theme.font.sizes.sm};
  `}
`;

const CustomCheckbox = forwardRef(
  (
    {
      hasError = false,
      data = [],
      size = 16,
      checked = false,
      isRadio,
      indexChecked = undefined,
      label,
      isList = false,
      marginBottom = 10,
      marginTop = 0,
      disabled = false,
      getIndexChecked = () => {},
      getCheckedValue = () => {},
      ...rest
    },
    ref,
  ) => {
    const [inputValue, setInputValue] = useState(checked);
    const [arrayIndex, setIndexArray] = useState([indexChecked]);

    useEffect(() => {
      setIndexArray([indexChecked]);
    }, [indexChecked]);

    const arrayOfIndex = useRef([]);

    const pressed = index => {
      setIndexArray([index]);
      if (arrayOfIndex[0] === index) {
        setInputValue(true);
      }
    };

    const onChangeChecked = index => {
      if (isList) {
        pressed(index);
        getIndexChecked(index);
      } else {
        setInputValue(!inputValue);
        getCheckedValue(!inputValue);
      }
    };

    const renderContent = useMemo(() => {
      if (!isList) {
        return (
          <>
            <STouchableOpacity
              disabled={disabled}
              hasError={hasError}
              isList={isList}
              indexChecked={indexChecked}
              checked={checked}
              marginTop={marginTop}
              marginBottom={marginBottom}
              isRadio={isRadio}
              activeOpacity={0.8}
              onPress={onChangeChecked}
              {...rest}>
              <SCheckbox checked={inputValue} isRadio={isRadio} size={size}>
                {inputValue && <SCheck size={size} isRadio={isRadio} />}
              </SCheckbox>
              <SLabel>{label}</SLabel>
            </STouchableOpacity>
            {hasError && <SError marginTop={-5}>{hasError}</SError>}
          </>
        );
      } else {
        return data.map((item, index) => {
          return (
            <View marginBottom={10}>
              <STouchableOpacity
                disabled={disabled}
                isList={isList}
                checked={inputValue}
                marginTop={marginTop}
                marginBottom={marginBottom}
                isRadio={isRadio}
                activeOpacity={0.8}
                onPress={() => onChangeChecked(index)}
                {...rest}>
                <SCheckbox
                  checked={
                    arrayIndex[0] === index ||
                    arrayIndex[indexChecked] === index
                      ? true
                      : false
                  }
                  isRadio={isRadio}
                  size={size}>
                  {arrayIndex[0] === index && (
                    <SCheck size={size} isRadio={isRadio} />
                  )}
                </SCheckbox>
                <SLabel>{item.nom ? item.nom : ''}</SLabel>
              </STouchableOpacity>
              {index === data.length - 1 && hasError && (
                <SError marginTop={10}>{hasError}</SError>
              )}
            </View>
          );
        });
      }
    }, [
      arrayIndex,
      checked,
      data,
      hasError,
      indexChecked,
      inputValue,
      isList,
      isRadio,
      label,
      marginBottom,
      marginTop,
      onChangeChecked,
      rest,
      size,
    ]);

    return renderContent;
  },
);

export default CustomCheckbox;
