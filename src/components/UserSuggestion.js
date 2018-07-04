import React from 'react';
import PropTypes from 'prop-types';

const UserSuggestion = ({ user, onPress }) => (
  <div className="user-suggestion" onClick={() => onPress(user)}>
    <img
      src={user.avatar_url}
      alt={`${user.login} avatar`}
      className="user-avatar"
    />
    <span>{user.login}</span>
  </div>
);

UserSuggestion.propTypes = {
  user: PropTypes.shape({
    avatar_url: PropTypes.string,
    login: PropTypes.string,
  }).isRequired,
  onPress: PropTypes.func.isRequired,
};
export default UserSuggestion;
