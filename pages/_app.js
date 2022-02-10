import React, { Component } from 'react';
import { createMedia } from '@artsy/fresnel';
import PropTypes from 'prop-types';
import Router from 'next/router';
import Link from 'next/link';
import { getCart } from '../utils/Cart';
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Segment,
  Sidebar,
  Visibility,
} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    mobile: 0,
    tablet: 768,
    computer: 1024,
  },
});
class DesktopContainer extends Component {
  state = {};

  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });

  render() {
    const { children } = this.props;
    const { fixed } = this.state;

    return (
      <Media greaterThan="mobile">
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}>
          <Segment
            inverted
            textAlign="center"
            style={{ minHeight: 50, padding: '1em 0em' }}
            vertical>
            <Menu
              fixed={fixed ? 'top' : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size="large">
              <Container>
                <Link href={'/'}>
                  <Menu.Item active>Home</Menu.Item>
                </Link>
                <Menu.Item as="a">Shop</Menu.Item>
                <Menu.Item as="a">About</Menu.Item>
                <Menu.Item as="a">Contact</Menu.Item>
                <Menu.Item position="right">
                  <Button as="a" inverted={!fixed}>
                    Log in
                  </Button>
                  <Button
                    as="a"
                    inverted={!fixed}
                    primary={fixed}
                    style={{ marginLeft: '0.5em' }}
                    onClick={async () => {
                      const { webUrl } = await getCart();
                      Router.replace(webUrl);
                    }}>
                    checkout
                  </Button>
                </Menu.Item>
              </Container>
            </Menu>
          </Segment>
        </Visibility>

        {React.cloneElement(this.props.children, { isMobile: false })}
      </Media>
    );
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
};
class MobileContainer extends Component {
  state = {};

  handleSidebarHide = () => this.setState({ sidebarOpened: false });

  handleToggle = () => this.setState({ sidebarOpened: true });

  render() {
    const { children } = this.props;
    const { sidebarOpened } = this.state;

    return (
      <Media as={Sidebar.Pushable} at="mobile">
        <Sidebar.Pushable>
          <Sidebar
            as={Menu}
            animation="overlay"
            inverted
            onHide={this.handleSidebarHide}
            vertical
            visible={sidebarOpened}>
            <Menu.Item as="a" active>
              Home
            </Menu.Item>
            <Menu.Item as="a">Shop</Menu.Item>
            <Menu.Item as="a">About</Menu.Item>
            <Menu.Item as="a">Contact</Menu.Item>
            <Menu.Item as="a">Log in</Menu.Item>
            <Menu.Item as="a">Sign Up</Menu.Item>
          </Sidebar>

          <Sidebar.Pusher dimmed={sidebarOpened}>
            <Segment
              inverted
              textAlign="center"
              style={{ minHeight: 50, padding: '1em 0em' }}
              vertical>
              <Container>
                <Menu inverted pointing secondary size="large">
                  <Menu.Item onClick={this.handleToggle}>
                    <Icon name="sidebar" />
                  </Menu.Item>
                  <Menu.Item position="right">
                    <Button as="a" inverted>
                      Log in
                    </Button>
                    <Button as="a" inverted style={{ marginLeft: '0.5em' }}>
                      Sign Up
                    </Button>
                  </Menu.Item>
                </Menu>
              </Container>
            </Segment>
            {React.cloneElement(this.props.children, { isMobile: true })}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Media>
    );
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node,
};

const ResponsiveContainer = ({ children }) => (
  /* Heads up!
   * For large applications it may not be best option to put all page into these containers at
   * they will be rendered twice for SSR.
   */
  <MediaContextProvider>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </MediaContextProvider>
);

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ResponsiveContainer>
        <Component {...pageProps} />
      </ResponsiveContainer>
      <Segment inverted vertical style={{ padding: '5em 0em' }}>
        <Container>
          <Grid textAlign="center">
            <Grid.Row>
              <Header as="h4" inverted style={{ paddingRight: '2em' }}>
                WFH Fashion
              </Header>
              <p>
                <footer> &copy; Copyright 2022</footer>
              </p>
            </Grid.Row>
          </Grid>
        </Container>
      </Segment>
    </>
  );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps }
// }

export default MyApp;
/* eslint-disable max-classes-per-file */
/* eslint-disable react/no-multi-comp */
