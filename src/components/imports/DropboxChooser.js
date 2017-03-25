import React, { Component } from "react";
import loadScript from "load-script";

// read more
// https://www.dropbox.com/developers/chooser
export default class DropboxChooser extends Component {
  constructor(props) {
    super(props);
    this.Dropbox_SDK_Url = "https://www.dropbox.com/static/api/2/dropins.js";
    this.scriptId = "dropboxjs";
    this.scriptLoadingStarted = false;
    this.onChoose = this.onChoose.bind(this);
  }

  componentDidMount() {
    if (!this.isDropboxReady() && !this.scriptLoadingStarted) {
      this.scriptLoadingStarted = true;
      loadScript(this.Dropbox_SDK_Url, {
        attrs: {
          id: this.scriptId,
          "data-app-key": this.props.appKey
        }
      });
    }
  }

  isDropboxReady() {
    return !!window.Dropbox;
  }

  onChoose() {
    if (!this.isDropboxReady() || this.props.disabled) {
      return null;
    }

    const {
      success,
      cancel,
      linkType,
      multiselect,
      extensions
    } = this.props;

    window.Dropbox.choose({
      success,
      cancel,
      linkType,
      multiselect,
      extensions
    });
  }

  render() {
    return (
      <div onClick={this.onChoose}>
        {this.props.children
          ? this.props.children
          : <button>Open dropbox chooser</button>}
      </div>
    );
  }
}

DropboxChooser.propTypes = {
  children: React.PropTypes.node,
  appKey: React.PropTypes.string.isRequired,
  success: React.PropTypes.func.isRequired,
  cancel: React.PropTypes.func,
  linkType: React.PropTypes.oneOf(["preview", "direct"]),
  multiselect: React.PropTypes.bool,
  extensions: React.PropTypes.arrayOf(React.PropTypes.string),
  disabled: React.PropTypes.bool
};

DropboxChooser.defaultProps = {
  cancel: () => {},
  linkType: "preview",
  multiselect: false,
  disabled: false
};
