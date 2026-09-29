function getAllStudents() {
  return database;
}

function getStudentByCarnet(carnet) {
  return database.find(student => student.carnet === carnet);
}

function addStudent(newStudent) {
  database.push(newStudent);
}