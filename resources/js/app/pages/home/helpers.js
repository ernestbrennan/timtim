import useGetFullRoute from '$app/hooks/useGetFullRoute';
import Routes from '$app/utlis/routes';

export function useGetRouteForSearchType(searchType) {
  return useGetFullRoute(
    ((searchType) => {
      switch (searchType) {
        case 0: {
          return Routes.rent;
        }
        case 1: {
          return Routes.sale;
        }
        case 2: {
          return Routes.complexList;
        }
        default: {
          throw new Error(`No route for search type ${searchType}`);
        }
      }
    })(searchType),
  );
}
