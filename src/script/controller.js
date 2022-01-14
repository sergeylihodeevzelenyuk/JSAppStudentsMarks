import $ from "jquery";
import Collection from "./collection";
import ListWiew from "./view/list-view";
import FormView from "./view/form-view";

class Controller {
  #$container;

  constructor($container) {
    this.#$container = $container;
    this.studentsCollection = new Collection();

    this.listWiew = new ListWiew({
      onDelete: (id) => {
        this.deleteStudent(id);
      },
      onMarkEdit: (id, marks) => {
        this.editStudentsMark(id, marks);
      },
      onFailedEditMark: (id) => {
        this.backToInitialMarks(id);
      },
    });

    this.formView = new FormView({
      onCreate: (student) => {
        this.createStudent(student);
      },
    });

    this.listWiew.appendTo(this.#$container);
    this.formView.appendTo(this.#$container);

    this.studentsCollection
      .fetch()
      .then((list) => {
        this.listWiew.renderStudentsList(list);
      })
      .catch(this.listWiew.showServerError);
  }

  backToInitialMarks(id) {
    this.studentsCollection
      .getStudent(id)
      .then((student) => this.listWiew.showInitialMarksUi(student))
      .catch(this.listWiew.showServerError);
  }

  deleteStudent(id) {
    this.studentsCollection.delete(id).catch(this.listWiew.showServerError);
  }

  createStudent(student) {
    this.listWiew.createStudentOnUi(student);
    this.studentsCollection
      .create(student)
      .then((studentData) => this.listWiew.updateStudentDataId(studentData))
      .catch(this.listWiew.showServerError);
  }

  editStudentsMark(id, marks) {
    this.studentsCollection
      .edit(id, marks)
      .catch(this.listWiew.showServerError);
  }
}

export default Controller;
