import API from "../config/axios.config";

class TaskService {
  static async getBoards({ params }) {
    return API.get("/board", { params });
  }

  static async addBoard({ body }) {
    return API.post("sdfsdfdsf/board", body);
  }

  static async updateBoard({ boardId, board }) {
    return API.patch(`/board/${boardId}`, board);
  }

  static async removeBoard({ boardId }) {
    return API.delete(`/board/${boardId}`);
  }
}

export default TaskService;
