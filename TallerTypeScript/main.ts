import { Course } from './course.js';
import {Estudiante} from './estudiante.js';

import { dataCourses } from './dataCourses.js';
import { dataEstudiante } from './dataEstudiante.js';

let coursesTbody: HTMLElement = document.getElementById('courses')!;
let estudiantesTbody: HTMLElement = document.getElementById('estudiantes')!;
const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box")!;
const totalCreditElm: HTMLElement = document.getElementById("total-credits")!;

btnfilterByName.onclick = () => applyFilterByName();


renderCoursesInTable(dataCourses);
renderEstudiantesInTable(dataEstudiante)

totalCreditElm.innerHTML = `${getTotalCredits(dataCourses)}`


function renderCoursesInTable(courses: Course[]): void {
  console.log('Desplegando cursos');
  courses.forEach((course) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${course.name}</td>
                           <td>${course.professor}</td>
                           <td>${course.credits}</td>`;
    coursesTbody.appendChild(trElement);
  });
}

function renderEstudiantesInTable(estudiantes: Estudiante[]): void {
    console.log('Desplegando info de estudiante');
    estudiantes.forEach((estudiante) => {
      let trElement = document.createElement("tr");
      trElement.innerHTML = `<td>${estudiante.name}</td>
                             <td>${estudiante.value}</td>`;
      estudiantesTbody.appendChild(trElement);
    });
  }
 

 

function applyFilterByName() { 
  let text = inputSearchBox.value;
  text = (text == null) ? '' : text;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
  renderCoursesInTable(coursesFiltered);
}

function searchCourseByName(nameKey: string, courses: Course[]) {
  return nameKey === '' ? dataCourses : courses.filter( c => 
    c.name.match(nameKey));
}


function getTotalCredits(courses: Course[]): number {
  let totalCredits: number = 0;
  courses.forEach((course) => totalCredits = totalCredits + course.credits);
  return totalCredits;
}

function clearCoursesInTable() {
  while (coursesTbody.hasChildNodes()) {
    if (coursesTbody.firstChild != null) {
      coursesTbody.removeChild(coursesTbody.firstChild);
     
    }
  }
}