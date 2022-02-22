import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import GridContainer from "$admin/ui-components/Grid/GridContainer.js";
import GridItem from "$admin/ui-components/Grid/GridItem.js";
import ComplexForm from '$admin/components/complex-form'

import Complex from "$js/models/Complex";
import {getById, edit} from '$admin/api/complex';

export default () => {
  let { id } = useParams();
  const [complex, setComplex] = useState(null);

  useEffect(async () => {
    const {results} = await getById(id)
    setComplex(new Complex(results));
  }, []);

  const handleEdit = async () => {
    await edit(complex)
  }

  return (
    <GridContainer justify="center">
      <GridItem xs={12} sm={8}>
        {complex && <ComplexForm complex={complex} onFinishButtonClick={handleEdit}/>}
      </GridItem>
    </GridContainer>
  );
}
