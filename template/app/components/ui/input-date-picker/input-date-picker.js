/* eslint-disable react-native/no-inline-styles */
import React, {forwardRef, useState} from 'react';
import {Text, Platform} from 'react-native';
import styled, {css} from 'styled-components/native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import theme from '@app/theme';
import dayjs from 'dayjs';
import Icon from '@app/components/ui/icon';

const SView = styled.View`
  ${({marginTop, marginBottom}) => css`
    margin-top: ${marginTop}px;
    margin-bottom: ${marginBottom}px;
  `}
`;

const SInput = styled.TouchableOpacity`
  ${({hasError}) => css`
    flex-direction: row;
    align-items: center;
    min-height: 48px;
    padding: 0px 18px 0 0;
    background: transparent;
    border-radius: 14px;
    border: 2px solid ${theme.colors.white};
    ${hasError &&
    css`
      color: ${theme.colors.danger};
      border: 2px solid ${theme.colors.danger};
    `}
  `}
`;

const STextInput = styled(Text)`
  flex: 1;
  font-size: ${theme.font.sizes.rg}px;
  color: ${theme.colors.white};
  font-family: ${theme.font.families.mavenPro.regular};
  text-align: left;
`;

const SButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  min-width: 48px;
`;

const SIcon = styled(Icon)`
  color: ${theme.colors.white};
  font-size: 18px;
`;

const STextError = styled(Text)`
  color: ${theme.colors.danger};
  font-size: ${theme.font.sizes.sm}px;
  margin-top: 4px;
  margin-left: 4px;
`;

const InputDatePicker = forwardRef(
  (
    {
      hasError = false,
      style = {},
      inputStyle = {},
      isSet = false,
      placeholder = '',
      withIcon = true,
      onChangeDate = () => {},
      onChangeDateFull = () => {},
      value = placeholder,
      time,
      error = 'Erreur date',
      marginBottom = 15,
      marginTop = 0,
      disabled,
      onBlur,
      ...rest
    },
    ref,
  ) => {
    const [date, setDate] = useState(value);
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = selectedDate => {
      console.log('se', selectedDate);
      if (time && typeof selectedDate !== 'string') {
        setDate(dayjs(selectedDate).format('HH:mm'));
        onChangeDate(dayjs(selectedDate).format('HH:mm'));
        onChangeDateFull(selectedDate);
      } else if (!time && typeof selectedDate !== 'string') {
        setDate(dayjs(selectedDate).format('DD/MM/YYYY'));
        onChangeDate(dayjs(selectedDate).format('DD/MM/YYYY'));
        onChangeDateFull(selectedDate);
      }
    };

    const onConfirmPressed = e => {
      onChange(e);
      setShow(false);
    };

    const showMode = currentMode => {
      setShow(!show);
      if (!time) {
        setDate(dayjs().format('DD/MM/YYYY'));
      } else {
        setDate(dayjs().format('HH:mm'));
      }
      setMode(currentMode);
    };

    const showDatepicker = () => {
      !time ? showMode('date') : showMode('time');
    };

    return (
      <SView time={time} marginBottom={marginBottom} marginTop={marginTop}>
        <SInput
          disabled={disabled}
          hasError={hasError}
          onPress={showDatepicker}
          activeOpacity={0.8}>
          <SButton disabled activeOpacity={0.8}>
            <SIcon name={time === true ? 'clock' : 'calendar'} />
          </SButton>
          <STextInput style={inputStyle} {...rest}>
            {typeof date === 'object'
              ? dayjs(date).format('DD/MM/YYYY') || dayjs(date).format('HH:mm')
              : date}
          </STextInput>
        </SInput>
        {hasError && <STextError>{hasError}</STextError>}
        <DateTimePicker
          isVisible={show}
          mode={mode}
          cancelTextIOS="Annuler"
          buttonTextColorIOS={theme.colors.pine_green}
          confirmTextIOS="Confirmer"
          onConfirm={onConfirmPressed}
          onCancel={() => setShow(false)}
          onChange={onChange}
          // date={Platform.OS === 'ios' ? date : new Date(date)}
          // value={date}
          display={Platform.OS === 'android' ? 'default' : 'inline'}
          locale="fr-FR"
        />
      </SView>
    );
  },
);

export default InputDatePicker;
