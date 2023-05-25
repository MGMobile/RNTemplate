import React, {useEffect, useState} from 'react';
import styled, {css} from 'styled-components/native';
import theme from '@app/theme';
import Text from '@app/components/ui/text';
import Avatar from '@app/components/ui/avatar';
import Button from '@app/components/ui/button';
import Icon from '@app/components/ui/icon';
import {SCREEN_NAMES} from '@app/navigation/navigation.types';
import {useSelector} from 'react-redux';
import {userSelector} from '@app/redux/account/account.selectors';
import {View} from 'react-native';

const SProfilBackground = styled.ImageBackground`
  align-items: center;
`;

const SContainer = styled.View`
  padding: ${theme.container.modal}px;
  padding-top: ${theme.container.modal + 10}px;
  padding-bottom: ${theme.container.modal - 10}px;
  align-items: center;
  background: rgba(61, 86, 248, 0.7);
  width: 100%;
`;

const SClose = styled.TouchableOpacity`
  position: absolute;
  right: ${theme.container.modal}px;
  top: ${theme.container.modal}px;
`;

const SPseudo = styled(Text)`
  ${({fontSize}) => css`
    font-size: 13px;
    font-weight: 700;
    color: ${theme.colors.white};
    margin-top: 4px;
    margin-bottom: ${theme.spaces.rg}px;
  `}
`;

const ModalProfil = ({
  navigation,
  pseudo,
  userSource,
  sport,
  id,
  eventId,
  isPremium,
  note,
  isUserPremium,
  ...rest
}) => {
  const [bgSource, setBgSource] = useState();

  const userRedux = useSelector(userSelector);

  useEffect(() => {
    switch (sport) {
      case 'football':
        setBgSource(require('@app/assets/images/sports/but-foot.jpg'));
        break;
      case 'tennis':
        setBgSource(require('@app/assets/images/sports/homme-tennis.jpg'));
        break;
      default:
        setBgSource('@app/assets/images/sports/but-foot.jpg');
    }
  }, [sport]);

  const goBack = () => {
    navigation.goBack();
  };

  const goToProfile = () => {
    navigation.navigate(SCREEN_NAMES.PROFILE, id);
  };

  const goToUnsubscribe = () => {
    navigation.navigate(SCREEN_NAMES.MODALS.UNSUBSCRIBE_EVENT, {
      userId: id,
      eventId: eventId,
      onNavigationGoBack: ({navigation: _navigation}) => {
        _navigation.goBack();
      },
    });
  };

  return (
    <>
      <SProfilBackground
        id={id}
        sport={sport}
        source={bgSource}
        resizeMode="cover"
        {...rest}>
        <SContainer>
          <View flexDirection="row" alignItems="center">
            <Avatar isPremium={isPremium} source={userSource} size={80} />
            {isUserPremium ? (
              <Text
                style={{marginLeft: 14}}
                fontWeight="bold"
                fontSize={37}
                verticalAlign="bottom">
                {note}
                <Text fontWeight="bold" fontSize={13}>
                  /10
                </Text>
              </Text>
            ) : (
              <View alignItems="flex-end" flexDirection="row">
                <Icon
                  style={{marginLeft: 14, marginRight: 4}}
                  name="interrogation"
                  size={33}
                  color="white"
                />
                <Text fontWeight="bold" fontSize={13}>
                  /10
                </Text>
              </View>
            )}
          </View>
          <SPseudo>{pseudo}</SPseudo>
          <Button onPress={goToProfile} title="Voir le profil" maxWidth="160" />
          <SClose
            onPress={goBack}
            activeOpacity={0.8}
            hitSlop={{left: 16, top: 16, right: 16, bottom: 16}}>
            <Icon name="cross" size={20} color={theme.colors.white} />
          </SClose>
        </SContainer>
      </SProfilBackground>
      {userRedux.id === id && (
        <SContainer>
          <Button title="Se désinscrire" onPress={goToUnsubscribe} />
        </SContainer>
      )}
    </>
  );
};

export default ModalProfil;
