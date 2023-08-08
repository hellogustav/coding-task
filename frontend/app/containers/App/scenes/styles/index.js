import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Colors } from 'components/utils/styles/ui';

export const FlashMessage = styled(ToastContainer)`
  ${({ theme }) => theme.typography.text.large};
  margin: 0 0 2rem 4.5rem;
  white-space: pre-wrap;

  .Toastify__toast--success {
    background-color: ${Colors.green};

    .Toastify__progress-bar {
      background-color: ${Colors.greenLight};
    }
  }

  .Toastify__toast--error {
    background-color: ${Colors.red};

    .Toastify__progress-bar {
      background-color: ${Colors.redLight};
    }
  }

  .Toastify__toast--info {
    background-color: ${Colors.textLighter};
  }
`;
