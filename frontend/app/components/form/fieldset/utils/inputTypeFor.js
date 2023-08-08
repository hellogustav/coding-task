import React from 'react';
import moment from 'moment';

import { InputText } from '../../input/text';
import { Select as InputOption } from '../../select/select';
import { Textarea } from '../../textarea/textarea';
import { Checkbox } from '../../checkbox/checkbox';

/**
 * @function inputFor
 * @param {object} inputObj
 * @param {UIComponent} CustomInputType
 * @return {UIComponent}
 *
 * @description based on the inputObj.inputType it will return an input type,
 *   which could be text, calendar, option, each ui-component has a default
 *   component with its styles (styled-component) however you can send
 *   CustomInputType if you need to send, for example, a custom Option
 */
export const inputFor = function inputFor(inputObj, CustomInputType) {
  const { shouldValidate, inputType } = inputObj;

  switch (inputType) {
    case 'option':
    case 'currency': {
      const FormFieldUI = CustomInputType || InputOption;
      return (
        <FormFieldUI
          inputType={inputType}
          disabled={inputObj.disabled}
          selected={inputObj.selected}
          selectionSource={inputObj.selectionSource}
          options={inputObj.options}
          optionsFn={inputObj.optionsFn}
          padding=".9rem 2rem .7rem 1rem"
          required={inputObj.required}
          shouldValidate={shouldValidate}
          onChange={(selected) => inputObj.fn(selected)}
          onFocus={inputObj.onFocus}
          selectTag="button"
          optionsHeight={inputObj.optionsHeight}
          optionsPosition={inputObj.optionsPosition}
          optionsTypeahead={inputObj.optionsTypeahead}
          size={inputObj.size}
          listWithoutPlaceholder={inputObj.listWithoutPlaceholder}
          placeholder={inputObj.placeholder}
        />
      );
    }

    case 'textarea': {
      const FormFieldUI = CustomInputType || Textarea;
      return (
        <FormFieldUI
          id={inputObj.id}
          inputType={inputType}
          value={inputObj.inputValue}
          name={inputObj.name}
          placeholder={inputObj.placeholder}
          required={inputObj.required}
          maxlength={inputObj.maxlength}
          rows={inputObj.rows}
          showCharactersCounter={inputObj.showCharactersCounter}
          shouldValidate={shouldValidate}
          onChange={(value) => inputObj.fn(value)}
          onFocus={inputObj.onFocus}
          maxHeight={inputObj.maxHeight}
        >
          {inputObj.inputValue}
        </FormFieldUI>
      );
    }

    case 'checkbox':
      return (
        <Checkbox
          id={inputObj.id}
          inputType={inputType}
          checked={inputObj.checked}
          required={inputObj.required}
          shouldValidate={shouldValidate}
          value={inputObj.inputValue}
          name={inputObj.name}
          onChange={(value) => inputObj.fn(value)}
        />
      );

    case 'text':
    case 'number':
    case 'password':
    default: {
      const FormFieldUI = CustomInputType || InputText;
      return (
        <FormFieldUI
          key={inputObj.key}
          id={inputObj.id}
          name={inputObj.name}
          disabled={inputObj.disabled}
          readonly={inputObj.readonly}
          required={inputObj.required}
          min={inputObj.min}
          max={inputObj.max}
          maxlength={inputObj.maxlength}
          value={inputObj.inputValue}
          placeholder={inputObj.placeholder}
          indicator={inputObj.inputIndicator}
          iconIndicator={inputObj.inputIconIndicator}
          inputType={inputType || 'text'}
          size={inputObj.size}
          isValid={inputObj.isValid}
          shouldValidate={shouldValidate}
          onChange={(value) => inputObj.fn(value)}
          onKeyUp={inputObj.onKeyUp}
          onFocus={inputObj.onFocus}
          onBlur={inputObj.onBlur}
          onKeyPress={inputObj.onKeyPress}
          autoFocus={inputObj.autoFocus}
          validationErrorIndicator={inputObj.validationErrorIndicator}
          clearable={inputObj.clearable}
          onClear={inputObj.onClear}
          onInnerRef={inputObj.onInnerRef}
        />
      );
    }
  }
};
