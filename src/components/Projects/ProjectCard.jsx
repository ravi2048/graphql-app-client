const ProjectCard = ({project}) => {
    // console.log(`$$$$$ ${JSON.stringify(project)}`);
    return(
        <div className="project-card" key={project.id}>
            <span>{project.name}</span>
            <div className="project-status">
                <span>Status: {project.status}</span>
                <a href={`/projects/${project.id}`}>View</a>
            </div>
        </div>
    )
}

export default ProjectCard;