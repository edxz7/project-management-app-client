import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddProject from "./AddProject";
import { ThemeContext } from "../context/theme.context";
import projectsService from "../services/projects.service";

const ProjectList = () => {
    const { theme } = useContext(ThemeContext)

    const [ projects, setProjects ] = useState([]);

    const getAllProject = async () => {
        try {
            const response = await projectsService.getAllProjects()
            setProjects(response.data);
        } catch (error) {
            console.log(error)
        }
    } 

    useEffect(() => {
        getAllProject()
    },[])

    const deleteProject = async (projectId) => {
        await projectsService.deleteProject(projectId)
        getAllProject()
    } 

    return (
        <div className={"ProjectsPage "+theme}>
            <div className="projects-row">
                <div className="projects-col">
                    <AddProject getAllProject={getAllProject}/>
                </div>
                <div className="projects-col">
                    {
                        projects.map(project => (
                            <div className="ProjectCard card" key={project._id}>
                                <Link to={`/projects/${project._id}`} >
                                    <h3>{project.title}</h3>
                                </Link>

                                <input 
                                    type="submit" 
                                    value="Delete Project"
                                    onClick={() => deleteProject(project._id)} 
                                />

                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default ProjectList;