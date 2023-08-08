import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { throttle } from 'lodash';

import * as styled from './styles';

// Needs to be class, otherwise components/navigation/menu/menu.js complains it cannot be given refs.
/* eslint react/prefer-stateless-function:0 */
export class Scrollbars extends Component {
  constructor(props) {
    super(props);

    this.scrollbar = React.createRef();
    this.throttleFn = null;
  }

  componentDidMount() {
    this.toggleScrollWatch(true);
  }

  componentWillUnmount() {
    this.toggleScrollWatch(false);
  }

  toggleScrollWatch(activate) {
    const { handleScroll } = this.props;
    const target = this.scrollbar.current;

    if (!target || !handleScroll) {
      return;
    }

    if (activate) {
      this.throttleFn = throttle(handleScroll, 100);
      target.addEventListener('scroll', this.throttleFn);
    } else {
      target.removeEventListener('scroll', this.throttleFn);
      this.throttleFn.cancel();
    }
  }

  render() {
    const { children, ...rest } = this.props;

    return (
      <styled.Scrollbars ref={this.scrollbar} {...rest}>
        {children}
      </styled.Scrollbars>
    );
  }
}

Scrollbars.propTypes = {
  children: PropTypes.node,
  horizontal: PropTypes.bool,
  vertical: PropTypes.bool,
  width: PropTypes.string,
  height: PropTypes.string,
  handleScroll: PropTypes.func,
};

Scrollbars.defaultProps = {
  horizontal: false,
  vertical: false,
};
