import React from 'react'
import DashboardIcon from '@material-ui/icons/Dashboard';

import {getRouteByKey} from "$admin/routes.js";

export default [
  {label: 'Dashboard', ...getRouteByKey('dashboard'), icon: DashboardIcon},
  {label: 'Cities', ...getRouteByKey('city_list'), icon: "location_city"},
  {label: 'Features', ...getRouteByKey('feature_list'), mini: "FET"},
  {label: 'Realties', ...getRouteByKey('realty_list'), icon: "apartment"},
  {label: 'Complexes', ...getRouteByKey('complex_list'), icon: "corporate_fare"},
  // {label: 'Developers', ...getRouteByKey('developer_list'), icon: "architecture"},
]

