import React from 'react';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router'
import loadable from 'react-loadable';
import LoadingComponent from 'components/Loading';
import { Layout } from 'antd';
import { CookiesProvider } from 'react-cookie';

const { Content } = Layout;



let ClientList = loadable({
  loader: () => import('routes/client/'),
  loading: LoadingComponent
})
let Task = loadable({
  loader: () => import('routes/task/'),
  loading: LoadingComponent
})

let Calendar = loadable({
  loader: () => import('routes/calendar/'),
  loading: LoadingComponent
})
let Card = loadable({
  loader: () => import('routes/card/'),
  loading: LoadingComponent
})
let Chart = loadable({
  loader: () => import('routes/chart/'),
  loading: LoadingComponent
})
let ECommerce = loadable({
  loader: () => import('routes/ecommerce/'),
  loading: LoadingComponent
})
let Feedback = loadable({
  loader: () => import('routes/feedback/'),
  loading: LoadingComponent
})
let Form = loadable({
  loader: () => import('routes/form/'),
  loading: LoadingComponent
})
let Foundation = loadable({
  loader: () => import('routes/foundation/'),
  loading: LoadingComponent
})
let AppLayout = loadable({
  loader: () => import('routes/layout/'),
  loading: LoadingComponent
})
let Page = loadable({
  loader: () => import('routes/page/'),
  loading: LoadingComponent
})
let Table = loadable({
  loader: () => import('routes/table/'),
  loading: LoadingComponent
})
let UI = loadable({
  loader: () => import('routes/ui/'),
  loading: LoadingComponent
})
let Exception = loadable({
  loader: () => import('routes/exception/'),
  loading: LoadingComponent
})



class AppContent extends React.Component {
  render() {
    const { match } = this.props;

    return (
      <CookiesProvider>
        <Content id='app-content'>
          <Route path={`${match.url}/client`} component={ClientList} />
          <Route path={`${match.url}/task`} component={Task} />

          <Route path={`${match.url}/calendar`} component={Calendar} />
          <Route path={`${match.url}/card`} component={Card}/>
          <Route path={`${match.url}/chart`} component={Chart} />

        </Content>
      </CookiesProvider>
    );
  }
}

export default withRouter(AppContent);
