import  React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as authorActions from '../../actions/authorActions';
import AuthorList from './AuthorList';
import  {browserHistory} from 'react-router';
import toastr from 'toastr';

class AuthorPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            deleting: false
        };

        this.redirectToAddAuthorPage = this.redirectToAddAuthorPage.bind(this);
        this.deleteAuthor = this.deleteAuthor.bind(this);
    }

    redirectToAddAuthorPage() {
        browserHistory.push('/author');
    }

    deleteAuthor(event) {
        if (!confirm('Are you sure you want to delete the author?'))
            return;

        if (this.state.deleting)
            return;

        const deleteAuthorId = event.currentTarget.value;

        this.setState({deleting: true});

        this.props.actions.deleteAuthor(deleteAuthorId)
            .then(() => {
                this.setState({deleting: false});
                toastr.success('Author deleted');
            })
            .catch(error => {
                this.setState({deleting: false});
                toastr.error(error);
            });
    }

    render() {
        const {authors} = this.props;
        return (
            <div>
                <h1>Authors</h1>
                <input type="submit"
                       value="Add Author"
                       className="btn btn-primary"
                       onClick={this.redirectToAddAuthorPage}/>
                {authors.length === 0 ? null : <AuthorList authors={authors} onDelete={this.deleteAuthor}/>}
            </div>
        );
    }
}

AuthorPage.propTypes = {
    authors: React.PropTypes.array.isRequired,
    actions: React.PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        authors: state.authors
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(authorActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthorPage);
