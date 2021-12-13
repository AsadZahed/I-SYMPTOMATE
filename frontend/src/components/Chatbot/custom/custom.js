import React from "react";
import PropTypes from "prop-types";
import ReactHtmlParser from "react-html-parser";

class Custom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "<a href = 'https://www.google.com/' > Google </a>"
    };
    this.props.triggerNextStep();
  }
  render() {
    const val = this.state.message;

    return (
      <div>
        <div>{ReactHtmlParser(val)}</div>
        <br />
        <a href="https://www.google.com/"> Google </a>
      </div>
    ); //<div>{this.state.message}</div>;
  }
}

Custom.propTypes = {
  steps: PropTypes.object,
  triggerNextStep: PropTypes.func
};

Custom.defaultProps = {
  steps: undefined,
  triggerNextStep: undefined
};

export default Custom;
