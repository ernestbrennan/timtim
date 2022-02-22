import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import CustomInput from "$admin/ui-components/CustomInput/CustomInput.js";
import GridContainer from "$admin/ui-components/Grid/GridContainer.js";
import GridItem from "$admin/ui-components/Grid/GridItem.js";

import {getList} from "$admin/api/feature";

const style = {}

class Step3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      features: []
    };
  }

  async componentDidMount (){
    let {results} = await getList();

    this.setState({
      features: results.filter(i => i.category_slug === 'characteristics')
    });
  }

  change(id, value) {
    console.log(this.props.globalProp.characteristics.find(i => i.feature_id === id))
    let characteristics = this.props.globalProp.characteristics.filter(i => i.feature_id !== id);

    if (value.length) {
      characteristics.push({feature_id: id, value: value})
    }

    this.props.globalProp.setCharacteristics(characteristics);
    this.forceUpdate()
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
          {this.state.features.map((item, key) => (
            <GridItem  sm={12} md={6} key={key}>
              <CustomInput
                value={item.feature_id + '' +  item.id}
                labelText={
                  <span>{item.name}</span>
                }
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  defaultValue: this.props.globalProp.characteristics.find(i => i.feature_id === item.id)?.value || '',
                  onChange: (event) => this.change(item.id, event.target.value),
                  endAdornment: (
                    <svg style={{marginRight: 10, width: 25}} data-src={item.icon} />
                  ),
                }}
              />
            </GridItem>
          ))}
        </GridContainer>
      </>
    );
  }
}

Step3.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(style)(Step3);
