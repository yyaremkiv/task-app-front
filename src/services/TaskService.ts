import API from "../config/axios.config";

interface IGetBoards {
  params: Record<string, any>;
}

interface IAddBoard {
  body: Record<string, any>;
}

interface IUpdateBoard {
  boardId: string;
  board: any;
}

interface IRemoveBoard {
  boardId: string;
}

class TaskService {
  static async getBoards({ params }: IGetBoards): Promise<any> {
    return API.get("/board", { params });
  }

  static async addBoard({ body }: IAddBoard): Promise<any> {
    return API.post("/board", body);
  }

  static async updateBoard({ boardId, board }: IUpdateBoard): Promise<any> {
    return API.patch(`/board/${boardId}`, board);
  }

  static async removeBoard({ boardId }: IRemoveBoard): Promise<any> {
    return API.delete(`/board/${boardId}`);
  }
}

export default TaskService;
