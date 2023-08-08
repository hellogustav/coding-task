import styled, { css } from 'styled-components';

const positionByType = (type) => {
  switch (type) {
    case 'checkbox':
      return css`
        bottom: -0.2rem;
      `;

    case 'textarea':
      return css`
        top: 1.6rem;
      `;

    case 'rte':
      return css`
        top: 5.4rem;
      `;

    case 'jobSharing':
      return css`
        top: calc(50% - 0.8rem);
      `;

    case 'tagsAutocomplete':
      return css`
        bottom: 2.4rem;
      `;

    case 'optionsConfigurator':
      return css`
        bottom: calc(50% - 1rem);
      `;

    default:
      return css`
        bottom: 0.7rem;
      `;
  }
};

export const ValidationErrorIcon = styled.div`
  position: absolute;
  ${({ inputType }) => positionByType(inputType)};
  left: -2.4rem;
`;
