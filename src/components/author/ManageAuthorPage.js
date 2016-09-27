import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as authorActions from "../../actions/authorActions";
import AuthorForm from "./AuthorForm";
import toastr from "toastr";

export class ManageAuthorPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            author: Object.assign({}, props.author),
            errors: {},
            saving: false,
            dirty: false
        };

        this.updateAuthorState = this.updateAuthorState.bind(this);
        this.saveAuthor = this.saveAuthor.bind(this);
    }

    componentDidMount() {
        this.context.router.setRouteLeaveHook(this.props.route, () => {
            if (this.state.dirty) {
                return 'Your work is not saved! Are you sure you want to leave?';
            }
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.author.id == 'notFound') {
            this.context.router.push('/notFound');
        }

        if (this.props.author.id != nextProps.author.id) {
            // Necessary to populate form when existing course is loaded directly.
            this.setState({author: Object.assign({}, nextProps.author)});
        }
    }

    updateAuthorState(event) {
        this.setState({dirty: true});
        const field = event.target.name;
        let author = this.state.author;
        author[field] = event.target.value;
        return this.setState({author: author});
    }

    authorFormIsValid() {
        let formIsValid = true;
        let errors = {};

        if (this.state.author.firstName.length < 5) {
            errors.firstName = 'First Name must be at least 5 characters.';
            formIsValid = false;
        }

        if (this.state.author.lastName.length < 5) {
            errors.lastName = 'Last Name must be at least 5 characters.';
            formIsValid = false;
        }

        this.setState({errors: errors});
        return formIsValid;
    }


    saveAuthor(event) {
        event.preventDefault();

        if (!this.authorFormIsValid()) {
            return;
        }

        this.setState({saving: true, dirty: false});

        this.props.actions.saveAuthor(this.state.author)
            .then(() => this.redirect())
            .catch(error => {
                toastr.error(error);
                this.setState({saving: false});
            });
    }

    redirect() {
        this.setState({saving: false});
        toastr.success('Author saved');
        this.context.router.push('/authors');
    }

    render() {
        return (
            <AuthorForm
                onChange={this.updateAuthorState}
                onSave={this.saveAuthor}
                author={this.state.author}
                errors={this.state.errors}
                saving={this.state.saving}
            />
        );
    }
}

ManageAuthorPage.propTypes = {
    author: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    route: React.PropTypes.object
};

//Pull in the React Router context so router is available on this.context.router.
ManageAuthorPage.contextTypes = {
    router: PropTypes.object
};

function getAuthorById(authors, id) {
    const author = authors.filter(x => x.id == id);
    if (author) return author[0]; //since filter returns an array, have to grab the first.
    return null;
}

function mapStateToProps(state, ownProps) {
    const authorId = ownProps.params.id; // from the path `/course/:id`

    let author = {id: '', firstName: '', lastName: ''};

    if (authorId && state.authors.length > 0) {
        author = getAuthorById(state.authors, authorId);
        if (author == null) {
            author = {id: 'notFound'};
        }
    }

    return {
        author: author
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(authorActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageAuthorPage);


