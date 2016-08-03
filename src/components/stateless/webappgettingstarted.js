import React, { PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import ConfigIcon from 'material-ui/svg-icons/action/settings-applications';
import AddnewappIcon from 'material-ui/svg-icons/image/control-point';
import IOIcon from 'material-ui/svg-icons/action/swap-vert';
import PublishIcon from 'material-ui/svg-icons/editor/publish';

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
                  onTouchTap={() => browserHistory.push('/gettingstarted/configuration')}
        >
          Configuration
        </MenuItem>

        <MenuItem leftIcon={<AddnewappIcon />}
                  style={style}
                  onTouchTap={() => browserHistory.push('/gettingstarted/create')}
        >
          Creating a new App
        </MenuItem>

        <MenuItem leftIcon={<IOIcon />}
                  style={style}
                  onTouchTap={() => browserHistory.push('/gettingstarted/io')}
        >
          I/O components
        </MenuItem>

        <MenuItem leftIcon={<PublishIcon />}
                  style={style}
                  onTouchTap={() => browserHistory.push('/gettingstarted/publish')}
        >
          Publishing a demo
        </MenuItem>

      </Drawer>

      <div className="ui four wide column" >
      </div>

      <div className="ui padded twelve wide centered column" >
        <br />
        {props.children}
      </div>
    </div>
  );
}

DocsContent.propTypes = {
  children: PropTypes.element.isRequired
};

export default DocsContent;
