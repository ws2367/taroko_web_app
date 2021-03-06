import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import DEMO from 'constants/demoData';
import { Layout, Tooltip, Popover } from 'antd';
import Badge from '@material-ui/core/Badge';
import Logo from 'components/Logo';
import { toggleCollapsedNav, toggleOffCanvasMobileNav } from 'actions/settingsActions';
import SettingsIcon from '@material-ui/icons/Settings';
import Notifications from 'routes/layout/routes/header/components/Notifications';
import MaterialIcon from 'components/MaterialIcon';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import LogoutConfirmDialog from './components/LogoutConfirmDialog';
import AUTH, {clearAuth} from 'auth/Auth';
const { Header } = Layout;



class AppHeader extends React.Component {
  state = {
    anchorEl: null,
    openLogout: false
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };
  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleCloseLogout = (toLogout) => () => {
    if (toLogout) {
      clearAuth();
      this.props.history.push('/user/login');
    }
    this.setState({openLogout: false});
  }

  openLogoutDialog = () => {
    this.setState({openLogout: true});
  }


  onToggleCollapsedNav = () => {
    const { handleToggleCollapsedNav, collapsedNav } = this.props;
    handleToggleCollapsedNav(!collapsedNav);
  }

  onToggleOffCanvasMobileNav = () => {
    const { handleToggleOffCanvasMobileNav, offCanvasMobileNav } = this.props;
    handleToggleOffCanvasMobileNav(!offCanvasMobileNav);
  }

  render() {
    const { headerShadow, colorOption, showLogo } = this.props;
    const { anchorEl, openLogout } = this.state;

    return (
      <Header className={classnames('app-header', {
        'header-elevation': headerShadow,
      })}>
        <div
          className={classnames('app-header-inner', {
            'bg-white': ['11','12','13','14','15','16','21'].indexOf(colorOption) >= 0,
            'bg-dark': colorOption === '31',
            'bg-primary': ['22','32'].indexOf(colorOption) >= 0,
            'bg-success': ['23','33'].indexOf(colorOption) >= 0,
            'bg-info': ['24','34'].indexOf(colorOption) >= 0,
            'bg-warning': ['25','35'].indexOf(colorOption) >= 0,
            'bg-danger': ['26','36'].indexOf(colorOption) >= 0 })}
        >
          <div className="header-left">
            <div className="list-unstyled list-inline">
              <a className="list-inline-item d-none d-md-inline-block" onClick={this.onToggleCollapsedNav}>
                <MaterialIcon icon="menu" className="list-icon" />
              </a>
              <a className="list-inline-item d-md-none" onClick={this.onToggleOffCanvasMobileNav}>
                <MaterialIcon icon="menu" className="list-icon" />
              </a>
              {showLogo && [
                <Logo key="logo" />,
                <div key="divider" className="divider-vertical"></div>
              ]}
            </div>
          </div>

          <div className="header-right">
            <div className="list-unstyled list-inline">

              <a className="list-inline-item">
                <div
                  className="avatar"
                  aria-owns={anchorEl ? 'app-header-menu' : null}
                  aria-haspopup="true"
                  onClick={this.handleClick}
                >
                  <SettingsIcon />
                </div>
                <Menu
                  id="app-header-menu"
                  className="app-header-dropdown"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.handleClose} className="d-none"> <div>登入為<strong>{DEMO.user}</strong></div> </MenuItem>
                  <div className="divider divider-solid my-1 d-none"></div>
                  <MenuItem onClick={this.handleClose} className="d-none"> <a href='#/user/profile'><MaterialIcon icon="account_circle" />帳號資訊</a> </MenuItem>
                  <MenuItem onClick={this.handleClose}> <a href='#/help'><MaterialIcon icon="help" />Cooby支援</a> </MenuItem>
                  <div className="divider divider-solid my-1"></div>
                  <MenuItem onClick={this.handleClose}> <a onClick={this.openLogoutDialog}><MaterialIcon icon="forward" />登出</a> </MenuItem>
                </Menu>
              </a>
            </div>
          </div>
        </div>
        <LogoutConfirmDialog open={openLogout} handleClose={this.handleCloseLogout} />
      </Header>
    );
  }
}

const mapStateToProps = (state) => ({
  offCanvasMobileNav: state.settings.offCanvasMobileNav,
  collapsedNav: state.settings.collapsedNav,
  headerShadow: state.settings.headerShadow,
  colorOption: state.settings.colorOption,
});

const mapDispatchToProps = dispatch => ({
  handleToggleCollapsedNav: (isCollapsedNav) => {
    dispatch( toggleCollapsedNav(isCollapsedNav) );
  },
  handleToggleOffCanvasMobileNav: (isOffCanvasMobileNav) => {
    dispatch( toggleOffCanvasMobileNav(isOffCanvasMobileNav) );
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AppHeader));
