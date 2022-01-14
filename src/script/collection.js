import StudentsAPI from "./students-api";

class Collection {
  #studentsList = [];

  async fetch() {
    const list = await StudentsAPI.getList();
    this.setList(list);

    return Promise.resolve(this.getList());
  }

  delete(id) {
    return StudentsAPI.delete(id);
  }

  create(student) {
    return StudentsAPI.create(student);
  }

  edit(id, marks) {
    return StudentsAPI.update(id, { marks });
  }

  getStudent(id) {
    return StudentsAPI.getStudent(id);
  }

  getList() {
    return this.#studentsList;
  }

  setList(list) {
    return (this.#studentsList = list);
  }
}

export default Collection;
