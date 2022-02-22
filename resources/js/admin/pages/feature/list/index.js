import React, {useState, useEffect} from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Assignment from "@material-ui/icons/Assignment";
import Dvr from "@material-ui/icons/Dvr";
import Favorite from "@material-ui/icons/Favorite";
import Close from "@material-ui/icons/Close";
// core components
import GridContainer from "$admin/ui-components/Grid/GridContainer.js";
import GridItem from "$admin/ui-components/Grid/GridItem.js";
import Button from "$admin/ui-components/CustomButtons/Button.js";
import Card from "$admin/ui-components/Card/Card.js";
import CardBody from "$admin/ui-components/Card/CardBody.js";
import CardIcon from "$admin/ui-components/Card/CardIcon.js";
import CardHeader from "$admin/ui-components/Card/CardHeader.js";
import ReactTable from "$admin/ui-components/ReactTable/ReactTable.js";

import { dataTable } from "$admin/variables/general.js";

import { cardTitle } from "$admin/assets/jss/index.js";

import {getList} from '$admin/api/feature'
import Check from "@material-ui/icons/Check";
import Checkbox from "@material-ui/core/Checkbox";
import customCheckboxRadioSwitch from "$admin/assets/jss/customCheckboxRadioSwitch";

const styles = {
  ...customCheckboxRadioSwitch,

  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px",
  },
};

const useStyles = makeStyles(styles);

export default function ReactTables() {
  const [items, setItems] = useState([]);

  const handleActiveClick = (event) => {
    console.log(event);
    // setState({ ...state, [event.target.name]: event.target.checked });
  };

  useEffect( async () => {
    let response = await getList();

    setItems(response.results)
  }, [])

  const classes = useStyles();
  return (
    <GridContainer>
      <GridItem>

      </GridItem>
      <GridItem xs={12}>
        <Card>
          <CardHeader color="primary" icon>
            <CardIcon color="primary">
              <Assignment />
            </CardIcon>
            <h4 className={classes.cardIconTitle}>Realty Table</h4>

          </CardHeader>
          <CardBody>
            <ReactTable
              columns={[
                {Header: "Id", accessor: "id",},
                {Header: "Name", accessor: "name",},
                {Header: "Category", accessor: "category",},
                {Header: "Icon", accessor: "icon",},
              ]}
              data={items.map((feature) => {
                return {
                  id: feature.id,
                  name: feature.name,
                  category: feature.category_name,
                  icon: (
                    <div style={{textAlign: 'right'}}>
                      <svg data-src={feature.icon} />
                    </div>
                  )
                }
              })}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
