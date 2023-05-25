/* eslint-disable react-native/no-inline-styles */
import React, {forwardRef, useState} from 'react';
import {View, Text, Platform, Switch} from 'react-native';
import styled, {css, useTheme} from 'styled-components/native';
import Icon from '@app/components/ui/icon';

const SViewContainer = styled.TouchableOpacity`
  ${({theme}) => css`
    flex-direction: row;
    align-items: center;
    margin-bottom: ${Platform.OS === 'android' ? '-1' : '-3'}px;
  `}
`;

const SSwitchLabel = styled(Text)`
  flex: 1;
  font-size: ${({theme}) => `${theme.font.sizes.rg}px`};
  color: ${({theme}) => `${theme.colors.boulder}`};
  line-height: 17px;
  text-align: left;
  font-family: ${({theme}) => theme.font.families.montserrat.regular};
  margin-left: 5px;
`;

const STextError = styled(Text)`
  ${({theme}) => css`
    color: ${({theme}) => `${theme.colors.carnation}`};
    font-size: ${({theme}) => `${theme.font.sizes.sm}px`};
    margin-top: 4px;
  `}
`;

const SSwitch = forwardRef(
  (
    {
      hasError = false,
      style = {},
      value,
      disabled = false,
      toggleSwitch = {},
      InputLabel,
      hasIcon = false,
      SwitchStyle = {},
      getSwitchValue = () => {},
      onChange = () => {},
      ...rest
    },
    ref,
  ) => {
    const [inputValue, setInputValue] = useState(value);

    const onChangeSwitch = () => {
      setInputValue(!inputValue);
      getSwitchValue(inputValue);
    };

    const theme = useTheme();
    return (
      <View style={[{marginBottom: 12}, style]}>
        <SViewContainer onPress={onChangeSwitch} activeOpacity={0.8}>
          {InputLabel && (
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
              {hasIcon && <Icon name="round-info" />}
              <SSwitchLabel>{InputLabel}</SSwitchLabel>
            </View>
          )}
          <Switch
            disabled={disabled}
            style={[
              {
                ...Platform.select({
                  android: {
                    transform: [{scaleX: 1.1}, {scaleY: 1.1}],
                  },
                  ios: {
                    transform: [{scaleX: 0.9}, {scaleY: 0.9}],
                  },
                }),
                alignSelf: 'flex-start',
              },
              SwitchStyle,
            ]}
            trackColor={{
              false: theme.colors.white,
              true: theme.colors.white,
            }}
            onValueChange={onChange}
            value={value}
            thumbColor={value ? theme.colors.primary : theme.colors.fiord}
          />
        </SViewContainer>
        {hasError && <STextError>Switch error.</STextError>}
      </View>
    );
  },
);

export default SSwitch;
