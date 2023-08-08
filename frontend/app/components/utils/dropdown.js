const UNIT_REM = 10;

export function getDropdownOptionsSettings({
  element,
  options,
  extraContentHeight = 0,
  optionsHeight = 5,
  maxOptionsHeight = 20,
  borderHeight = 0.2,
  defaultOptionsPosition = 'bottom',
}) {
  let position = defaultOptionsPosition;

  const optionsTotalHeight =
    (options.length * optionsHeight + borderHeight + extraContentHeight) *
    UNIT_REM;
  const maxHeight =
    (maxOptionsHeight + borderHeight + extraContentHeight) * UNIT_REM;

  const optionsDivHeight =
    optionsTotalHeight > maxHeight ? maxHeight : optionsTotalHeight;

  const isOptionsOverflowBottom =
    element.getBoundingClientRect().bottom + optionsDivHeight >
    document.defaultView.innerHeight;
  const isOptionsOverflowTop =
    element.getBoundingClientRect().top - optionsDivHeight < 0;

  if (!isOptionsOverflowTop && isOptionsOverflowBottom) {
    position = 'top';
  }

  if (isOptionsOverflowTop && !isOptionsOverflowBottom) {
    position = 'bottom';
  }

  return {
    height: optionsDivHeight / UNIT_REM,
    position,
  };
}
