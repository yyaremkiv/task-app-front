class BoardCreate {
  constructor({ title, labels, color }) {
    this.title = title;
    this.labels = labels;
    this.cards = [];
    this.color = color;
  }
}

export default BoardCreate;
