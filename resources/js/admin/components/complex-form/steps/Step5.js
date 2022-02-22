import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridContainer from "$admin/ui-components/Grid/GridContainer.js";
import GridItem from "$admin/ui-components/Grid/GridItem.js";

import {getList} from "$admin/api/feature";
import ToggleButton from "$admin/ui-components/CustomButtons/ToggleButton";

const style = {};

class Step5 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      features: []
    };
  }
  async componentDidMount (){
    let {results} = await getList();

    this.setState({
      features: results
    });
  }
  sendState() {
    return this.state;
  }
  isValidated() {
    return true;
  }
  toggleFeature(id) {
    let ids = this.props.globalProp.feature_ids;

    ids = ids.includes(id) ? ids.filter(i => i !== id) : ids.concat([id])

    this.props.globalProp.setFeatureIds(ids)
    this.forceUpdate()
  }
  render() {
    const { classes } = this.props;
    return (
      <GridContainer justify="center">

        <GridItem xs={12} style={{ marginBottom: 30 }}>
          <legend>Бытовая техника</legend>
          {
            this.state.features.filter(f => f.category_slug === 'household_appliances').map(feature =>
              <ToggleButton
                key={feature.id}
                color="rose"
                round
                value={feature.id}
                selected={this.props.globalProp.feature_ids.includes(feature.id)}
                onClick={() => this.toggleFeature(feature.id)}
              >
                <svg data-src={feature.icon} />

                {feature.name}
              </ToggleButton>
            )
          }
        </GridItem>

        <GridItem xs={12} style={{ marginBottom: 30 }}>
          <legend>Удобства</legend>

          {
            this.state.features.filter(f => f.category_slug === 'facilities').map(feature =>
              <ToggleButton
                key={feature.id}
                color="rose"
                round
                value={feature.id}
                selected={this.props.globalProp.feature_ids.includes(feature.id)}
                onClick={() => this.toggleFeature(feature.id)}
              >
                <svg data-src={feature.icon} />

                {feature.name}
              </ToggleButton>
            )
          }
        </GridItem>
      </GridContainer>
    );
  }
}

Step5.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(style)(Step5);
