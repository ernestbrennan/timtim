import React, {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import GridContainer from "$admin/ui-components/Grid/GridContainer.js";
import GridItem from "$admin/ui-components/Grid/GridItem.js";
import RealtyForm from '$admin/components/realty-form'

import Realty from "$js/models/Realty";
import {getById, edit} from '$admin/api/realty';

export default () => {
  let {id} = useParams();
  const [realty, setRealty] = useState(null);

  useEffect(async () => {
    const {results} = await getById(id)

    setRealty(new Realty(results));
  }, []);

  const handleEdit = async (e) => {
    await edit(realty)
  }

  return (
    <GridContainer justify="center">
      <GridItem xs={12} sm={8}>
        {realty && <RealtyForm realty={realty} onFinishButtonClick={handleEdit}/>}
      </GridItem>
    </GridContainer>
  );
}
