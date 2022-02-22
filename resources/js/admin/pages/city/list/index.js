import React, {useState, useEffect, Suspense} from "react";

// @material-ui/core components
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import {makeStyles} from "@material-ui/core/styles";
// @material-ui/icons
import Assignment from "@material-ui/icons/Assignment";
import MapIcon from "@material-ui/icons/Map";
import Check from "@material-ui/icons/Check";
import Checkbox from "@material-ui/core/Checkbox";
// core components
import GridContainer from "$admin/ui-components/Grid/GridContainer.js";
import GridItem from "$admin/ui-components/Grid/GridItem.js";
import Button from "$admin/ui-components/CustomButtons/Button.js";
import Card from "$admin/ui-components/Card/Card.js";
import CardBody from "$admin/ui-components/Card/CardBody.js";
import CardIcon from "$admin/ui-components/Card/CardIcon.js";
import CardHeader from "$admin/ui-components/Card/CardHeader.js";
import ReactTable from "$admin/ui-components/ReactTable/ReactTable.js";

import {getList} from '$admin/api/city'
import customCheckboxRadioSwitch from "$admin/assets/jss/customCheckboxRadioSwitch";
import modalStyle from "$admin/assets/jss/modalStyle";
import BBoxSnippet from '$js/map/BBoxSnippet'

import {cardTitle} from "$admin/assets/jss/index.js";

const styles = (theme) => ({
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px",
  },

  ...customCheckboxRadioSwitch,
  ...modalStyle(theme),

  cardDialog: {
    width: 600
  }
})

const useStyles = makeStyles(styles);

export default function ReactTables() {

  const [items, setItems] = useState([]);
  const [staticMap, setStaticMap] = useState({
    modal: false,
    bbox: null
  });

  const handleActiveClick = (event) => {
    console.log(event);
    // setState({ ...state, [event.target.name]: event.target.checked });
  };
  const showStaticMap = (city) => {
    setStaticMap({
      modal: true,
      bbox: city.bbox
    })
  };
  const closeStaticMap = () => {
    setStaticMap({
      modal: false,
    })
  };

  useEffect(async () => {
    let response = await getList();

    // let items = response.results.;
    setItems(response.results)
  }, [])

  const classes = useStyles();
  return (
    <GridContainer>
      <GridItem xs={12}>
        <Card>
          <CardHeader color="primary" icon>
            <CardIcon color="primary">
              <Assignment/>
            </CardIcon>
            <h4 className={classes.cardIconTitle}>React Table</h4>
          </CardHeader>
          <CardBody>
            <ReactTable
              columns={[
                {
                  Header: "Id",
                  accessor: "id",
                },
                {
                  Header: "Name",
                  accessor: "name",
                },
                {
                  Header: "Slug",
                  accessor: "slug",
                },
                {
                  Header: "Is Active",
                  accessor: "is_active",
                },
                {
                  Header: "Icon",
                  accessor: "icon",
                },
                {
                  Header: "Actions",
                  accessor: "actions",
                },
              ]}
              data={items.map(city => {
                return {
                  id: city.id,
                  name: city.name,
                  slug: city.slug,
                  is_active: (
                    <Checkbox
                      key={city.id}
                      checked={city.is_active}
                      tabIndex={-1}
                      onClick={handleActiveClick}
                      checkedIcon={<Check className={classes.checkedIcon}/>}
                      icon={<Check className={classes.uncheckedIcon}/>}
                      classes={{
                        checked: classes.checked,
                        root: classes.checkRoot,
                      }}
                    />
                  ),
                  icon: (
                    <img src={city.icon} alt="..." style={{width: 60}}/>
                  ),
                  actions: (
                    <div className="actions-right">
                      <Button
                        justIcon
                        round
                        simple
                        onClick={() => {
                          showStaticMap(city)
                        }}
                        color="info"
                        className="like"
                      >
                        <MapIcon/>
                      </Button>{" "}
                    </div>
                  )
                }
              })}
            />
          </CardBody>
        </Card>

        <Dialog
          classes={{
            root: classes.modalRoot,
            paper: classes.modal,
          }}
          style={{ overflowY: "hidden" }}
          open={staticMap.modal}
          keepMounted
          onClose={() => closeStaticMap()}
        >
          <DialogContent className={classes.modalBody} style={{ width: 600 }}>
            {staticMap.bbox && <BBoxSnippet height={400} bbox={staticMap.bbox}/>}
          </DialogContent>
        </Dialog>
      </GridItem>
    </GridContainer>
  );
}
