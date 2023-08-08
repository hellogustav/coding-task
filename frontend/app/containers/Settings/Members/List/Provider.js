import { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { fetchAllMembers } from './actions';

const Props = {
  children: PropTypes.func.isRequired,

  onComponentMount: PropTypes.func,
};

const DefaultState = {
  isFetching: false,
  members: [],
};

class MembersProviderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = DefaultState;
  }

  UNSAFE_componentWillMount() {
    this.fetchMembers();
  }

  fetchMembers = () => {
    const { onComponentMount, filter } = this.props;

    this.setState({ isFetching: true }, () => {
      onComponentMount(filter).then(({ data }) => {
        this.setState({
          isFetching: false,
          members: data,
        });
      });
    });
  };

  render() {
    const { children } = this.props;
    const { isFetching, members } = this.state;

    return children({
      isFetching,
      members,
    });
  }
}

MembersProviderComponent.propTypes = {
  filter: PropTypes.shape({
    counter: PropTypes.string,
  }),
};

function mapDispatchToProps(dispatch) {
  return {
    onComponentMount: (filter) => dispatch(fetchAllMembers(filter)),
  };
}

const withConnect = connect(null, mapDispatchToProps);

MembersProviderComponent.propTypes = Props;

export const MembersProvider = compose(withConnect)(MembersProviderComponent);

export { Props, DefaultState };
