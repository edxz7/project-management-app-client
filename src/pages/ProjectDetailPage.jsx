import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AddTask from "./AddTask";
import projectsService from "../services/projects.service";
import taskService from "../services/tasks.service";

const ProjectDetailPage = () => {
    const [ project, setProject ] = useState(null)

    const { projectId } = useParams();

    const getOneProject = async () => {
        const oneProject = (await projectsService.getOneProject(projectId)).data
        setProject(oneProject)
    }


    useEffect(() => {
        getOneProject()
    }, [])


    const deleteTask = async (taskId) => {
        await taskService.deleteTask(taskId)
        getOneProject()
    }
    return (
        <div className="ProjectDetails">
            {
                project && (
                    <>
                        <h3>{project.title}</h3>
                        <p>{project.description}</p>
                    </>
                )
            }

            <div className="projects-row">
                <div className="projects-col">
                    <AddTask projectId={projectId} getOneProject={getOneProject}/>
                </div>
                <div className="projects-col">
                {
                    project &&
                    project.tasks.map(task => (
                        <div className="TaskCard card">
                            <h3>{task.title}</h3>
                            <h4>Description: </h4>
                            <p>{task.description}</p>

                            <input 
                                type="submit" 
                                value="Delete Task" 
                                onClick={() => deleteTask(task._id)}
                            />
                        </div>
                    ))
                }
                </div>
            </div>

            <Link to="/projects">
                <button>Back to projects</button>
            </Link>

            <Link to={`/projects/edit/${projectId}`}>
                <button>Edit Project</button>
            </Link>
        </div>
    )
}

export default ProjectDetailPage;