import service from './index';


const projectsService = {
    getAllProjects: () => service.get('/api/projects'),
    deleteProject: (projectId) => service.delete(`/api/projects/${projectId}`),
    createProject: (dataForm) => service.post('/api/projects', dataForm),
    getOneProject: (projectId) => service.get(`/api/projects/${projectId}`)
}

export default projectsService;