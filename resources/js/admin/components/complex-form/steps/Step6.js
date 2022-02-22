import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Checkbox from "@material-ui/core/Checkbox";
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import PetsIcon from '@material-ui/icons/Pets';
import ChildFriendlyIcon from '@material-ui/icons/ChildFriendly';
import PublicIcon from '@material-ui/icons/Public';
import PeopleIcon from '@material-ui/icons/People';
import SmokingIcon from '@material-ui/icons/SmokingRooms';

// core components
import GridContainer from "$admin/ui-components/Grid/GridContainer.js";
import GridItem from "$admin/ui-components/Grid/GridItem.js";
import ToggleButton from "$admin/ui-components/CustomButtons/ToggleButton";

const style = {
  ruleContainer: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  ruleLabel: {
    display: 'flex',
    alignItems: 'center',
    '& svg': {
      marginRight: 10
    }
  },
};
const rules = [
  {
    key: 'allow_animals',
    label: 'Животные',
    icon: <PetsIcon />,
  },
  {
    key: 'allow_kids',
    label: 'Дети',
    icon: <ChildFriendlyIcon />,
  },
  {
    key: 'allow_foreigners',
    label: 'Иностранцы',
    icon: <PublicIcon />,
  },
  {
    key: 'allow_roommates',
    label: 'Сожители',
    icon: <PeopleIcon />,
  },
  {
    key: 'allow_smoking',
    label: 'Курение',
    icon: <SmokingIcon />,
  },
]

class Step6 extends React.Component {
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
  updateRule(rule, value){
    this.props.globalProp[rule] = value
    this.forceUpdate()
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <GridContainer justify="center">
          {
            rules.map((rule, index) =>
              <GridItem key={index} xs={7} className={classes.ruleContainer}>
                <div className={classes.ruleLabel}>
                  {rule.icon} {rule.label}
                </div>

                <div>
                  <ToggleButton
                    color="info"
                    round
                    justIcon
                    selected={this.props.globalProp[rule.key]}
                    onClick={() => this.updateRule(rule.key, true)}
                  >
                    <CheckIcon />
                  </ToggleButton>

                  <ToggleButton
                    color="danger"
                    round
                    justIcon
                    selected={!this.props.globalProp[rule.key]}
                    onClick={() => this.updateRule(rule.key, false)}
                  >
                    <ClearIcon />
                  </ToggleButton>
                </div>
              </GridItem>
            )
          }
        </GridContainer>
      </div>
    );
  }
}

Step6.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(style)(Step6);
