import styled, { css } from 'styled-components';

import { Colors } from 'components/utils/styles/ui';

const truncatedMixin = css`
  p,
  ul,
  ol,
  li,
  blockquote {
    margin: 0 !important;
  }
`;

const htmlMixin = css`
  white-space: normal;

  ${({ isTruncated }) => isTruncated && truncatedMixin}
`;

export const Content = styled.div`
  white-space: pre-wrap;

  ${({ isHtml }) => isHtml && htmlMixin}
`;

export const LinkMore = styled.span`
  margin-left: 0.3rem;
  cursor: pointer;
  text-decoration: underline;
  color: ${Colors.tealDark};
`;

export const Truncate = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
