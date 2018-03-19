import React from "react";
import Dialog from "material-ui/Dialog";
import { indigo600 } from "material-ui/styles/colors";
import { PropTypes } from "prop-types";
import { ShareButtons, ShareCounts, generateShareIcon } from "react-share";
const {
  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  TwitterShareButton
} = ShareButtons;
const {
  FacebookShareCount,
  GooglePlusShareCount,
  LinkedinShareCount
} = ShareCounts;
const FacebookIcon = generateShareIcon("facebook");
const TwitterIcon = generateShareIcon("twitter");
const GooglePlusIcon = generateShareIcon("google");
const LinkedinIcon = generateShareIcon("linkedin");

export class SocialDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      demoBeingShown: props.demoBeingShown,
      shareModalOpen: props.shareModalOpen
    };

    this.handleShareModal = props.handleShareModal;
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      demoBeingShown: nextProps.demoBeingShown,
      shareModalOpen: nextProps.shareModalOpen
    });
  }

  render() {
    return (
      <Dialog
        title="Share This Demo"
        modal={false}
        open={this.state.shareModalOpen}
        onRequestClose={this.handleShareModal}
        autoScrollBodyContent
      >
        <div className="ui padded centered grid">
          <div
            className="ui row stackable column grid"
            style={{ cursor: "pointer" }}
          >
            <TwitterShareButton
              url={this.state.demoBeingShown.permalink}
              title={this.state.demoBeingShown.name}
              hashtags={["cloudcv", "Origami"]}
              className="ui row"
            >
              <TwitterIcon size={64} round />
            </TwitterShareButton>
          </div>

          <div
            className="ui eight wide stackable row column grid"
            style={{ cursor: "pointer" }}
          >
            <FacebookShareButton
              url={this.state.demoBeingShown.permalink}
              quote={this.state.demoBeingShown.name}
              className="ui row"
            >
              <FacebookIcon size={64} round />
            </FacebookShareButton>
            <FacebookShareCount url={this.state.demoBeingShown.permalink}>
              {count => (
                <div
                  className="ui compact inverted segment"
                  style={{ backgroundColor: indigo600 }}
                >
                  {count} Shares
                </div>
              )}
            </FacebookShareCount>
          </div>

          <div
            className="ui eight wide stackable row column grid"
            style={{ cursor: "pointer" }}
          >
            <GooglePlusShareButton
              url={this.state.demoBeingShown.permalink}
              className="ui row"
            >
              <GooglePlusIcon size={64} round />
            </GooglePlusShareButton>

            <GooglePlusShareCount url={this.state.demoBeingShown.permalink}>
              {count => (
                <div className="ui compact red inverted segment">
                  {count} Shares
                </div>
              )}
            </GooglePlusShareCount>
          </div>

          <div
            className="ui stackable row column grid"
            style={{ cursor: "pointer" }}
          >
            <LinkedinShareButton
              url={this.state.demoBeingShown.permalink}
              title={this.state.demoBeingShown.name}
              windowWidth={750}
              windowHeight={600}
              className="ui row"
            >
              <LinkedinIcon size={64} round />
            </LinkedinShareButton>

            <LinkedinShareCount url={this.state.demoBeingShown.permalink}>
              {count => (
                <div className="ui compact blue inverted segment">
                  {count} Shares
                </div>
              )}
            </LinkedinShareCount>
          </div>
        </div>
      </Dialog>
    );
  }
}

SocialDialog.propTypes = {
  demoBeingShown: PropTypes.object.isRequired,
  shareModalOpen: PropTypes.bool.isRequired,
  handleShareModal: PropTypes.func.isRequired
};
