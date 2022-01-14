export const STUDENTS_API_URL =
  "https://5dd3d5ba8b5e080014dc4bfa.mockapi.io/students";

export const REG_EX = {
  NAME_INPUT_VAL: /^[a-zA-Z\s]+$/,
  MARK_INPUT_VAL: /[^\d]/g,
};

export const ID = {
  APP: "app",
  STUDENT_LIST: "student_list",
};

export const CLASS = {
  STUDENTS_TABLE: "table",
  STUDENT: "student",
  BTN_DELETE: "btn_delete",
  BTN_CREATE: "btn_create",
  STUDENT_CREATE: "student_create",
  INPUT_CREATE: "input_create",
  ERROR: "error",
  INPUT_MARK: "input_mark",
};

export const HTML_TEMPLATE = {
  STUDENTS_LIST: `
  <table class=${CLASS.STUDENTS_TABLE}>
    <thead>
      <th>Name</th>
      <th colspan="10">Marks</th>
      <th>Actions</th>
    </thead>
    <tbody id=${ID.STUDENT_LIST}></tbody>  
  </table>
  `,

  STUDENT: `
  <tr class=${CLASS.STUDENT} data-id={{student-id}}>
    <td>
      {{name}}
    </td>
    {{marks}}
    <td>
      <button class=${CLASS.BTN_DELETE}>DELETE</button>
    </td>  
  </tr>  
  `,

  STUDENT_MARK: `
  <td>
    <textarea class=${CLASS.INPUT_MARK}>{{mark}}</textarea>
  </td>
  `,

  FORM: `
  <form class=${CLASS.STUDENT_CREATE}>
    <input class=${CLASS.INPUT_CREATE}>
    <button class=${CLASS.BTN_CREATE}>CREATE</button> 
  </form>  
  `,
};
