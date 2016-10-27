import React from 'react';
import {Link} from 'react-router';

class HomePage extends React.Component {
  render() {
    return (
      <div className="jumbotron">
        <h1>Xavier's School for Gifted Youngsters Administration</h1>
        <p>Train young mutants in controlling their powers and help foster a friendly human-mutant relationship.</p>
        <Link to="about" className="btn btn-primary btn-lg">Learn more</Link>
      </div>
    );
  }
}

export default HomePage;
