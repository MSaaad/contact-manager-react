import React from 'react'
import PropTypes from 'prop-types'
import { TextField } from '@material-ui/core'

const textInputGroup  = ({label,name,value,type,onChange}) => {
    return <TextField
            required
            name = {name}
            type = {type}
            onChange = {onChange}
            className={classes.textField}
            label = {label}
            helperText = {`Enter the contact ${name}`}
            value = {value}
            />
}
textInputGroup.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
}
textInputGroup.defaultProps = {
    type: 'text'
}

export default textInputGroup
