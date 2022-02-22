import {useSelector} from 'react-redux'

function  useGetHostRoute(route = '') {
  const currentLanguage = useSelector((state) => state.ui.language);
  const hostSiteUrl = process.env.MIX_APP_HOST_SITE

  return currentLanguage ? `${hostSiteUrl}/${currentLanguage}/${route}` : hostSiteUrl
}

export default useGetHostRoute;
