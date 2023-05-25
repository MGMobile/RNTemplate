/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import {mySportsSelector} from '@app/redux/account/account.selectors';
import React from 'react';
import {useEffect} from 'react';
import {useMemo} from 'react';
import {useState} from 'react';
import {Text} from 'react-native';
import {useSelector} from 'react-redux';
import styled, {css} from 'styled-components/native';

const SView = styled.View`
  ${({theme}) => css`
    flex-direction: row;
  `}
`;

const STouchable = styled.TouchableOpacity`
  ${({theme, selected, addSport}) => css`
    height: ${addSport ? 48 : 65}px;
    flex: 1;
    border-radius: 18px;
    justify-content: center;
    align-items: center;
    background: ${selected ? theme.colors.dodgerBlue : theme.colors.fiord};
  `}
`;

const STouchableIcon = styled.TouchableOpacity`
  ${({theme, selected, addSport}) => css`
    height: ${addSport ? 35 : 50}px;
    width: ${addSport ? 35 : 50}px;
    border-radius: 18px;
    justify-content: center;
    align-items: center;
    margin-right: 5px;
    background: ${selected ? theme.colors.dodgerBlue : theme.colors.fiord};
  `}
`;

const SText = styled(Text)`
  ${({theme}) => css`
    color: white;
    font-size: ${({size}) => size}px;
    line-height: ${({size}) => size}px;
    font-family: ${theme.font.families.mavenPro.bold};
  `}
`;

const STextSubtitle = styled(Text)`
  ${({theme}) => css`
    color: white;
    font-size: 14px;
    line-height: 14px;
    font-family: ${theme.font.families.mavenPro.regular};
  `}
`;

const SImageGray = styled.Image`
  ${({theme, selected}) => css`
    width: ${({iconSize}) => iconSize}px;
    height: ${({iconSize}) => iconSize}px;
    ${!selected &&
    css`
      tint-color: grey;
    `}
  `}
`;

const SImage = styled.Image`
  ${({theme}) => css`
    width: ${({iconSize}) => iconSize}px;
    height: ${({iconSize}) => iconSize}px;
    position: absolute;
    opacity: 0.3;
  `}
`;

const ButtonRadio = ({
  textLeft,
  subtitleLeft,
  textRight,
  subtitleRight,
  selected,
  clicked,
  disabled = false,
  size = 18,
  iconSize = 34,
  sportId,
  addSport = false,
  selectLeft = false,
  selectRight = false,
  marginBottom = 20,
  marginTop = 20,
  isIconBar = false,
  signup,
  getSelected = () => {},
  onClickLeft = () => {},
  onClickRight = () => {},
  style = {},
  textStyle = {},
  ...props
}) => {
  const mySports = useSelector(mySportsSelector);
  const [sportArray, setSportArray] = useState(sportId);

  useEffect(() => {
    setTimeout(() => {
      if (addSport) {
        setSportArray(sportId);
      } else if (sportId !== undefined) {
        var arr = [];
        for (var i = 0; i < sportId.length; i++) {
          arr.push(sportId[i].sport_id);
        }
      } else {
        var arr = [];
        for (var i = 0; i < mySports.length; i++) {
          arr.push(mySports[i].sport_id);
        }
        setSportArray(arr);
      }
    }, 500);
  }, [mySports, sportId]);

  const renderContent = useMemo(() => {
    return !isIconBar ? (
      <SView marginBottom={marginBottom} marginTop={marginTop}>
        <STouchable
          disabled={disabled}
          addSport
          onPress={onClickLeft}
          selected={selectLeft}
          style={{marginRight: 9}}
          activeOpacity={0.8}>
          <SText selected={selectLeft} size={size}>
            {textLeft}
          </SText>
          {subtitleLeft && (
            <STextSubtitle selected={selectLeft} size={size}>
              {subtitleLeft}
            </STextSubtitle>
          )}
        </STouchable>
        <STouchable
          addSport
          disabled={disabled}
          onPress={onClickRight}
          selected={selectRight}
          activeOpacity={0.8}>
          <SText selected={selectRight} size={size}>
            {textRight}
          </SText>
          {subtitleRight && (
            <STextSubtitle selected={selectRight} size={size}>
              {subtitleRight}
            </STextSubtitle>
          )}
        </STouchable>
      </SView>
    ) : (
      <SView marginBottom={marginBottom} marginTop={marginTop}>
        {sportArray?.length > 0 ? (
          sportArray?.map((item, index) => {
            return (
              <>
                {(item === 1 || item.sport_id === 1 || signup) && (
                  <STouchableIcon
                    disabled={disabled}
                    iconSize={iconSize}
                    addSport={addSport}
                    onPress={onClickLeft}
                    selected={selectLeft}
                    style={{marginRight: 9}}
                    activeOpacity={0.8}>
                    <SImageGray
                      iconSize={iconSize}
                      selected={selectLeft}
                      source={require('@app/assets/images/sports/football.png')}
                    />
                    <SImage
                      iconSize={iconSize}
                      selected={selectLeft}
                      source={require('@app/assets/images/sports/football.png')}
                    />
                  </STouchableIcon>
                )}
                {(item === 2 || item.sport_id === 2 || signup) && (
                  <STouchableIcon
                    disabled={disabled}
                    iconSize={iconSize}
                    addSport={addSport}
                    onPress={onClickRight}
                    selected={selectRight}
                    activeOpacity={0.8}>
                    <SImageGray
                      iconSize={iconSize}
                      selected={selectRight}
                      source={require('@app/assets/images/sports/tennis.png')}
                    />
                    <SImage
                      iconSize={iconSize}
                      selected={selectRight}
                      source={require('@app/assets/images/sports/tennis.png')}
                    />
                  </STouchableIcon>
                )}
              </>
            );
          })
        ) : (
          <>
            <STouchableIcon
              disabled={disabled}
              iconSize={iconSize}
              addSport={addSport}
              onPress={onClickLeft}
              selected={selectLeft}
              style={{marginRight: 9}}
              activeOpacity={0.8}>
              <SImageGray
                iconSize={iconSize}
                selected={selectLeft}
                source={require('@app/assets/images/sports/football.png')}
              />
              <SImage
                iconSize={iconSize}
                selected={selectLeft}
                source={require('@app/assets/images/sports/football.png')}
              />
            </STouchableIcon>
            <STouchableIcon
              disabled={disabled}
              iconSize={iconSize}
              addSport={addSport}
              onPress={onClickRight}
              selected={selectRight}
              activeOpacity={0.8}>
              <SImageGray
                iconSize={iconSize}
                selected={selectRight}
                source={require('@app/assets/images/sports/tennis.png')}
              />
              <SImage
                iconSize={iconSize}
                selected={selectRight}
                source={require('@app/assets/images/sports/tennis.png')}
              />
            </STouchableIcon>
          </>
        )}
      </SView>
    );
  }, [
    addSport,
    iconSize,
    isIconBar,
    marginBottom,
    marginTop,
    onClickLeft,
    onClickRight,
    selectLeft,
    selectRight,
    signup,
    size,
    disabled,
    sportArray,
    subtitleLeft,
    subtitleRight,
    textLeft,
    textRight,
  ]);

  return renderContent;
};

export default ButtonRadio;
