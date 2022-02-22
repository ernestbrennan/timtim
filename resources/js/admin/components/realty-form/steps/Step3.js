import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import CustomInput from "$admin/ui-components/CustomInput/CustomInput.js";
import GridContainer from "$admin/ui-components/Grid/GridContainer.js";
import GridItem from "$admin/ui-components/Grid/GridItem.js";
import ToggleButton from "$admin/ui-components/CustomButtons/ToggleButton";

const style = {}

class Step3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  sendState() {
    return this.state;
  }

  isValidated() {
    return true;
  }

  render() {
    return (
      <>
        <GridContainer style={{marginBottom: 30}}>
          <GridItem xs={12} sm={12} md={3} style={{alignSelf: 'center'}}>
            Количество комнат
          </GridItem>
          <GridItem xs={12} sm={12} md={9}>
            {this.props.room_counts.map((item, index) =>
              <ToggleButton
                key={index}
                color="rose"
                round
                selected={this.props.globalProp.room_count === item.value}
                onClick={() => {
                  this.props.globalProp.setRoomCount(item.value);
                  this.forceUpdate()
                }}
              >
                <svg data-src={item.icon}/>
                {item.label}
              </ToggleButton>
            )}
          </GridItem>
        </GridContainer>
        <GridContainer style={{marginBottom: 30}}>
          <GridItem xs={12} sm={12} md={3} style={{alignSelf: 'center'}}>
            Планировка
          </GridItem>
          <GridItem xs={12} sm={12} md={9}>
            {this.props.layout_types.map((item, index) =>
              <ToggleButton
                key={index}
                color="rose"
                round
                selected={this.props.globalProp.layout_type === item.value}
                onClick={() => {
                  this.props.globalProp.setLayoutType(item.value)
                  this.forceUpdate()
                }}
              >
                <svg data-src={item.icon}/>
                {item.label}
              </ToggleButton>
            )}
          </GridItem>
        </GridContainer>
        <GridContainer style={{marginBottom: 30}}>
          <GridItem xs={12} sm={12} md={3} style={{alignSelf: 'center'}}>
            Санузел
          </GridItem>
          <GridItem xs={12} sm={12} md={9}>
            {this.props.bathroom_types.map((item, index) =>
              <ToggleButton
                key={index}
                color="rose"
                round
                selected={this.props.globalProp.bathroom_type === item.value}
                onClick={() => {
                  this.props.globalProp.setBathroomType(item.value)
                  this.forceUpdate()
                }}
              >
                <svg data-src={item.icon}/>
                {item.label}
              </ToggleButton>
            )}
          </GridItem>
        </GridContainer>
        <GridContainer style={{marginBottom: 30}}>
          <GridItem xs={12} sm={12} md={3} style={{alignSelf: 'center'}}>
            Площадь
          </GridItem>
          <GridItem xs={12} sm={12} md={9}>
            <GridContainer>
              <GridItem xs={12} sm={4}>
                <CustomInput
                  labelText="Общая"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    defaultValue: this.props.globalProp.size_total,
                    onChange: (event) => this.props.globalProp.setSizeTotal(event.target.value),
                    type: 'number'
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={4}>
                <CustomInput
                  labelText="Кухня"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    defaultValue: this.props.globalProp.size_kitchen,
                    onChange: (event) => this.props.globalProp.setSizeKitchen(event.target.value),
                    type: 'number'
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={4}>
                <CustomInput
                  labelText="Жилая"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    defaultValue: this.props.globalProp.size_living,
                    onChange: (event) => this.props.globalProp.setSizeLiving(event.target.value),
                    type: 'number'
                  }}
                />
              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>
        <GridContainer style={{marginBottom: 30}}>
          <GridItem xs={12} sm={12} md={3} style={{alignSelf: 'center'}}>
            Этаж
          </GridItem>
          <GridItem xs={12} sm={12} md={9}>
            <GridContainer>
              <GridItem xs={12} sm={4}>
                <CustomInput
                  labelText="Номер Этажа"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    defaultValue: this.props.globalProp.floor,
                    onChange: (event) => this.props.globalProp.setFloor(event.target.value),
                    type: 'number'
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={4}>
                <CustomInput
                  labelText="Эдажей В Доме"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    defaultValue: this.props.globalProp.floor_count,
                    onChange: (event) => this.props.globalProp.setFloorCount(event.target.value),
                    type: 'number'
                  }}
                />
              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>
        <GridContainer style={{marginBottom: 30}}>
          <GridItem xs={12} sm={12} md={3} style={{alignSelf: 'center'}}>
            Ремонт
          </GridItem>
          <GridItem xs={12} sm={12} md={9}>
            {this.props.condition_types.map((item, index) =>
              <ToggleButton
                key={index}
                color="rose"
                round
                selected={this.props.globalProp.condition_type === item.value}
                onClick={() => {
                  this.props.globalProp.setConditionType(item.value)
                  this.forceUpdate()
                }}
              >
                {item.label}
              </ToggleButton>
            )}
          </GridItem>
        </GridContainer>
        <GridContainer style={{marginBottom: 30}}>
          <GridItem xs={12} sm={12} md={3} style={{alignSelf: 'center'}}>
            Мебель
          </GridItem>
          <GridItem xs={12} sm={12} md={9}>
            {this.props.furniture_types.map((item, index) =>
              <ToggleButton
                key={index}
                color="rose"
                round
                selected={this.props.globalProp.furniture_type === item.value}
                onClick={() => {
                  this.props.globalProp.setFurnitureType(item.value)
                  this.forceUpdate()
                }}
              >
                {item.label}
              </ToggleButton>
            )}
          </GridItem>
        </GridContainer>
      </>
    );
  }
}

Step3.propTypes = {
  classes: PropTypes.object,
};

export default connect(({app}) => {
    return {
      room_counts: app.options.realty.room_counts,
      layout_types: app.options.realty.layout_types,
      bathroom_types: app.options.realty.bathroom_types,
      condition_types: app.options.realty.condition_types,
      furniture_types: app.options.realty.furniture_types,
    };
  },
)(withStyles(style)(Step3));