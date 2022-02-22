import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import SunEditor from "suneditor-react";

// core components
import GridContainer from "$admin/ui-components/Grid/GridContainer.js";
import GridItem from "$admin/ui-components/Grid/GridItem.js";
import CustomInput from "$admin/ui-components/CustomInput/CustomInput.js";
import ToggleButton from "$admin/ui-components/CustomButtons/ToggleButton";
import customSelectStyle from "$admin/assets/jss/customSelectStyle";
import {currencies} from '$js/config';
import {connect} from "react-redux";

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

  componentWillUnmount() {
    console.log('step 1 componentWillUnmount')
  }

  sendState() {
    return this.state;
  }

  isValidated() {
    return true;
  }

  render() {
    const {classes} = this.props;
    return (
      <GridContainer justify="center">
        <GridItem xs={12} style={{marginBottom: 30}}>
          <legend>Оренда/Продажа</legend>

          {this.props.adv_types.map((type, index) => (
            <ToggleButton
              key={index}
              color="rose"
              selected={this.props.globalProp.adv_type === type.value}
              onClick={() => {
                this.props.globalProp.setAdvType(type.value);
                this.forceUpdate()
              }}
            >
              {type.label}
            </ToggleButton>
          ))}
        </GridItem>
        <GridItem xs={12} style={{marginBottom: 30}}>
          <legend>Тип недвижимости</legend>
          {this.props.types.map((type, index) => (
            <ToggleButton
              key={index}
              color="rose"
              selected={this.props.globalProp.type === type.value}
              onClick={() => {
                this.props.globalProp.setType(type.value);
                this.forceUpdate()
              }}
            >
              {type.label}
            </ToggleButton>
          ))}
        </GridItem>
        <GridItem xs={12} style={{marginBottom: 30}}>
          <legend>Цена</legend>

          <GridContainer>
            <GridItem xs={12} sm={6}>
              <CustomInput
                id="md3"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  defaultValue: this.props.globalProp.price,
                  placeholder: "Цена",
                  type: "number",
                  onChange: (event) => {
                    this.props.globalProp.setPrice(event.target.value);
                  },
                }}
              />
            </GridItem>
            <GridItem xs={12} sm={6}>
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


        {this.props.globalProp.adv_type === 'rent' && (
          <GridItem xs={12} style={{marginBottom: 30}}>
            <legend>Коммуникальные платежи</legend>

            {this.props.communal_payments_types.map((type, index) => (
              <ToggleButton
                key={index}
                color="rose"
                selected={this.props.globalProp.communal_payments_type === type.value}
                onClick={() => {
                  this.props.globalProp.setCommunalPaymentsType(type.value);
                  this.forceUpdate()
                }}
              >
                {type.label}
              </ToggleButton>
            ))}
          </GridItem>
        )}

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

export default connect(({app}) => {
    return {
      types: app.options.realty.types,
      adv_types: app.options.realty.adv_types,
      communal_payments_types: app.options.realty.communal_payments_types,
    };
  },
)(withStyles(style)(Step1));

// export default ;
