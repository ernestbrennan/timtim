import React, {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import {getRouteByKey} from "$admin/routes";
import GridContainer from "$admin/ui-components/Grid/GridContainer.js";
import GridItem from "$admin/ui-components/Grid/GridItem.js";
import RealtyForm from '$admin/components/realty-form'

import Realty from "$js/models/Realty";
import {getById, edit} from '$admin/api/realty';

export default () => {
  let { id } = useParams();
  const history = useHistory();
  const [realty, setRealty] = useState(null);

  useEffect(async () => {
    const {results} = await getById(id)

    setRealty(new Realty(results));
  }, []);
  //
  // const realty = new Realty();
  // realty.initDefaults()
  const handleEdit = async (e) => {

    let {results} = await edit(realty)

    // const route = getRouteByKey('realty_list');
    // history.push(route.path);
  }

  return (
    <GridContainer justify="center">
      <GridItem xs={12} sm={8}>
        {/*<RealtyForm realty={realty} onFinishButtonClick={handleEdit}>*/}

        {/*</RealtyForm>*/}
        {/*<RealtyForm realty={realty} onFinishButtonClick={handleEdit}/>*/}
        {realty && <RealtyForm realty={realty} onFinishButtonClick={handleEdit}/>}
      </GridItem>
    </GridContainer>
  );
}
