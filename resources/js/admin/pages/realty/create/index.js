import React, {useEffect, useState} from "react";
import { useHistory } from "react-router-dom";
import { generatePath } from "react-router";
import {getRouteByKey} from "$admin/routes";
import GridContainer from "$admin/ui-components/Grid/GridContainer.js";
import GridItem from "$admin/ui-components/Grid/GridItem.js";
import RealtyForm from '$admin/components/realty-form'

import {create} from '$admin/api/realty';
import Realty from "$js/models/Realty";
import {useSelector} from "react-redux";

export default () => {
  const history = useHistory();
  const options = useSelector((state) => state.app.options);

  const [realty, setRealty] = useState(null);
  useEffect(() => {
    if (options.realty) {
      const newRealty = new Realty();
      newRealty.initDefaults(options.realty)

      setRealty(newRealty)
    }

  }, [options]);

  const handleCreate = async (e) => {

    const {results} = await create(realty)

    const route = getRouteByKey('realty_edit');

    history.push(generatePath(route.path, {
      id: results.id
    }));
  }
  
  return (
    <GridContainer justify="center">
      <GridItem xs={12} sm={8}>
        {realty && <RealtyForm realty={realty} onFinishButtonClick={handleCreate}/>}
      </GridItem>
    </GridContainer>
  );
}
