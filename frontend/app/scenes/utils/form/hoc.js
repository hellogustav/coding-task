import PropTypes from 'prop-types';
import React from 'react';

import { isEmpty, clone, noop, isEqual, isObject, reduce } from 'lodash';

import {
  GrayContainer,
  EmptyContainer,
} from 'components/structure/page/styles/containers';

import {
  openFlashMessage,
  closeValidationFlashMessages,
} from 'components/utils/flashMessages';

import i18nBase from '../i18n';

/* eslint no-unused-vars:0 */
/* eslint react/no-did-update-set-state: 0 */
export const formHOC = function formHOC() {
  return function form(WrappedComponent) {
    return class extends WrappedComponent {
      constructor(props) {
        super(props);

        const stateObject = this.parseObject(props.editObject);

        this.state = {
          currentObject: {
            loadedForEdit: false,
            shouldValidate: false,
            ...stateObject,
          },
          initObject: {
            loadedForEdit: false,
            shouldValidate: false,
            ...stateObject,
          },
        };

        this.isValid = this.isValid.bind(this);
        this.save = this.save.bind(this);
        this.revertChanges = this.revertChanges.bind(this);
        this.changesCounter = this.changesCounter.bind(this);
      }

      componentDidUpdate(prevProps) {
        const { editObject, prefilledData } = this.props;
        const {
          editObject: oldEditObj,
          prefilledData: oldPrefilledData,
        } = prevProps;

        if (isEmpty(oldPrefilledData) && !isEmpty(prefilledData)) {
          const stateObject = this.parseObject(prefilledData);

          this.setState({ currentObject: { ...stateObject } });
        }

        if (
          !isEmpty(editObject) &&
          !this.state.currentObject.loadedForEdit &&
          oldEditObj.id !== editObject.id
        ) {
          const stateObject = this.parseObject(editObject);

          this.setState({
            currentObject: {
              loadedForEdit: true,
              ...stateObject,
            },
            initObject: {
              ...stateObject,
            },
          });
        }
      }

      componentWillUnmount() {
        closeValidationFlashMessages();
        this.setState({
          currentObject: { ...this.state.currentObject, loadedForEdit: false },
        });
      }

      inputsChanges(inputsKeyVal, callback) {
        this.setState(
          (state) => ({
            ...state,
            currentObject: { ...state.currentObject, ...inputsKeyVal },
          }),
          callback
        );
      }

      inputChange(fieldKey, value, callback) {
        this.setState(
          (state) => ({
            ...state,
            currentObject: { ...state.currentObject, [fieldKey]: value },
          }),
          callback
        );
      }

      getErrorMessages(stateObject) {
        return this.getErrorKeys(stateObject).map((key) => ({
          detail: isObject(key) ? key : i18nBase[key],
        }));
      }

      isValid(stateObject) {
        const isValid = this.shouldSubmit(stateObject);

        const { currentObject } = this.state;

        closeValidationFlashMessages();
        if (!isValid) {
          this.setState({
            currentObject: { ...currentObject, shouldValidate: true },
          });
          openFlashMessage(
            { context: this.getErrorMessages(stateObject), status: 'error' },
            { validationError: true, autoClose: false }
          );
        } else {
          this.setState({
            currentObject: {
              ...this.state.currentObject,
              shouldValidate: false,
            },
          });
        }

        return isValid;
      }

      /**
       * @param {object} [extraParams={}] - it should be only values comming from the action
       *  e.g. a button that has to include what type of button was used to submit
       */
      save(event, extraParams = {}) {
        const { saveForm } = this.props;
        const { currentObject } = this.state;

        if (event) {
          event.preventDefault();
          event.stopPropagation();
        }

        const { shouldValidate, ...stateObject } = currentObject;

        if (!this.isValid({ ...stateObject, ...extraParams })) {
          return Promise.reject();
        }

        const objectToSave = clone(this.objectToSave(stateObject));

        if (stateObject.cleanForm) {
          this.setState({
            currentObject: {
              ...currentObject,
              ...this.parseObject(),
            },
            initObject: {
              ...currentObject,
              ...this.parseObject(),
            },
          });
        }

        this.setState({
          initObject: {
            ...currentObject,
          },
        });

        return saveForm({ ...objectToSave, ...extraParams });
      }

      revertChanges(initDefaults = {}) {
        const initObject = { ...this.state.initObject, ...initDefaults };

        closeValidationFlashMessages();
        this.setState({ initObject, currentObject: initObject });
      }

      compareFormValues(currentValue, initValue) {
        if (initValue === null && currentValue === '') {
          return false;
        }
        return !isEqual(currentValue, initValue);
      }

      prepareComparableDataObjects(state) {
        return {
          initObject: { ...state.initObject },
          currentObject: { ...state.currentObject },
        };
      }

      changesCounter(fnCustomCurrentObject = null) {
        const { initObject, currentObject } = fnCustomCurrentObject
          ? fnCustomCurrentObject(
              this.state.initObject,
              this.state.currentObject
            )
          : this.prepareComparableDataObjects(this.state);

        delete initObject.loadedForEdit;
        delete currentObject.loadedForEdit;
        delete initObject.shouldValidate;
        delete currentObject.shouldValidate;

        return reduce(
          currentObject,
          (counter, value, key) => {
            if (this.compareFormValues(value, initObject[key])) {
              return counter + 1;
            }
            return counter;
          },
          0
        );
      }

      render() {
        const { shouldValidate, ...stateObject } = this.state.currentObject;

        const hocProps = {
          shouldValidate,
          formObject: stateObject,
          inputChange: (field, value, callback = noop) =>
            this.inputChange(field, value, callback),
          inputsChanges: (inputsKeyVal, callback = noop) =>
            this.inputsChanges(inputsKeyVal, callback),
          saveForm: (event, extraParams = {}) => this.save(event, extraParams),
          isValid: this.isValid,
          revertChanges: this.revertChanges,
          changesCounter: this.changesCounter,
        };

        const props = { ...this.props, ...hocProps };

        const MainContainer =
          stateObject.mainContainer ||
          (this.props.isModal ? EmptyContainer : GrayContainer);

        return (
          <MainContainer>
            <WrappedComponent {...props} />
          </MainContainer>
        );
      }
    };
  };
};

formHOC.propTypes = {
  stateObject: PropTypes.string,
  editObject: PropTypes.object,
  saveForm: PropTypes.func,
  prefilledData: PropTypes.object,
};

formHOC.defaultProps = {
  editObject: {},
};
