import React, { PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import ConfigIcon from 'material-ui/svg-icons/action/settings-applications';
import AddnewappIcon from 'material-ui/svg-icons/image/control-point';
import IOIcon from 'material-ui/svg-icons/action/swap-vert';
import PipelineIcon from 'material-ui/svg-icons/image/hdr-strong';
import PublishIcon from 'material-ui/svg-icons/editor/publish';
import TerminalIcon from 'material-ui/svg-icons/av/airplay';

function DocsContent(props) {

  const style = {
    cursor: 'pointer'
  };

  return (
    <div className="ui fluid row">
      <Drawer open
              zDepth={3}
      >
        <AppBar
          title={
            <Link to="/"
                  style={{ textDecoration: 'none', color: 'inherit' }}
            >
              CVFY
            </Link>
          }
          showMenuIconButton = {false}
        />

        <MenuItem leftIcon={<ConfigIcon />}
                  style={style}
                  onTouchTap={() => browserHistory.push('/libdocs/configuration')}
        >
          Configuration
        </MenuItem>

        <MenuItem leftIcon={<AddnewappIcon />}
                  style={style}
                  onTouchTap={() => browserHistory.push('/libdocs/registration')}
        >
          Registering a new App
        </MenuItem>

        <MenuItem leftIcon={<IOIcon />}
                  style={style}
                  onTouchTap={() => browserHistory.push('/libdocs/input')}
        >
          Input functions
        </MenuItem>

        <MenuItem leftIcon={<IOIcon />}
                  style={style}
                  onTouchTap={() => browserHistory.push('/libdocs/output')}
        >
          Output functions
        </MenuItem>

        <MenuItem leftIcon={<TerminalIcon />}
                  style={style}
                  onTouchTap={() => browserHistory.push('/libdocs/terminal')}
        >
          Terminal functions
        </MenuItem>

      </Drawer>

      <div className="ui four wide column"  />

      <div className="ui padded twelve wide centered column" >
        <br />
        {props.children}
      </div>
    </div>
  );
}

DocsContent.propTypes = {
  children: PropTypes.array.isRequired
};

export default DocsContent;
