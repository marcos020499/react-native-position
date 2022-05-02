
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { createFormDataAtResource } from '../helpers/formData';

const optionsGallery = {
    title: 'select image',
    type: 'library',
    options: {
      maxHeight: 200,
      maxWidth: 200,
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
    },
  };

const optionsTakePicture = {
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
export default function useCamera (){
    const openGallery = async () => {
        try {
          const images = await launchImageLibrary(optionsGallery);
          const img = images.assets[0];
          const formData = createFormDataAtResource(img)
          const uri = img.uri;
          return { formData, uri };
        } catch (error) {
          return null;
        }
      };

const takePicture = async () => {
    try {
      const images = await launchCamera(optionsTakePicture);
      const img = images.assets[0];
          const formData = createFormDataAtResource(img)
          const uri = img.uri;

          return { formData, uri }
    } catch (error) {
      return null;
    }
  };

  return { openGallery, takePicture}
}