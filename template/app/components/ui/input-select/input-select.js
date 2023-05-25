import React, {useState} from 'react';
import Text from '../text';
import {View, Dimensions, StyleSheet} from 'react-native';
import styled, {css} from 'styled-components/native';
import {CustomizePicker} from 'react-native-single-multi-select-fully-customized';
import theme from '@app/theme';
import Icon from '../icon';
import Button from '../button';
import {useCallback} from 'react';
import SelectedItems from './selected-items';
import {useEffect} from 'react';
import {useMemo} from 'react';

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
    ${({isFocus, touched}) =>
      (isFocus || touched) &&
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
    
    border: 2px solid ${theme.colors.white};
    ${
      hasError &&
      css`
        color: ${theme.colors.danger};
        border: 2px solid ${theme.colors.danger};
      `
    }
  `}
`;

const STextInput = styled(Text)`
  flex: 1;
  font-size: ${theme.font.sizes.rg}px;
  color: ${theme.colors.white};
  font-family: ${theme.font.families.mavenPro.regular};
  text-align: left;
  padding-left: 18px;
`;

const STextError = styled(Text)`
  color: ${theme.colors.danger};
  font-size: ${theme.font.sizes.sm}px;
  margin-top: 4px;
  margin-left: 4px;
`;

const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');

const styles = StyleSheet.create({
  modalContainer: {
    //flexDirection: 'row',
    //alignItems: 'center',
    maxHeight: viewportHeight * 0.7,
    marginHorizontal: -theme.container.sm,
    borderRadius: 10,
    backgroundColor: theme.colors.haiti,
  },
  itemLabelStyle: {
    textTransform: 'capitalize',
    color: theme.colors.white,
    fontFamily: theme.font.families.mavenPro.medium,
  },
  itemStyle: {
    borderRadius: 10,
    marginVertical: 4,
    marginHorizontal: 8,
  },
  itemActiveStyle: {
    backgroundColor: theme.colors.blueRibbon,
  },
});

const PLaceholder = ({
  placeholder,
  marginBottom = 12,
  marginTop = 0,
  onPressed,
  hasError,
  hasIconLeft = false,
  iconLeft,
  onFocus,
  onBlur,
  text,
  ...rest
}) => {
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
  return (
    <SView marginBottom={marginBottom} marginTop={marginTop}>
      <SInput
        hasError={hasError}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onPress={onPressed}
        activeOpacity={0.8}>
        <View flexDirection="row" alignItems="center">
          {hasIconLeft && <View paddingLeft={18}>{iconLeft}</View>}
          <STextInput onBlur={handleBlur} onFocus={handleFocus}>
            {text !== 'undefined' ? text : placeholder}
          </STextInput>
          <Icon name="arrow-bottom" size={8} color={theme.colors.white} />
        </View>
      </SInput>
      {hasError && <STextError>{hasError}</STextError>}
    </SView>
  );
};

const InputSelect = ({
  isMulti = false,
  placeholder,
  hasIconLeft,
  data = [],
  iconLeft,
  isFocus,
  touched,
  hasError,
  preRempli = [],
  getValues = () => {},
  ...rest
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [multiSelectedValues, setMultiSelectedValues] = useState([]);
  const [arrayOfObjects, setArrayOfObject] = useState(
    preRempli.length > 0 ? preRempli : [],
  );

  useEffect(() => {
    console.log('pre', preRempli);
    console.log('data', data);
    if (data.length) {
      if (preRempli.length > 0) {
        var array = [];
        for (var i = 0; i < preRempli.length; i++) {
          array.push(
            data.filter(
              items =>
                items.id === preRempli[i] || items.id === preRempli[i].id,
            ),
          );
        }
        let final = array.map(item => {
          console.log('item', item);
          return item[0].id;
        });

        let finalObject = array.map(item => {
          return item[0];
        });

        setMultiSelectedValues(final);
        setArrayOfObject(finalObject);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRemove = useCallback(
    (id, array, isObject) => {
      if (!isObject) {
        const newStateIds = array.filter(ids => ids !== id);
        setMultiSelectedValues(newStateIds);
        const newStateObject = array.filter(item => item !== id);
        let objs = [];
        newStateObject.map(item => {
          const tmp = data.filter(it => it.id === item);
          objs.push(tmp[0]);
        });
        setArrayOfObject(objs);
        getValues(newStateIds);
      } else {
        const newStateObject = array.filter(item => item.id !== id);
        setArrayOfObject(newStateObject);
      }
    },
    [data, getValues],
  );

  const select = selected => {
    if (!isMulti) {
      setSelectedValue(selected.id);
      setArrayOfObject(selected);
      getValues(selected);
      setIsVisible(false);
    } else if (isMulti) {
      setMultiSelectedValues(prevState => {
        if (prevState.includes(selected.id)) {
          return handleRemove(selected.id, prevState, false);
        }
        var tempArray = [...prevState, selected.id];
        getValues([...new Set(tempArray)]);
        return [...new Set(tempArray)];
      });
      setArrayOfObject(prevState => {
        if (prevState.includes(selected)) {
          return handleRemove(selected.id, prevState, true);
        }
        var tempArray = [...prevState, selected];
        return [...new Set(tempArray)];
      });
    }
  };

  return (
    <View>
      <CustomizePicker
        visible={isVisible}
        key={'custome label and value'}
        items={data}
        onItemPress={(item, index) => {
          select(item);
        }}
        isMultiPick={isMulti}
        selectedValue={!isMulti ? selectedValue : multiSelectedValues}
        placeholder={'Custome label and value'}
        getLabel={item => item.name || item.text}
        getValue={item => item.id}
        itemStyle={styles.itemStyle}
        itemActiveStyle={styles.itemActiveStyle}
        itemLabelStyle={styles.itemLabelStyle}
        renderFooter={() => {
          return (
            <View paddingTop={10} paddingHorizontal={theme.spaces.rg}>
              {isMulti && (
                <Button
                  size="small"
                  onPress={() => setIsVisible(!isVisible)}
                  title="Valider"
                />
              )}
              <Button
                size="small"
                color="secondary"
                onPress={() => setIsVisible(!isVisible)}
                title="Annuler"
              />
            </View>
          );
        }}
        renderPlaceholder={() => {
          return (
            <PLaceholder
              hasError={hasError}
              text={
                isMulti && multiSelectedValues.length > 0
                  ? `${multiSelectedValues.length} sélectionnés`
                  : `${arrayOfObjects.name || arrayOfObjects.text}`
              }
              iconLeft={iconLeft}
              hasIconLeft={hasIconLeft}
              onPressed={() => setIsVisible(!isVisible)}
              placeholder={placeholder}
            />
          );
        }}
        placeholderOnpress={() => setIsVisible(true)}
        containerStyle={styles.modalContainer}
      />
      {isMulti && <SelectedItems data={arrayOfObjects} />}
    </View>
  );
};

export default InputSelect;
