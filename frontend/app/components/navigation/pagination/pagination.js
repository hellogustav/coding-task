import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { range, pick, merge } from 'lodash';

import * as styled from './styles/pagination';

export class Pagination extends Component {
  onLinkClick(page) {
    const { onPageChange } = this.props;

    if (this.isInvalidPage(page)) {
      return;
    }
    onPageChange(page);
  }

  isInvalidPage(page) {
    const { maxPage, page: currPage } = this.props;

    return page === currPage || page < 1 || page > maxPage;
  }

  linksRange(start, end) {
    return range(start, end).map((i) => this.renderLink(i));
  }

  renderLink(page, icon = null) {
    const { location, page: currPage } = this.props;
    const linkTo = pick(location, ['pathname', 'query']);

    return (
      <styled.Link
        key={page}
        to={
          this.isInvalidPage(page)
            ? null
            : merge({}, linkTo, { query: { page } })
        }
        onClick={() => this.onLinkClick(page)}
        data-active={page === currPage}
      >
        {icon ? <styled.Icon icon={icon} color="white" /> : page}
      </styled.Link>
    );
  }

  renderCounter() {
    const { labelCount, totalCount } = this.props;
    if (labelCount && totalCount) {
      return <styled.Total>{`${totalCount} ${labelCount}`}</styled.Total>;
    }
    return <styled.Total />;
  }

  // render range of links, with (...) and `step` number of links around current page
  renderLinks(page, maxPage, step) {
    if (maxPage < step * 2 + 6) {
      // no need to display (...)
      return <styled.Links>{this.linksRange(1, maxPage + 1)}</styled.Links>;
    }
    if (page < step * 2 + 1) {
      // display (...) at the end, before link to last page
      return (
        <styled.Links>
          {this.linksRange(1, step * 2 + 4)}
          <styled.Dots>...</styled.Dots>
          {this.renderLink(maxPage)}
        </styled.Links>
      );
    }
    if (page > maxPage - step * 2) {
      // display (...) at the beginning, just after link to first page
      return (
        <styled.Links>
          {this.renderLink(1)}
          <styled.Dots>...</styled.Dots>
          {this.linksRange(maxPage - step * 2 - 2, maxPage + 1)}
        </styled.Links>
      );
    }
    return (
      // display (...) at the beginning and end od pagination links
      <styled.Links>
        {this.renderLink(1)}
        <styled.Dots>...</styled.Dots>
        {this.linksRange(page - step, page + step + 1)}
        <styled.Dots>...</styled.Dots>
        {this.renderLink(maxPage)}
      </styled.Links>
    );
  }

  render() {
    const { page, maxPage } = this.props;
    const step = 2;

    return (
      <styled.Pagination>
        {this.renderCounter()}
        <styled.Pages>
          {this.renderLink(page - 1, 'CaretLeft')}
          {this.renderLinks(page, maxPage, step)}
          {this.renderLink(page + 1, 'CaretRight')}
        </styled.Pages>
      </styled.Pagination>
    );
  }
}

Pagination.propTypes = {
  totalCount: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  maxPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  labelCount: PropTypes.string,
  location: PropTypes.object.isRequired,
};
