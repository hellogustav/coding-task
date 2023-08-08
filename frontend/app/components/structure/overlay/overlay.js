import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { get } from 'lodash';

import { KEYS } from 'components/utils/keys';

import * as styled from './styles/overlay';

export class Overlay extends Component {
  constructor(props) {
    super(props);

    this.overlayRef = React.createRef();
    this.viewRef = React.createRef();
    this.state = {
      height: props.fitScreen ? window.innerHeight : undefined,
    };
  }

  componentDidMount() {
    const { current } = this.overlayRef;

    document.addEventListener('keydown', this.onEscape);
    current.focus();
    current.removeAttribute('tabindex');
    window.addEventListener('resize', this.changeHeight);
    this.observeResize(this.viewRef.current);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onEscape);
    window.removeEventListener('resize', this.changeHeight);
  }

  onEscape = ({ keyCode }) => {
    if (keyCode === KEYS.ESCAPE) {
      this.onCloseOverlay();
    }
  };

  onCloseOverlay = (e) => {
    const { closeOverlay, noCloseOnBackgroundClick, noClose } = this.props;

    if (!e || e.currentTarget === e.target) {
      return noClose || noCloseOnBackgroundClick ? null : closeOverlay();
    }
    return false;
  };

  onClickArrow = (e, fn) => {
    e.stopPropagation();
    fn();
  };

  observeResize = (el) => {
    const resizeObserver = new ResizeObserver((entries) => {
      if (!get(entries, '0.contentRect.height')) return;
      this.changeHeight();
    });

    resizeObserver.observe(el);
  };

  changeHeight = () => {
    const { fitScreen } = this.props;
    const height = fitScreen ? { height: window.innerHeight } : {};

    this.setState({
      ...height,
      viewHeight: this.viewRef.current.getBoundingClientRect().height,
    });
  };

  closeOverlayUI = () => {
    const { noClose, closeOverlay } = this.props;
    return noClose ? null : <styled.Close fn={closeOverlay} />;
  };

  render() {
    const {
      padding,
      children,
      isLight,
      pullRight,
      noGlobalScrollLock,
      gotoLeft = false,
      gotoRight = false,
      gotoLeftFn,
      gotoRightFn,
      noCloseOnBackgroundClick,
      zIndex,
      fitScreen,
      backgroundUrl,
      className,
    } = this.props;
    const { height, viewHeight } = this.state;

    const leftArrow = gotoLeft ? (
      <styled.Prev prev isSmall fn={(e) => this.onClickArrow(e, gotoLeftFn)} />
    ) : null;

    const rightArrow = gotoRight ? (
      <styled.Next next isSmall fn={(e) => this.onClickArrow(e, gotoRightFn)} />
    ) : null;

    return (
      <styled.Overlay
        ref={this.overlayRef}
        tabIndex="0"
        isLight={isLight}
        alignItems="center"
        justifyContent="center"
        padding={padding}
        pullRight={pullRight}
        onClick={noCloseOnBackgroundClick ? undefined : this.onCloseOverlay}
        zIndex={zIndex}
        height={height}
        backgroundUrl={backgroundUrl}
        className={className}
        fitScreen={fitScreen}
      >
        {leftArrow}

        <styled.View
          fitScreen={fitScreen}
          height={viewHeight}
          ref={this.viewRef}
        >
          {this.closeOverlayUI()}

          {children}
        </styled.View>

        {rightArrow}

        {noGlobalScrollLock || <styled.GlobalScrollLock />}
      </styled.Overlay>
    );
  }
}

Overlay.propTypes = {
  closeOverlay: PropTypes.func,
  gotoLeftFn: PropTypes.func,
  gotoRightFn: PropTypes.func,
  padding: PropTypes.string,
  noClose: PropTypes.bool,
  noCloseOnBackgroundClick: PropTypes.bool,
  noGlobalScrollLock: PropTypes.bool,
  isLight: PropTypes.bool,
  gotoLeft: PropTypes.bool,
  gotoRight: PropTypes.bool,
  pullRight: PropTypes.string,
  zIndex: PropTypes.number,
  children: PropTypes.node,
  fitScreen: PropTypes.bool,
  backgroundUrl: PropTypes.string,
  className: PropTypes.string,
};

Overlay.defaultProps = {
  isLight: false,
  noClose: false,
  noCloseOnBackgroundClick: false,
  noGlobalScrollLock: false,
};
