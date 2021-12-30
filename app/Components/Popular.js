import React from 'react';

export default class Popular extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLanguage: 'All',
    };
    this.updateLanguage = this.updateLanguage.bind(this);
  }

  updateLanguage(selectedLanguage) {
    this.setState({
      selectedLanguage,
    });
  }
  render() {
    const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
    return (
      <ul className="flex-center">
        {languages.map((language) => (
          <li key={language}>
            <button
              onClick={() => this.updateLanguage(language)}
              style={
                this.state.selectedLanguage === language
                  ? { color: 'rgb(187, 46, 31)' }
                  : null
              }
              className={'btn-clear nav-link'}
            >
              {language}
            </button>
          </li>
        ))}
      </ul>
    );
  }
}
