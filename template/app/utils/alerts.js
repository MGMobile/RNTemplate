import {Platform, ActionSheetIOS} from 'react-native';
import DialogAndroid from 'react-native-dialogs';
import appTheme from '@app/theme';

export const showActionSheet = (options = []) =>
  new Promise(async (resolve, reject) => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: [...options, 'Annuler'].map(item => item.toUpperCase()),
          cancelButtonIndex: options.length,
          tintColor: appTheme.colors.monza,
        },
        buttonIndex => {
          if (buttonIndex === options.length) {
            return reject();
          }

          return resolve(buttonIndex);
        },
      );
    } else {
      const {selectedItem} = await DialogAndroid.showPicker(null, null, {
        contentColor: appTheme.colors.monza,
        positiveText: null,
        negativeText: 'ANNULER',
        items: options.map((label, id) => ({
          id,
          label: label.toUpperCase(),
        })),
      });
      if (selectedItem) {
        return resolve(selectedItem.id);
      }

      return reject();
    }
  });
