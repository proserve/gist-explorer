import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import { GIST_LIST, SEARCH_USERS } from './constants';
import UserSuggestion from './components/UserSuggestion';
import GistCard from './components/GistCard';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isUsersSearchLoading: false,
      username: null,
      term: '',
      page: 1,
      gists: [],
      suggestions: [],
    };
    this.suggestionsCache = {};
    this.searchUserGist = this.searchUserGist.bind(this);
    this.onUsernameChange = this.onUsernameChange.bind(this);
  }

  async onUsernameChange(event) {
    const term = event.target.value;
    this.setState({ term, username: null });
    if (term && term.length > 2) {
      this.setState({ isUsersSearchLoading: true });
      const cachedSuggestions = this.suggestionsCache[term];
      if (cachedSuggestions) this.setState({ suggestions: cachedSuggestions });
      try {
        const resp = await axios.get(SEARCH_USERS(term));
        const suggestions = resp.data.items;
        this.suggestionsCache[term] = suggestions;
        this.setState({ suggestions });
      } catch (error) {
        console.log(error);
      }
      this.setState({ isUsersSearchLoading: false });
    } else {
      this.setState({ suggestions: [] });
    }
  }

  async searchUserGist(username, page = 1) {
    this.setState({
      isLoading: true,
      term: username,
      suggestions: [],
    });
    this.setState({ page });
    try {
      const resp = await axios.get(`${GIST_LIST(username, page)}`);
      const gistsRowData = resp.data;
      // Github return the newest fork by default
      const forksList = await Promise.all(
        gistsRowData.map(gist => axios.get(`${gist.forks_url}?per_page=3`)),
      );
      const gists = gistsRowData.map(
        (gist, index) => ({ ...gist, forks: forksList[index].data }),
      );
      this.setState({ gists });
      console.log(gists);
    } catch (error) {
      console.error(JSON.stringify(error));
    }
    this.setState({ isLoading: false, username });
  }

  render() {
    const {
      isLoading, gists, term, isUsersSearchLoading, suggestions, username, page,
    } = this.state;
    return (
      <div>
        <h1 className="app-title">
          Gist Explorer App
        </h1>
        <div className="container">
          <button
            type="button"
            style={{ opacity: page > 1 ? 1 : 0 }}
            className="btn left-nav-btn"
            onClick={() => (page > 1 ? this.searchUserGist(username, page - 1) : null)}
          >
          Prev
          </button>
          <input
            type="text"
            value={term}
            className="username-input"
            onChange={this.onUsernameChange}
            placeholder="Username ..."
          />
          <button
            type="button"
            style={{ opacity: (gists.length === 10 && username) ? 1 : 0 }}
            className="btn right-nav-btn"
            onClick={() => ((gists.length === 10 && username)
              ? this.searchUserGist(username, page + 1)
              : null)}
          >Next
          </button>
          {suggestions.length || isUsersSearchLoading
            ? (
              <div className="user-suggestions">
                {isUsersSearchLoading && (
                <h3>
                  Loading users ...
                </h3>
                )}
                {suggestions.length ? (<h3 className="title">Users Suggestions</h3>) : null}
                {suggestions.map(user => (
                  <UserSuggestion
                    key={user.node_id}
                    user={user}
                    onPress={() => this.searchUserGist(
                      user.login,
                    )}
                  />
                ))}
              </div>
            ) : null}
        </div>
        {isLoading && (
        <h3 className="app-title">Loading Gists ...</h3>
        )}
        <div className="gists-container">
          {username && !gists.length
            ? (
              <h2>No gist found for this user</h2>
            )
            : gists.map(gist => <GistCard key={gist.node_id} gist={gist} />)}
        </div>
      </div>
    );
  }
}

export default App;
