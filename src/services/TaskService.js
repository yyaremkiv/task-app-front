import API from "../config/axios.config";

class TaskService {
  static async getBoards() {
    return API.get("/board");
  }

  static async addBoard({ title, cards }) {
    return API.post("/board", { title, cards });
  }

  static async updateBoard({ boardId, board }) {
    return API.patch(`/board/${boardId}`, board);
  }

  static async removeBoard({ boardId }) {
    return API.delete(`/board/${boardId}`);
  }
}

export default TaskService;
