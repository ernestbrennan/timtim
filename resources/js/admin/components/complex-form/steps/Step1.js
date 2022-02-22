import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import SunEditor from 'suneditor-react';

// core components
import GridContainer from "$admin/ui-components/Grid/GridContainer.js";
import GridItem from "$admin/ui-components/Grid/GridItem.js";
import CustomInput from "$admin/ui-components/CustomInput/CustomInput.js";
import ToggleButton from "$admin/ui-components/CustomButtons/ToggleButton";
import customSelectStyle from "$admin/assets/jss/customSelectStyle";
import {currencies} from '$js/config';

const style = {
  ...customSelectStyle,
};

class Step1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
    };
  }

  sendState() {
    return this.state;
  }

  isValidated() {
    return true;
  }

  render() {
    return (
      <GridContainer justify="center">
        <GridItem xs={12} style={{marginBottom: 30}}>
          <CustomInput
            labelText="Название"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              defaultValue: this.props.globalProp.name,
              placeholder: "Цена",
              onChange: (event) => {
                this.props.globalProp.setName(event.target.value);
              },
            }}
          />
        </GridItem>
        <GridItem xs={12} style={{marginBottom: 30}}>
          <legend>Минимальная Цена</legend>

          <GridContainer>
            <GridItem xs={12} sm={4}>
              <CustomInput
                labelText="Мин цена за м²"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  defaultValue: this.props.globalProp.min_per_square_meter_price,
                  placeholder: "Мин цена за м²",
                  type: "number",
                  onChange: (event) => {
                    this.props.globalProp.setMinPerSquareMeterPrice(event.target.value);
                  },
                }}
              />
            </GridItem>
            <GridItem xs={12} sm={4}>
              <CustomInput
                labelText="Мин полная стоимость"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  defaultValue: this.props.globalProp.min_full_price,
                  placeholder: "Мин полная стоимость",
                  type: "number",
                  onChange: (event) => {
                    this.props.globalProp.setMinFullPrice(event.target.value);
                  },
                }}
              />
            </GridItem>
            <GridItem xs={12} sm={4}>
              <ToggleButton
                color="rose"
                round
                selected={this.props.globalProp.currency === currencies.usd.value}
                onClick={() => {
                  this.props.globalProp.setCurrency(currencies.usd.value);
                  this.forceUpdate()
                }}
              >
                USD
              </ToggleButton>
              <ToggleButton
                color="rose"
                round
                selected={this.props.globalProp.currency === currencies.sum.value}
                onClick={() => {
                  this.props.globalProp.setCurrency(currencies.sum.value);
                  this.forceUpdate()
                }}
              >
                SUM
              </ToggleButton>
            </GridItem>
          </GridContainer>
        </GridItem>
        <GridItem xs={12} style={{marginBottom: 30}}>
          <legend>Дата здачи</legend>

          <GridContainer>
            <GridItem xs={12} sm={6}>
              <CustomInput
                labelText="Год"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  defaultValue: this.props.globalProp.nearest_release_year,
                  placeholder: "Год",
                  type: "number",
                  onChange: (event) => {
                    this.props.globalProp.setNearestReleaseYear(event.target.value);
                  },
                }}
              />
            </GridItem>
            <GridItem xs={12} sm={6}>
              <CustomInput
                labelText="Квартал"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  defaultValue: this.props.globalProp.nearest_release_quarter,
                  placeholder: "Квартал",
                  type: "number",
                  onChange: (event) => {
                    this.props.globalProp.setNearestReleaseQuarter(event.target.value);
                  },
                }}
              />
            </GridItem>
          </GridContainer>
        </GridItem>

        <GridItem xs={12}>

          <legend>Описание</legend>

          <SunEditor
            defaultValue={this.props.globalProp.description}
            onChange={value => this.props.globalProp.setDescription(value)}
            height={400}
          />
        </GridItem>
      </GridContainer>
    );
  }
}

Step1.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(style)(Step1);
