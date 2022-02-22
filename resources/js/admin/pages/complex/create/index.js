import React from "react";
import {useHistory} from "react-router-dom";
import {generatePath} from "react-router";
import {getRouteByKey} from "$admin/routes";
import GridContainer from "$admin/ui-components/Grid/GridContainer.js";
import GridItem from "$admin/ui-components/Grid/GridItem.js";
import ComplexForm from '$admin/components/complex-form'

import {create} from '$admin/api/complex';
import Complex from "$js/models/Complex";

export default () => {
  const history = useHistory();
  const complex = new Complex();
  complex.initDefaults()

  const handleCreate = async (e) => {

    const {results} = await create(complex)

    history.push(generatePath(getRouteByKey('complex_edit').path, {
      id: results.id
    }));
  }

  return (
    <GridContainer justify="center">
      <GridItem xs={12} sm={8}>
        <ComplexForm
          complex={complex}
          onFinishButtonClick={handleCreate}
        />
      </GridItem>
    </GridContainer>
  );
}
