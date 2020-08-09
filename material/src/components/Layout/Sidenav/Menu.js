import React from 'react';
import { connect } from 'react-redux';
import { Menu } from 'antd';
import APPCONFIG from 'constants/appConfig';
import { toggleOffCanvasMobileNav } from 'actions/settingsActions';
import { CHARTS } from 'constants/uiComponents';
import Button from '@material-ui/core/Button';
import MaterialIcon from 'components/MaterialIcon';

const SubMenu = Menu.SubMenu;

class AppMenu extends React.Component {

  // list for AccordionNav
  rootMenuItemKeys= [ // without submenu
    '/app/client',
    '/app/task',
    '/app/calendar',
  ]
  rootSubmenuKeys = [
    '/app/layout',
    '/app/foundation',
    '/app/card',
    '/app/ui',
    '/app/form',
    '/app/feedback',
    '/app/table',
    '/app/chart',
    '/app/page',
    '/app/ecommerce',
    '/user',
    '/exception',
    '/app/menu'
  ];

  state = {
    openKeys: ['/app/client'],
  };

  onOpenChange = (openKeys) => {
    // AccordionNav
    // console.log(openKeys)
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  }

  onMenuItemClick = (item) => {
    // AccordionNav
    const itemKey = item.key;
    if(this.rootMenuItemKeys.indexOf(itemKey) >= 0) {
      this.setState({ openKeys: [itemKey] });
    }

    //
    const { isMobileNav } = this.props;
    if (isMobileNav) {
      this.closeMobileSidenav();
    }
  }

  closeMobileSidenav = () => {
    if (APPCONFIG.AutoCloseMobileNav) {
      const { handleToggleOffCanvasMobileNav } = this.props;
      handleToggleOffCanvasMobileNav(true);
    }
  }

  //
  getSubMenuOrItem = item => {
    if (item.children && item.children.some(child => child.name)) {
      const childrenItems = this.getNavMenuItems(item.children);
      // hide submenu if there's no children items
      if (childrenItems && childrenItems.length > 0) {
        return (
          <SubMenu
            title={<Button className="nav-item">{item.name}</Button>}
            key={item.path}
          >
            {childrenItems}
          </SubMenu>
        );
      }
      return null;
    } else {
      return <Menu.Item key={item.path}><Button className="nav-item" href={'#' + item.path}><span>{item.menuName || item.name}</span></Button></Menu.Item>;
    }
  };

  getNavMenuItems = menusData => {
    if (!menusData) {
      return [];
    }
    return menusData
      .filter(item => !item.hideInMenu)
      .map(item => {
        // make dom
        const ItemDom = this.getSubMenuOrItem(item);
        return ItemDom;
      })
      .filter(item => item);
  }


  render() {
    const { collapsedNav, colorOption, location } = this.props;
    // const mode = collapsedNav ? 'vertical' : 'inline';
    const menuTheme = ['31', '32', '33', '34', '35', '36'].indexOf(colorOption) >= 0 ? 'light' : 'dark';
    const currentPathname = location.pathname;

    const menuProps = collapsedNav
      ? {}
      : {
          openKeys: this.state.openKeys
        };

    return (
      <Menu
        className="app-menu"
        theme={menuTheme}
        mode="inline"
        inlineCollapsed={collapsedNav}
        {...menuProps}
        onOpenChange={this.onOpenChange}
        onClick={this.onMenuItemClick}
        selectedKeys={[currentPathname]}
      >
        <Menu.Item key="/app/client">
          <Button className="nav-item" href="#/app/client">
            <MaterialIcon icon="group" />
            <span className="nav-text">客戶列表</span>
            <span className="nav-badge nav-badge-icon badge-right ml-1"></span>
          </Button>
        </Menu.Item>
        <Menu.Item key="/app/task">
          <Button className="nav-item" href="#/app/task">
            <MaterialIcon icon="assignment" />
            <span className="nav-text">待辦事項</span>
          </Button>
        </Menu.Item>
        <Menu.Divider />
        <SubMenu
          key="/app/chart"
          title={<Button className="nav-item"><MaterialIcon icon="dashboard" /><span className="nav-text">業績報告</span></Button>}
        >
          { this.getNavMenuItems(CHARTS) }
        </SubMenu>
        <Menu.Item key="/app/calendar">
          <Button className="nav-item" href="#/app/calendar">
            <MaterialIcon icon="calendar_today" />
            <span className="nav-text">行事曆</span>
          </Button>
        </Menu.Item>
      </Menu>
    )
  }
}

const mapStateToProps = state => {
  // console.log(state);
  return ({
    collapsedNav: state.settings.collapsedNav,
    colorOption: state.settings.colorOption,
    location: state.routing.location
  })
};

const mapDispatchToProps = dispatch => ({
  handleToggleOffCanvasMobileNav: (isOffCanvasMobileNav) => {
    dispatch( toggleOffCanvasMobileNav(isOffCanvasMobileNav) );
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppMenu);
