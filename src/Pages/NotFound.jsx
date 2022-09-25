import {Link} from 'react-router-dom';

const NotFound = () => {
    return(
        <>
            <h2>Page Not Found</h2>
            <div style={{textAlign: 'center'}}>
                <Link to='/'>Home</Link>
            </div>
        </>
    )
};

export default NotFound;