import {SCREEN_NAMES} from '@app/navigation/navigation.types';
import RNLocation from 'react-native-location';
import * as NavigationService from '@app/services/navigation';
import {Platform, Alert, Linking} from 'react-native';

const config = {
  distanceFilter: 0,
  desiredAccuracy: {
    ios: 'best',
    android: 'highAccuracy',
  },
};

const locationConfig = {
  ios: 'whenInUse',
  android: {
    detail: 'fine',
  },
};

const permissionTexts = {
  title: 'Activer la géolocalisation',
  description:
    'Activez la géolocalisation pour voir et être vu des membres à proximité.',
  confirmBtnTitle: 'Activer',
  denyBtnTitle: 'Plus tard',
};

class LocationService {
  static checkPermission() {
    return RNLocation.checkPermission(locationConfig);
  }

  static getCurrentPermission() {
    return RNLocation.getCurrentPermission();
  }

  static requestPermission() {
    return RNLocation.requestPermission({
      ...locationConfig,
      android: {
        ...locationConfig.android,
      },
    });
  }

  static getLatestLocation() {
    return RNLocation.getLatestLocation({
      timeout: 5000,
    });
  }

  static getCurrentLocation(redirectToSettings = false, callback) {
    return new Promise(async (resolve, reject) => {
      try {
        await RNLocation.configure(config);

        try {
          const currentPermission =
            await LocationService.getCurrentPermission();
          if (currentPermission === 'denied') {
            await LocationService.requestPermission();
            // if (redirectToSettings && Platform.OS === 'ios') {
            //   NavigationService.navigate(SCREEN_NAMES.MODALS.NO_LOCATION);
            // }

            return reject('permission denied');
          }

          const getLatestLocation = async () => {
            try {
              if (callback) {
                callback();
              }

              const latestLocation = await LocationService.getLatestLocation();
              if (latestLocation) {
                return resolve(latestLocation);
              } else {
                return reject('timeout');
              }
            } catch (error) {
              return reject(error);
            }
          };

          const hasPermission = await LocationService.checkPermission();
          if (!hasPermission) {
            if (Platform.OS === 'android') {
              // Show custom modal
              return NavigationService.navigate(SCREEN_NAMES.MODALS.CONFIRM, {
                title: permissionTexts.title,
                content: permissionTexts.description,
                confirmBtnTitle: permissionTexts.confirmBtnTitle.toUpperCase(),
                onConfirmBtnPress: async ({navigation}) => {
                  navigation.goBack();

                  // Ask for system permissions
                  const granted = await LocationService.requestPermission();
                  if (!granted) {
                    return reject('permission denied');
                  }

                  // Get latest location if granted
                  return getLatestLocation();
                },
                extraBtns:
                  // Apple refuses native permission modal delayed, we force to show native permission modal
                  Platform.OS === 'android'
                    ? [permissionTexts.denyBtnTitle.toUpperCase()]
                    : [],
                onExtraBtnsPress: ({navigation}) => {
                  navigation.goBack();
                  return reject('cancel');
                },
              });
            } else {
              const granted = await LocationService.requestPermission();
              if (!granted) {
                return reject('permission denied');
              }

              // Get latest location if granted
              return getLatestLocation();
            }
          }

          // Get latest location if permissions already granted
          return getLatestLocation();
        } catch (error) {
          return reject(error);
        }
      } catch (error) {
        if (redirectToSettings && Platform.OS === 'ios') {
          setTimeout(
            () => NavigationService.navigate(SCREEN_NAMES.MODALS.NO_LOCATION),
            500,
          );
        }
        return reject('System location off');
      }
    });
  }

  static getCurrentLocationWithoutModal(redirectToSettings = false) {
    return new Promise(async (resolve, reject) => {
      try {
        await RNLocation.configure(config);
        const granted = await LocationService.requestPermission();

        // Ask for system permissions
        const currentPermission = await LocationService.checkPermission();
        if (!currentPermission && redirectToSettings) {
          NavigationService.navigate(SCREEN_NAMES.MODALS.NO_LOCATION);
        }

        // Get latest location if granted
        try {
          const latestLocation = await LocationService.getLatestLocation();
          if (latestLocation) {
            return resolve(latestLocation);
          } else {
            return reject('timeout');
          }
        } catch (error) {
          return reject(error);
        }
      } catch {
        if (Platform.OS === 'ios' && redirectToSettings) {
          setTimeout(
            () => NavigationService.navigate(SCREEN_NAMES.MODALS.NO_LOCATION),
            500,
          );
        }
        return reject('System location off');
      }
    });
  }
}

export default LocationService;
