import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { Portal } from 'components/structure/Portal';
import { scrollParent } from 'components/utils/scroll';

import * as styled from './styles/tooltip';

/* eslint react/no-did-update-set-state: 0 */
export class Tooltip extends Component {
  constructor(props) {
    super(props);

    this.containerRef = React.createRef();
    this.state = {
      active: props.active,
      position: props.position,
      coords: null,
      delayTimer: null,
      flash: props.flash,
    };
  }

  componentDidMount() {
    const { active } = this.props;
    const { flash } = this.state;
    if (active) {
      this.handleParentScroll();
    }

    if (flash) {
      this.clearFlash();
    }
  }

  componentDidUpdate(prevProps) {
    const { active, disabled, flash } = this.props;
    const { active: stateActive } = this.state;

    if (prevProps.active && !active) {
      this.handleMouseLeave();
    }

    if (prevProps.flash !== flash) {
      this.setState({ flash: true });
      this.clearFlash();
    }

    if (stateActive && disabled) {
      this.setState({ active: false });
    }
  }

  handleMouseEnter = (event) => {
    const { clientX, clientY } = event.nativeEvent;
    const { position: propsPosition } = this.props;
    const position =
      propsPosition || this.calculatePosition({ x: clientX, y: clientY });
    const coords = this.calculateCoordinates(
      position,
      this.containerRef.current
    );

    this.toggleActive({ active: true, position, coords });
  };

  handleMouseLeave = () => {
    const { active, delayHide } = this.props;

    if (!active) {
      this.toggleActive(
        { active: false, position: null, coords: null },
        delayHide
      );
    }
  };

  handleParentScroll = () => {
    const { position } = this.state;
    const coords = this.calculateCoordinates(
      position,
      this.containerRef.current
    );

    this.setState({ coords });
  };

  clearFlash() {
    setTimeout(() => this.setState({ flash: false }), 1000);
  }

  calculatePosition({ x, y }) {
    const { fixed, color } = this.props;
    const { innerWidth, innerHeight } = window;

    if ((fixed || color === 'dark') && y > innerHeight / 2) {
      return 'N';
    }
    if (fixed || color === 'dark') {
      return 'S';
    }
    if (x > innerWidth / 2 && y > innerHeight / 2) {
      return 'NW';
    }
    if (x > innerWidth / 2) {
      return 'SW';
    }
    if (y > innerHeight / 2) {
      return 'NE';
    }
    return 'SE';
  }

  calculateCoordinates(position, target) {
    const { fixed } = this.props;
    const dimensions = target.getBoundingClientRect();

    if (!fixed) {
      return {};
    }

    const top =
      (['NW', 'NE', 'N', 'E', 'W'].includes(position)
        ? dimensions.top
        : dimensions.bottom) +
      (['E', 'W'].includes(position) ? dimensions.height / 2 : 0) +
      document.defaultView.pageYOffset;
    const left =
      (['E'].includes(position) ? dimensions.right : dimensions.left) +
      (['E', 'W'].includes(position) ? 0 : dimensions.width / 2) +
      document.defaultView.pageXOffset;

    return { top: `${top}px`, left: `${left}px` };
  }

  toggleActive(change, eventDelay) {
    const { fixed, delay: delayAlways } = this.props;
    const { delayTimer } = this.state;
    const delay = eventDelay || delayAlways;

    if (delayTimer) {
      clearTimeout(delayTimer);
    }

    const toggleFn = (newState) => {
      this.setState(newState);
      if (fixed) {
        this.toggleScrollWatch(newState.active);
      }
    };

    if (delay) {
      const timer = setTimeout(
        () => toggleFn({ ...change, delayTimer: null }),
        delay
      );
      this.setState({ delayTimer: timer });
    } else {
      toggleFn(change);
    }
  }

  toggleScrollWatch(active) {
    const scrollEl = scrollParent(this.containerRef.current);

    if (!scrollEl) {
      return;
    }
    if (active) {
      scrollEl.addEventListener('scroll', this.handleParentScroll);
    } else {
      scrollEl.removeEventListener('scroll', this.handleParentScroll);
    }
  }

  render() {
    const {
      className,
      content,
      children,
      size,
      fixed,
      color,
      shadow,
      transition,
      disabled,
      dataManual,
    } = this.props;
    const { active, position, coords, flash } = this.state;
    const WrapperEl = fixed ? Portal : Fragment;
    const TooltipEl =
      color === 'dark' ? styled.TooltipDark : styled.TooltipLight;

    return (
      <styled.Container
        className={className}
        ref={this.containerRef}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        disabled={disabled}
        data-manual={dataManual}
      >
        <styled.Activator>{children}</styled.Activator>
        {active && !disabled && (
          <WrapperEl>
            <TooltipEl
              position={position}
              fixed={fixed}
              transition={transition}
              style={coords}
              color={color}
              shadow={shadow}
              flash={flash}
            >
              <styled.Content size={size}>{content}</styled.Content>
            </TooltipEl>
          </WrapperEl>
        )}
      </styled.Container>
    );
  }
}

Tooltip.propTypes = {
  className: PropTypes.string,
  content: PropTypes.node,
  active: PropTypes.bool,
  transition: PropTypes.bool,
  position: PropTypes.oneOf(['N', 'S', 'E', 'W', 'NW', 'NE', 'SW', 'SE']),
  color: PropTypes.oneOf(['light', 'dark']),
  fixed: PropTypes.bool,
  shadow: PropTypes.bool,
  size: PropTypes.oneOfType([
    PropTypes.oneOf(['vsmall', 'small', 'normal']),
    PropTypes.string,
  ]),
  children: PropTypes.node,
  delay: PropTypes.number,
  delayHide: PropTypes.number,
  flash: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  disabled: PropTypes.bool,
  dataManual: PropTypes.string,
};

Tooltip.defaultProps = {
  content: null,
  active: false,
  position: null,
  fixed: false,
  transition: true,
  shadow: true,
  flash: false,
  color: 'light',
  disabled: false,
};
