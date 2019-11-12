import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  button: {
    display: "block",
    marginTop: theme.spacing(2)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  }
}));
class Skillset extends Component {
  state = {};
  render() {
    return (
      <div>
        <TextField
          id="standard"
          label="Skills"
          // defaultValue=""
          className={useStyles.textField}
          value={this.props.value}
          placeholder="Type and press enter to add"
          onKeyDown={this.props.onKeyDown}
          onChange={this.props.onChange}
        />

        {this.props.skillset.map(item => (
          <div className="tag-item" key={item}>
            {item}
            <button
              type="button"
              className="button"
              onClick={this.props.onClick}
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    );
  }
}

export default Skillset;
