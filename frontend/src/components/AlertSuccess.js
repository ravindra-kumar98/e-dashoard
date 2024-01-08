import Alert from 'react-bootstrap/Alert';

function AlertSuccess()
{
    return (
        <>
            {[
                'success'
            ].map((variant) => (
                <Alert key={variant} variant={variant}>
                    Process successfully completed
                </Alert>
            ))}
        </>
    );
}

export default AlertSuccess;