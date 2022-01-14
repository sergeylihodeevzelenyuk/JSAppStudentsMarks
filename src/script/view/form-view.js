import $ from "jquery";
import { HTML_TEMPLATE, CLASS, REG_EX } from "../const";
import "./form-view.css";

class FormView {
  #options;
  #$rootForm;
  #$input;

  constructor(options) {
    this.#options = options;
    this.#$rootForm = this.initView().on("submit", (e) =>
      this.onRootFormSubmit(e)
    );

    this.#$input = this.#$rootForm
      .find("." + CLASS.INPUT_CREATE)
      .on("focus", (e) => this.onInputeFocus(e));
  }

  initView() {
    return $(HTML_TEMPLATE.FORM);
  }

  onInputeFocus() {
    this.clearInputeError();
  }

  onRootFormSubmit(e) {
    e.preventDefault();

    if (this.isInputeValid()) {
      const student = this.getStudentData();

      this.#options.onCreate(student);
    } else {
      this.showInputeError();
    }

    this.resetInput();
  }

  getStudentData() {
    return {
      name: this.getDataFromInput(),
      id: "",
      marks: this.createZerousArray(10),
    };
  }

  createZerousArray(length) {
    return new Array(length).fill(0);
  }

  isInputeValid() {
    const value = this.getDataFromInput();

    return value !== "" && this.isMatchValue(value);
  }

  isMatchValue(value) {
    return REG_EX.NAME_INPUT_VAL.test(value);
  }

  getDataFromInput() {
    return this.#$input.val();
  }

  resetInput() {
    this.#$input.val("");
  }

  clearInputeError() {
    this.#$input.removeClass(CLASS.ERROR);
  }

  showInputeError() {
    this.#$input.addClass(CLASS.ERROR);
  }

  appendTo($el) {
    $el.append(this.#$rootForm);
  }
}

export default FormView;
