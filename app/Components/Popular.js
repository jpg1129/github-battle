import React from 'react';
import PropTypes from 'prop-types';
import { fetchPopularRepos } from '../utils/api';

function LanguagesNav({ selected, onUpdateLanguage }) {
  const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
  return (
    <ul className="flex-center">
      {languages.map((language) => (
        <li key={language}>
          <button
            onClick={() => onUpdateLanguage(language)}
            style={selected === language ? { color: 'rgb(187, 46, 31)' } : null}
            className={'btn-clear nav-link'}
          >
            {language}
          </button>
        </li>
      ))}
    </ul>
  );
}

LanguagesNav.propTypes = {
  selected: PropTypes.string.isRequired,
  onUpdateLanguage: PropTypes.func.isRequired,
};
export default class Popular extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLanguage: 'All',
      repos: null,
      error: null,
    };
    this.updateLanguage = this.updateLanguage.bind(this);
    this.isLoading = this.isLoading.bind(this);
  }

  async updateLanguage(selectedLanguage) {
    this.setState({
      selectedLanguage,
      // if user is switching languages want to show loading screen
      repos: null,
      error: null,
    });
    try {
      let repos = await fetchPopularRepos(selectedLanguage);
      this.setState({ selectedLanguage, repos, error: null });
    } catch (error) {
      console.warn('Error fetching repos: ', error);
      this.setState({
        error: 'There was an error fetchinn the repositories',
      });
    }
  }
  isLoading() {
    return this.state.repos == null && this.state.error == null;
  }
  render() {
    const { selectedLanguage, repos, error } = this.state;

    return (
      <React.Fragment>
        <LanguagesNav
          selected={selectedLanguage}
          onUpdateLanguage={this.updateLanguage}
        />
        {this.isLoading() && <p>LOADING...</p>}
        {error && <p>{error}</p>}
        {repos && <pre>{JSON.stringify(repos, null, 2)}</pre>}
      </React.Fragment>
    );
  }
}
