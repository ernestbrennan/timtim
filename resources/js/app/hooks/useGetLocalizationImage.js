import { useSelector } from 'react-redux';
import {SupportedLanguageCodes} from '$app/utlis/localization'

function useLocalizationImage(baseName, imageDir = 'img/', imageType = 'png') {
  const currentLanguage = useSelector((state) => state.ui.language) || SupportedLanguageCodes.ua;
  try {
    return require(`@app/${imageDir}${baseName}_${currentLanguage}.${imageType}`);
  } catch (e) {
    console.error(
      `Failed while loading a localized image: ${imageDir}${baseName}_${currentLanguage}.${imageType}`,
    );
    return null; //TODO: implement error handling here
  }
}

export default useLocalizationImage;
