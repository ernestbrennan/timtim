import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Checkbox from "@material-ui/core/Checkbox";

// core components
import GridContainer from "$admin/ui-components/Grid/GridContainer.js";
import GridItem from "$admin/ui-components/Grid/GridItem.js";
import ToggleButton from "$admin/ui-components/CustomButtons/ToggleButton";

import {heatingTypes, buildingTypes, entranceTypes, wallTypes, parkingTypes} from '$js/utils/realty'

const style = {};

class Step4 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }

  sendState() {
    return this.state;
  }

  isValidated() {
    return true;
  }

  updateEntranceTypes(value) {
    let types = this.props.globalProp.entrance_types;
    types = types.includes(value) ? types.filter(type => type !== value) : types.concat([value])

    this.props.globalProp.setEntranceTypes(types)
    this.forceUpdate()
  }
  updateParkingTypes(value) {
    let types = this.props.globalProp.parking_types;

    types = types.includes(value) ? types.filter(type => type !== value) : types.concat([value])

    this.props.globalProp.setParkingTypes(types)
    this.forceUpdate()
  }

  render() {
    const {classes} = this.props;
    return (
      <>
        <GridContainer style={{marginBottom: 30}}>
          <GridItem xs={12} sm={12} md={3} style={{alignSelf: 'center'}}>
            Отопление
          </GridItem>
          <GridItem xs={12} sm={12} md={9}>
            {
              heatingTypes.map((item, index) =>
                <ToggleButton
                  key={index}
                  color="rose"
                  round
                  selected={this.props.globalProp.heating_type === item.value}
                  onClick={() => {
                    this.props.globalProp.setHeatingType(item.value);
                    this.forceUpdate()
                  }}
                >
                  {item.label}
                </ToggleButton>
              )
            }
          </GridItem>
        </GridContainer>
        <GridContainer style={{marginBottom: 30}}>
          <GridItem xs={12} sm={12} md={3} style={{alignSelf: 'center'}}>
            Подьезд
          </GridItem>
          <GridItem xs={12} sm={12} md={9}>
            {
              entranceTypes.map((item, index) =>
                <ToggleButton
                  key={index}
                  color="rose"
                  round
                  selected={this.props.globalProp.entrance_types.includes(item.value)}
                  onClick={() => this.updateEntranceTypes(item.value)}
                >
                  {item.label}
                </ToggleButton>
              )
            }
          </GridItem>
        </GridContainer>
        <GridContainer style={{marginBottom: 30}}>
          <GridItem xs={12} sm={12} md={3} style={{alignSelf: 'center'}}>
            Тип стен
          </GridItem>
          <GridItem xs={12} sm={12} md={9}>
            {
              wallTypes.map((item, index) =>
                <ToggleButton
                  key={index}
                  color="rose"
                  round
                  selected={this.props.globalProp.wall_type === item.value}
                  onClick={() => {
                    this.props.globalProp.setWallType(item.value);
                    this.forceUpdate()
                  }}
                >
                  {item.label}
                </ToggleButton>
              )
            }
          </GridItem>
        </GridContainer>
        <GridContainer style={{marginBottom: 30}}>
          <GridItem xs={12} sm={12} md={3} style={{alignSelf: 'center'}}>
            Тип дома
          </GridItem>
          <GridItem xs={12} sm={12} md={9}>
            {
              buildingTypes.map((item, index) =>
                <ToggleButton
                  key={index}
                  color="rose"
                  round
                  selected={this.props.globalProp.building_type === item.value}
                  onClick={() => {
                    this.props.globalProp.setBuildingType(item.value);
                    this.forceUpdate()
                  }}
                >
                  {item.label}
                </ToggleButton>
              )
            }
          </GridItem>
        </GridContainer>
        <GridContainer style={{marginBottom: 30}}>
          <GridItem xs={12} sm={12} md={3} style={{alignSelf: 'center'}}>
            Паркинг
          </GridItem>
          <GridItem xs={12} sm={12} md={9}>
            {
              parkingTypes.map((item, index) =>
                <ToggleButton
                  key={index}
                  color="rose"
                  round
                  selected={this.props.globalProp.parking_types.includes(item.value)}
                  onClick={() => this.updateParkingTypes(item.value)}
                >
                  {item.label}
                </ToggleButton>
              )
            }
          </GridItem>
        </GridContainer>

      </>
    );
  }
}

Step4.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(style)(Step4);
