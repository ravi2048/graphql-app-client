import { Link, useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { GET_PROJECT } from '../queries/projectQueries';
import './Project.css';
import { DELETE_PROJECT } from '../mutations/projectMutation';

const Project = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [deleteProject] = useMutation(DELETE_PROJECT, {
        variables: {id},
        onCompleted: () => navigate('/')
    });
    const { data, loading, error } = useQuery(GET_PROJECT, { variables: { id } });
    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Something went wrong!!</p>;
    }


    return(
        <>
            <div className="project-container">
                <div className="project-info">
                    <div className="header">
                        <h1>{data.project.name}</h1>
                        <button className="back-button">
                            <Link to="/">Back</Link>
                        </button>
                    </div>
                    <h2>Description: {data.project.description} <br/> Status: {data.project.status}</h2>
                </div>
                <br/>
                <div className="client-info">
                    <h2 className='heading2'>Associated Client's Info:</h2>
                    <h2>Name: {data.project.client ? data.project.client.name : 'No Client Assigned'} <br/>Email: {data.project.client ? data.project.client.email : 'NA'} <br/>Phone: {data.project.client ? data.project.client.phone : 'NA'} </h2>
                </div>
                <div className="action-buttons">
                    {/* <button>Edit</button> */}
                    <button onClick={deleteProject} style={{cursor:'pointer'}}>Delete</button>
                </div>
            </div>
        </>
    )
}

export default Project;