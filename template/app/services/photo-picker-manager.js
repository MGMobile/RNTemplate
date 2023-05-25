import {showActionSheet} from '@app/utils/alerts';
import {Dimensions} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

const {width: viewportWidth} = Dimensions.get('window');
export default class PhotoPickerManager {
  static pickImage = () =>
    new Promise(async (resolve, reject) => {
      try {
        const index = await showActionSheet([
          'Librairie photo',
          'Prendre une photo',
        ]);
        const file = await this.openImagePicker(index);

        if (file) {
          return resolve(file);
        }

        // return reject();
      } catch {
        return reject();
      }
    });

  static openImagePicker = index =>
    new Promise(async (resolve, reject) => {
      const options = {
        width: viewportWidth,
        height: Math.round(viewportWidth * 1.33),
        multiple: false,
        mediaType: 'photo',
        compressImageQuality: 0.8,
        cropping: false,
        useFrontCamera: true,
        loadingLabelText: 'Chargement...',
        showCropGuidelines: false,
      };

      try {
        let response;
        if (index === 0) {
          response = await ImagePicker.openPicker(options);
        } else {
          response = await ImagePicker.openCamera(options);
        }

        const file = {
          uri: response.path,
          type: response.mime,
        };

        resolve(file);
      } catch (e) {
        reject(e);
      }
    });
}
