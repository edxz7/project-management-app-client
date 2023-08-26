import service from './index';

const taskService = {
    createTask: (dataForm) => service.post('/api/tasks', dataForm),
    deleteTask: (taskId) => service.delete(`/api/tasks/${taskId}`),

}

export default taskService;