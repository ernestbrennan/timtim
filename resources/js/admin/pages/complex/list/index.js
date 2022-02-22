import React, {useState, useEffect} from "react";
import {generatePath} from "react-router";

// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
// @material-ui/icons
import Assignment from "@material-ui/icons/Assignment";
import Dvr from "@material-ui/icons/Dvr";
import AddIcon from "@material-ui/icons/Add";
import Favorite from "@material-ui/icons/Favorite";
import Close from "@material-ui/icons/Close";
import EditIcon from "@material-ui/icons/Edit";
// core components
import GridContainer from "$admin/ui-components/Grid/GridContainer.js";
import GridItem from "$admin/ui-components/Grid/GridItem.js";
import Button from "$admin/ui-components/CustomButtons/Button.js";
import Card from "$admin/ui-components/Card/Card.js";
import CardBody from "$admin/ui-components/Card/CardBody.js";
import CardIcon from "$admin/ui-components/Card/CardIcon.js";
import CardHeader from "$admin/ui-components/Card/CardHeader.js";
import ReactTable from "$admin/ui-components/ReactTable/ReactTable.js";

import {cardTitle} from "$admin/assets/jss/index.js";

import customCheckboxRadioSwitch from "$admin/assets/jss/customCheckboxRadioSwitch";

import {getList} from '$admin/api/complex'
import {getRouteByKey} from "$admin/routes";

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
  const editRoute = getRouteByKey('complex_edit');

  useEffect(async () => {
    const {results} = await getList();

    setItems(results)
  }, [])

  const classes = useStyles();
  return (
    <GridContainer>
      <GridItem xs={12}>
        <GridContainer justify={'flex-end'}>
          <GridItem>
            <Button color="primary" justIcon to={"/app/complex/create"} round>
              <AddIcon/>
            </Button>
          </GridItem>
        </GridContainer>
      </GridItem>
      <GridItem xs={12}>
        <Card>
          <CardHeader color="primary" icon>
            <CardIcon color="primary">
              <Assignment/>
            </CardIcon>
            <h4 className={classes.cardIconTitle}>Complex Table</h4>
          </CardHeader>
          <CardBody>
            <ReactTable
              columns={[
                {Header: "Id", accessor: "id",},
                {Header: "Actions", accessor: "actions",},
              ]}
              data={items.map((item) => {
                return {
                  id: item.id,
                  actions: (
                    <div className="actions-right">
                      <Button
                        justIcon
                        round
                        simple
                        color="info"
                        to={generatePath(editRoute.path, {id: item.id})}
                      >
                        <EditIcon/>
                      </Button>
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
