import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { isObject } from 'lodash';

import { Overlay } from 'components/structure/overlay/overlay';
import { Button } from 'components/elements/button';

import * as styled from './styles/modal';
import i18n from './utils/i18n';

export class Modal extends Component {
  constructor(props) {
    super(props);

    this.onClose = this.onClose.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
  }

  onClose() {
    const { item, onClose } = this.props;
    if (item.onClose) {
      item.onClose();
      onClose(item);
    } else {
      onClose(item);
    }
  }

  onConfirm() {
    const { item, onClose } = this.props;
    if (item.onConfirm) {
      item.onConfirm();
      onClose(item);
    }
  }

  render() {
    const { item, noCloseOnBackgroundClick } = this.props;
    const { type } = item;
    if (type === 'confirmation') {
      const { title, message, confirmLabel, cancelLabel, component } = item;

      return (
        <Overlay
          closeOverlay={this.onClose}
          noCloseOnBackgroundClick={noCloseOnBackgroundClick}
        >
          <styled.Modal>
            {title && <styled.Title>{title}</styled.Title>}
            {message && <styled.Message>{message}</styled.Message>}
            {component}
            <styled.ButtonGroup>
              {cancelLabel && (
                <Button color="mono" onClick={this.onClose}>
                  {cancelLabel}
                </Button>
              )}
              {confirmLabel && (
                <Button color="primary" onClick={this.onConfirm}>
                  {confirmLabel}
                </Button>
              )}
            </styled.ButtonGroup>
          </styled.Modal>
        </Overlay>
      );
    }
    if (type === 'info') {
      const { title, message, values } = item;
      const formattedTitle = isObject(title) ? (
        <FormattedMessage {...title} />
      ) : (
        title
      );
      const formattedMsg = isObject(message) ? (
        <FormattedMessage {...message} values={values} />
      ) : (
        message
      );

      return (
        <Overlay
          closeOverlay={this.onClose}
          noCloseOnBackgroundClick={noCloseOnBackgroundClick}
        >
          <styled.Modal align="left">
            {formattedTitle && <styled.Title>{formattedTitle}</styled.Title>}
            {formattedMsg && <styled.Message>{formattedMsg}</styled.Message>}
            <styled.ButtonGroup align="right">
              <Button onClick={this.onClose}>
                <FormattedMessage {...i18n.buttonClose} />
              </Button>
            </styled.ButtonGroup>
          </styled.Modal>
        </Overlay>
      );
    }
    if (type === 'custom') {
      const { content } = item;
      return (
        <Overlay
          closeOverlay={this.onClose}
          noCloseOnBackgroundClick={noCloseOnBackgroundClick}
        >
          <styled.Modal>{content}</styled.Modal>
        </Overlay>
      );
    }
    return <div></div>;
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  noCloseOnBackgroundClick: PropTypes.bool,
  item: PropTypes.object.isRequired,
};
