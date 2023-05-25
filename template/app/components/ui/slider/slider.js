import React, {useCallback} from 'react';
import {View} from 'react-native';
import {Slider} from '@miblanchard/react-native-slider';
import styled, {css} from 'styled-components/native';
import theme from '@app/theme';
import Text from '@app/components/ui/text';
import {useState} from 'react';
import {useEffect} from 'react';

const SView = styled.View`
  ${({marginBottom, marginTop}) => css`
    margin-top: ${marginTop}px;
    margin-bottom: ${marginBottom}px;
  `}
`;

const SCritere = styled(Text)`
  font-size: ${theme.font.sizes.rg}px;
  color: ${theme.colors.textColor};
`;

const SValueContainer = styled.View`
  ${({hasError}) => css`
    min-height: 23px;
    width: 90px;
    padding: 0px 13px 0 0;
    background: transparent;
    border-radius: 6px;
    border: 2px solid ${theme.colors.primary};
    ${hasError &&
    css`
      border: 2px solid ${theme.colors.danger};
    `}
  `}
`;

const SValue = styled(Text)`
  font-size: ${theme.font.sizes.rg}px;
  color: ${theme.colors.textColor};
  text-align: right;
`;

const STextError = styled(Text)`
  color: ${theme.colors.danger};
  font-size: ${theme.font.sizes.sm}px;
  margin-top: 4px;
  margin-left: 4px;
`;

const SSlider = ({
  onlySlider = false,
  marginTop = '0',
  marginBottom = '15',
  hasError = false,
  maxValue = 100,
  critere,
  value = 0,
  onChangeValue = () => {},
  ...rest
}) => {
  const [sliderColor, setSliderColor] = useState(theme.colors.chineseSilver);

  useEffect(() => {
    onChangeSlider(value);
  }, []);

  const onChangeSlider = useCallback(
    value => {
      const parsedValue = parseInt(value, 10);
      if (maxValue === 100) {
        if (parsedValue >= 0 && parsedValue < 50) {
          setSliderColor(theme.colors.chineseSilver);
        }
        if (parsedValue > 49 && parsedValue < 60) {
          setSliderColor(theme.colors.lemonDrops);
        }
        if (parsedValue > 59 && parsedValue < 70) {
          setSliderColor(theme.colors.dandyLion);
        }
        if (parsedValue > 69 && parsedValue < 80) {
          setSliderColor(theme.colors.autumnOrange);
        }
        if (parsedValue > 79 && parsedValue < 90) {
          setSliderColor(theme.colors.tomatoConcasse);
        }
        if (parsedValue > 89 && parsedValue < 101) {
          setSliderColor(theme.colors.redPegasus);
        }
      } else {
        if (parsedValue >= 0 && parsedValue < 5) {
          setSliderColor(theme.colors.chineseSilver);
        }
        if (parsedValue > 4.9 && parsedValue < 6) {
          setSliderColor(theme.colors.lemonDrops);
        }
        if (parsedValue > 5.9 && parsedValue < 7) {
          setSliderColor(theme.colors.dandyLion);
        }
        if (parsedValue > 6.9 && parsedValue < 8) {
          setSliderColor(theme.colors.autumnOrange);
        }
        if (parsedValue > 7.9 && parsedValue < 9) {
          setSliderColor(theme.colors.tomatoConcasse);
        }
        if (parsedValue > 8.9 && parsedValue < 10) {
          setSliderColor(theme.colors.redPegasus);
        }
      }
    },
    [value],
  );

  return (
    <SView marginBottom={marginBottom} marginTop={marginTop}>
      {!onlySlider && (
        <View
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center">
          <SCritere>{critere}</SCritere>
          <SValueContainer hasError={hasError}>
            <SValue>{value}</SValue>
          </SValueContainer>
        </View>
      )}
      <Slider
        value={value}
        maximumValue={maxValue}
        animationType="timing"
        onValueChange={onChangeSlider}
        trackStyle={{
          backgroundColor: theme.colors.fiord,
          height: 8,
          borderRadius: 6,
        }}
        trackClickable={false}
        thumbStyle={{borderColor: 'white', borderWidth: 6}}
        thumbTintColor={sliderColor}
        minimumTrackTintColor={sliderColor}
        animateTransitions={true}
        onSlidingComplete={value => onChangeValue(parseInt(value, 10))}
        {...rest}
      />
      {hasError && <STextError>{hasError}</STextError>}
    </SView>
  );
};

export default SSlider;
