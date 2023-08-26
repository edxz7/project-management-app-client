import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import projectsService from "../services/projects.service";

const initUpdateForm = {
    title: '',
    description: ''
}
const EditProjectPage = () => {
    const [updateForm, setUpdateForm]  = useState(initUpdateForm)

    const handleUpdateForm = (fieldTitle, value) => {
        setUpdateForm(prevState => ({ ...prevState, [fieldTitle]: value }))
    }

    const { projectId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        projectsService.getOneProject(projectId)
        .then(response => {
            const oneProject = response.data;
            handleUpdateForm('title', oneProject.title);
            handleUpdateForm('description', oneProject.description);
        })
        .catch(error => console.log(error))
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault()
        await projectsService.updateProject(updateForm) 
        // hacemos un redirect de nuestro user a la pagina de la lisat de projectos
        navigate(`/projects/${projectId}`)
    }

    return (
        <div className="EditProjectPage">
            <h3>Edit the Project</h3>

            <form onSubmit={handleSubmit}>
                <label>Title: </label>
                <input
                  type="text"
                  name="title"
                  value={updateForm.title}
                  onChange={(e) => handleUpdateForm('title', e.target.value)}
                />

                <label>Description:</label>
                <textarea
                    type="text"
                    name="description"
                    value={updateForm.description}
                    onChange={(e) => handleUpdateForm('description', e.target.value)}
                    />
                 <input type="submit" value={"Edit Project"}/>   
            </form>
        </div>
    )
}

export default EditProjectPage;