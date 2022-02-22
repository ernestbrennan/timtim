import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

// core components
import GridContainer from "$admin/ui-components/Grid/GridContainer.js";
import GridItem from "$admin/ui-components/Grid/GridItem.js";
import CustomInput from "$admin/ui-components/CustomInput/CustomInput.js";

import customSelectStyle from "$admin/assets/jss/customSelectStyle.js";
import {getList as getCityList} from "$admin/api/city";
import SelectLocationMap from '$js/map/SelectLocationMap'
import {streetTypes} from '$js/utils/realty';

const style = {
  infoText: {
    fontWeight: "300",
    margin: "10px 0 30px",
    textAlign: "center",
  },
  inputAdornmentIcon: {
    color: "#555",
  },
  choiche: {
    textAlign: "center",
    cursor: "pointer",
    marginTop: "20px",
  },

  ...customSelectStyle,
};

class Step2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: [],
      cityId: null,
      longitude: null,
      latitude: null,
      name: null,
    };
  }

  async componentDidMount() {
    let {results} = await getCityList();

    this.setState({
      cities: results
    });
  }

  sendState() {
    return this.state;
  }

  isValidated() {
    return true;
  }

  getCurrentCity() {
    return this.state.cities.find(i => i.id === this.props.globalProp.city_id)
  }

  setLngLat(longitude, latitude) {
    this.props.globalProp.setLongitude(longitude)
    this.props.globalProp.setLatitude(latitude)
    this.forceUpdate()
  }

  render() {
    const {classes} = this.props;
    return (
      <div>
        <GridContainer justify="center">
          <GridItem xs={12} sm={10}>
            <FormControl fullWidth className={classes.selectFormControl}>
              <InputLabel className={classes.selectLabel}>
                Город
              </InputLabel>
              <Select
                MenuProps={{className: classes.selectMenu}}
                classes={{select: classes.select}}
                value={this.props.globalProp.city_id || ''}
                onChange={event => {
                  this.props.globalProp.setCityId(event.target.value);
                  this.forceUpdate()
                }}
              >
                {this.state.cities.map((city, index) =>
                  <MenuItem
                    key={index}
                    classes={{
                      root: classes.selectMenuItem,
                      selected: classes.selectMenuItemSelected,
                    }}
                    value={city.id}
                  >
                    {city.name}
                  </MenuItem>
                )}
              </Select>
            </FormControl>
          </GridItem>
          <GridItem xs={12} sm={10} style={{marginBottom: 30}}>

            <GridContainer>
              <GridItem xs={12} sm={4}>
                <FormControl fullWidth className={classes.selectFormControl}>
                  <InputLabel className={classes.selectLabel}>
                    Тип улицы
                  </InputLabel>
                  <Select
                    MenuProps={{className: classes.selectMenu}}
                    classes={{select: classes.select}}
                    value={this.props.globalProp.street_type || ''}
                    onChange={event => {
                      this.props.globalProp.setStreetType(event.target.value);
                      this.forceUpdate()
                    }}
                  >
                    {streetTypes.map((item, index) =>
                      <MenuItem
                        key={index}
                        classes={{
                          root: classes.selectMenuItem,
                          selected: classes.selectMenuItemSelected,
                        }}
                        value={item.value}
                      >
                        {item.label}
                      </MenuItem>
                    )}
                  </Select>
                </FormControl>
              </GridItem>
              <GridItem xs={12} sm={5}>
                <CustomInput
                  labelText="Название Улицы"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    defaultValue: this.props.globalProp.street_name,
                    onChange: (event) => {
                      this.props.globalProp.setStreetName(event.target.value);
                      this.forceUpdate()
                    },
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={3}>
                <CustomInput
                  labelText="Номер дома"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    defaultValue: this.props.globalProp.house_number,
                    onChange: (event) => {
                      this.props.globalProp.setHouseNumber(event.target.value);
                    },
                  }}
                />
              </GridItem>
            </GridContainer>
          </GridItem>

          {this.props.globalProp.city_id && this.getCurrentCity() && (
            <GridItem xs={12} sm={10}>
              <SelectLocationMap
                height={400}
                bbox={this.getCurrentCity().bbox}
                longitude={this.props.globalProp.longitude}
                latitude={this.props.globalProp.latitude}
                setLngLat={(lng, lat) => this.setLngLat(lng, lat)}
              />
            </GridItem>
          )}

        </GridContainer>
      </div>
    );
  }
}

Step2.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(style)(Step2);
