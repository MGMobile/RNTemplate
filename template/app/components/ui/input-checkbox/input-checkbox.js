import React, {forwardRef, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import Checkbox from '../checkbox';
import Text from '../text';
import {useDispatch} from 'react-redux';
import AnimalActions from '@app/redux/animal/animal.actions';

const SInputContainer = styled.View`
  height: 35px;
  width: 100%;
`;

const SInput = styled.View`
  flex: 1;
  font-size: ${({theme}) => `${theme.font.sizes.rg}px`};
  line-height: 19px;
  background: white;
  padding-left: 16px;
  border-radius: 36px;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  width: 100%;
  })}
`;

const InputCheckbox = forwardRef(
  (
    {
      date = '',
      heure = '',
      onPressed,
      checkState = false,
      center = false,
      style = {marginBottom: 5},
      inputStyle = {},
      eventId,
      traitementId,
      ...rest
    },
    ref,
  ) => {
    const dispatch = useDispatch();
    const [checked, setChecked] = useState(checkState);

    const onPressedCheckbox = () => {
      setChecked(!checked);
      onPressedInput();
    };

    const onPressedInput = () => {
      // eslint-disable-next-line no-new
      new Promise((resolve, reject) => {
        dispatch(
          AnimalActions.validerPrise(
            traitementId,
            eventId,
            heure,
            checked,
            resolve,
            reject,
          ),
        );
      });
    };

    return (
      <TouchableOpacity
        eventId={eventId}
        traitementId={traitementId}
        activeOpacity={0.8}
        onPressIn={onPressedCheckbox}
        onPress={onPressedInput}
        style={style}>
        <SInputContainer>
          <SInput ref={ref} center={center} style={inputStyle} {...rest}>
            <Text>{date}</Text>
            <Text>{heure}</Text>
            <TouchableOpacity
              style={{marginRight: 10}}
              onPress={onPressedInput}
              onPressIn={onPressedCheckbox}
              activeOpacity={0.8}>
              <Checkbox checked={checked} />
            </TouchableOpacity>
          </SInput>
        </SInputContainer>
      </TouchableOpacity>
    );
  },
);

export default InputCheckbox;
