import Alert from 'react-bootstrap/Alert';

function AlertSuccess()
{
    return (
        <>
            {[
                'success'
            ].map((variant) => (
                <Alert key={variant} variant={variant}>
                    This is a {variant} alert—check it out!
                </Alert>
            ))}
        </>
    );
}

export default AlertSuccess;