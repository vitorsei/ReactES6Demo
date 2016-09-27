import React from 'react';
import {Link} from 'react-router';

const AuthorListRow = ({author, onDelete}) => {
    return (
        <tr>
            <td><Link to={'/author/' + author.id}>{author.firstName} {author.lastName}</Link></td>
            <td>
                <button className="btn btn-danger btn-sm"  onClick={onDelete} value={author.id}>
                    delete
                </button>
            </td>
        </tr>
    );
};

AuthorListRow.propTypes = {
    author: React.PropTypes.object.isRequired,
    onDelete: React.PropTypes.func.isRequired
};

export default AuthorListRow;