import $ from "jquery";
import { HTML_TEMPLATE, CLASS, ID, REG_EX } from "../const";
import "./list-view.css";

class ListWiew {
  #options;
  #$root;

  constructor(options) {
    this.#options = options;
    this.#$root = this.initView();

    this.$studentsList = this.#$root
      .find("#" + ID.STUDENT_LIST)
      .on("click", "." + CLASS.BTN_DELETE, (e) => this.onBtnDeleteClick(e))
      .on("keyup", "." + CLASS.INPUT_MARK, (e) => this.onInputeMarkKeyUp(e))
      .on("focus", "." + CLASS.INPUT_MARK, (e) => this.onInputeMarkFocus(e))
      .on("focusout", "." + CLASS.INPUT_MARK, (e) =>
        this.onInputMarkFocuseOut(e)
      );
  }

  initView() {
    return $(HTML_TEMPLATE.STUDENTS_LIST);
  }

  onBtnDeleteClick(e) {
    const id = this.getStudentId(e.target);

    this.deleteStudentOnUi(id);
    this.#options.onDelete(id);
  }

  onInputeMarkKeyUp(e) {
    const input = $(e.target);
    const correctedVal = input.val().replace(REG_EX.MARK_INPUT_VAL, "");

    input.val(correctedVal);
  }

  onInputeMarkFocus(e) {
    const input = $(e.target);

    this.clearInputeError(input);
  }

  onInputMarkFocuseOut(e) {
    const input = $(e.target);
    const id = this.getStudentId(e.target);

    if (this.isInputeValid(input)) {
      const marks = this.getStudentMarks(e.target);

      this.#options.onMarkEdit(id, marks);
    } else {
      this.showInputeError(input);
      this.#options.onFailedEditMark(id);
    }
  }

  showInitialMarksUi(studentData) {
    const studentEl = this.$studentsList.find(
      `[data-id="${studentData.id}"]`
    )[0];

    const inputs = this.getStudentInputsArr(studentEl);

    for (let i = 0; i < inputs.length; i++) {
      $(inputs[i]).val(studentData.marks[i]);
    }
  }

  isInputeValid(input) {
    return input.val() !== "";
  }

  getStudentMarks(target) {
    const studentEl = target.closest("." + CLASS.STUDENT);
    const inputs = this.getStudentInputsArr(studentEl);

    return Array.from(inputs).map((input) => input.value);
  }

  getStudentInputsArr(studentEl) {
    return studentEl.querySelectorAll("." + CLASS.INPUT_MARK);
  }

  createStudentOnUi(student) {
    const $student = this.generateStudentHtml(student);

    this.$studentsList.append($student);
  }

  updateStudentDataId(studentData) {
    const studentEl = this.$studentsList.find(`[data-id=""]`)[0];

    studentEl.setAttribute("data-id", studentData.id);
  }

  getStudentId(target) {
    return $(target)
      .closest("." + CLASS.STUDENT)
      .data("id");
  }

  deleteStudentOnUi(id) {
    this.$studentsList.find(`[data-id=${id}]`)[0].remove();
  }

  appendTo($el) {
    $el.append(this.#$root);
  }

  renderStudentsList(list) {
    const html = list
      .map((student) => this.generateStudentHtml(student))
      .join("");

    this.$studentsList.html(html);
  }

  generateStudentHtml(student) {
    return `${HTML_TEMPLATE.STUDENT.replace("{{name}}", student.name)
      .replace("{{student-id}}", student.id)
      .replace("{{marks}}", this.renderMarks(student.marks))}`;
  }

  renderMarks(marks) {
    return marks.map((mark) => this.generateMarkHtml(mark)).join("");
  }

  generateMarkHtml(mark) {
    return `${HTML_TEMPLATE.STUDENT_MARK.replace("{{mark}}", mark)}`;
  }

  showServerError(error) {
    alert(error);
  }

  clearInputeError(input) {
    input.removeClass(CLASS.ERROR);
  }

  showInputeError(input) {
    input.addClass(CLASS.ERROR);
  }
}

export default ListWiew;
