import API from "../http";

class TaskService {
  static async getBoards() {
    return API.get("/board");
  }

  static async addBoard(board) {
    return API.post("/board", board);
  }

  static async updateBoard({ boardId, board }) {
    return API.patch(`/board/${boardId}`, board);
  }

  static async deleteBoard(boardId) {
    return API.delete(`/board/${boardId}`);
  }
}

export default TaskService;
