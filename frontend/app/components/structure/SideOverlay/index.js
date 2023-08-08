import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { noop, isFunction } from 'lodash';

import { KEYS } from 'components/utils/keys';
import { openSideModal, closeSideModal } from 'containers/App/actions/ui';

import * as styled from './styles';

class SideOverlayComponent extends Component {
  constructor(props) {
    super(props);

    this.scrollRef = React.createRef();
    this.state = { isClosing: false };
  }

  componentDidMount() {
    const { onInit, handleComponentMount } = this.props;

    handleComponentMount();
    document.addEventListener('keydown', this.onEscape);
    if (onInit) {
      onInit({ scrollRef: this.scrollRef });
    }
  }

  componentWillUnmount() {
    const { handleComponentUnmount } = this.props;

    handleComponentUnmount();
    document.removeEventListener('keydown', this.onEscape);
  }

  onEscape = ({ keyCode }) => {
    const { noClose } = this.props;

    if (!noClose && keyCode === KEYS.ESCAPE) {
      this.onCloseOverlay();
    }
  };

  onCloseOverlay = (e) => {
    if (!e || e.currentTarget === e.target) {
      const { closeOverlay } = this.props;

      this.setState({ isClosing: true }, () =>
        setTimeout(() => closeOverlay(e), 200)
      );

      return true;
    }
    return false;
  };

  render() {
    const { title, children, noClose, noGlobalScrollLock, width } = this.props;
    const { isClosing } = this.state;
    return (
      <styled.Overlay
        isClosing={isClosing}
        onClick={noClose ? noop : this.onCloseOverlay}
      >
        <styled.View ref={this.scrollRef} width={width} isClosing={isClosing}>
          <styled.Header>
            <span>
              <FormattedMessage {...title} />
            </span>
            <styled.Close
              icon="X"
              size="xlarge"
              onClick={this.onCloseOverlay}
            />
          </styled.Header>

          {isFunction(children)
            ? children({ onCloseOverlay: this.onCloseOverlay })
            : children}
        </styled.View>

        {noGlobalScrollLock || <styled.GlobalScrollLock />}
      </styled.Overlay>
    );
  }
}

SideOverlayComponent.propTypes = {
  children: PropTypes.func.isRequired,
  title: PropTypes.object,
  closeOverlay: PropTypes.func,
  noClose: PropTypes.bool,
  noGlobalScrollLock: PropTypes.bool,
  handleComponentMount: PropTypes.func,
  handleComponentUnmount: PropTypes.func,
  onInit: PropTypes.func,
  width: PropTypes.string,
};

SideOverlayComponent.defaultProps = {
  noClose: false,
  noGlobalScrollLock: false,
};

const mapDispatchToProps = (dispatch) => ({
  handleComponentMount: () => dispatch(openSideModal()),
  handleComponentUnmount: () => dispatch(closeSideModal()),
});

const withConnect = connect(null, mapDispatchToProps);

export const SideOverlay = compose(withConnect)(SideOverlayComponent);
