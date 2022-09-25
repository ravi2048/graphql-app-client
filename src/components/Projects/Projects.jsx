import { useQuery } from "@apollo/client";
import { useState } from 'react';
import { GET_PROJECTS } from '../../queries/projectQueries';
import Modal from './Modal';
import ProjectCard from './ProjectCard';
import './Projects.css';

const Projects = () => {
    const [showModal, setShowModal] = useState(false);
    const {data, loading, error} = useQuery(GET_PROJECTS);
    // console.log(`@@@@projects data: ${JSON.stringify(data)}`);
    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Something went wrong!!</p>;
    }

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    return (
        <>
            <div className="projects-section-header">
                <h2>Projects</h2>
                <div className='add-project'>
                    <button onClick={toggleModal} style={{cursor:"pointer"}}>Add Project</button>
                </div>
                { showModal && <Modal setShowModal={setShowModal}/>}
            </div>
            <div className="projects">
                {data.projects.length > 0 ? (
                    data.projects.map((project) => (
                        <ProjectCard project={project} key={project.id}/>
                    ))
                ) : (
                    <h2>No Projects To Show</h2>
                )}
            </div>
        </>
    );
}

export default Projects;