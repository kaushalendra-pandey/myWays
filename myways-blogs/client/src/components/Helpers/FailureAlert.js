import React from 'react'

const FailureAlert = ({message}) => {
    return (
        <div className="alert alert-danger">
            {message}
        </div>
    )
}

export default FailureAlert
