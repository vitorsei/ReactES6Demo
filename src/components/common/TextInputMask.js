import React, {PropTypes} from 'react';
import MaskedInput from 'react-maskedinput';

const TextInputMask = ({name, label, mask, size, onChange, placeholder, value, error}) => {
    let wrapperClass = 'form-group';
    if (error && error.length > 0) {
        wrapperClass += " " + 'has-error';
    }

    return (
        <div className={wrapperClass}>
            <label htmlFor={name}>{label}</label>
            <div className="field">
                <MaskedInput
                    mask={mask}
                    siz={size}
                    type="text"
                    name={name}
                    className="form-control"
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}/>
                {error && <div className="alert alert-danger">{error}</div>}
            </div>
        </div>
    );
};

TextInputMask.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    mask: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    error: PropTypes.string
};

export default TextInputMask;
