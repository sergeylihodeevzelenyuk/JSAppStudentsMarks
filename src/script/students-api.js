import { STUDENTS_API_URL } from "./const";

class StudentsAPI {
  static HEADERS = {
    Accept: "application/json",
    "Content-type": "application/json; charset=UTF-8",
  };

  static getList() {
    return fetch(`${STUDENTS_API_URL}`).then((res) => {
      if (res.ok) {
        return res.json();
      }

      throw new Error(`${res.status}: Can't get students list from server`);
    });
  }

  static getStudent(id) {
    return fetch(`${STUDENTS_API_URL}/${id}`).then((res) => {
      if (res.ok) {
        return res.json();
      }

      throw new Error(`${res.status}: Can't get student data from server`);
    });
  }

  static delete(id) {
    return fetch(`${STUDENTS_API_URL}/${id}`, {
      method: "DELETE",
      headers: this.HEADERS,
    }).then((res) => {
      if (!res.ok || res.status == 204) {
        throw new Error(`${res.status}: Can't delete student data from server`);
      }
    });
  }

  static create(student) {
    return fetch(STUDENTS_API_URL, {
      method: "POST",
      headers: this.HEADERS,
      body: JSON.stringify(student),
    }).then((res) => {
      if (!res.ok || res.status !== 201) {
        throw new Error(`${res.status}: Can't create new student on server`);
      }
      return res.json();
    });
  }

  static update(id, student) {
    return fetch(`${STUDENTS_API_URL}/${id}`, {
      method: "PUT",
      headers: this.HEADERS,
      body: JSON.stringify(student),
    }).then((res) => {
      if (!res.ok || res.status !== 200) {
        throw new Error(`${res.status}: Can't update student data on server`);
      }
    });
  }
}

export default StudentsAPI;
