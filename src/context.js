/**
 * Context class. Devised to control every element involved in the app: students, gradedTasks ...
 *
 * @constructor
 * @tutorial pointing-criteria
 */
import Person from './person.js';
import GradedTask from './gradedtask.js';
import {hashcode,getElementTd} from './utils.js';

class Context {

  constructor() {
    this.students = [
        new Person("Paco", "Vañó", 5),
        new Person("Lucia", "Botella", 10),
        new Person("German", "Ojeda", 3),
        new Person("Salva", "Peris", 1),
        new Person("Oscar", "Carrion", 40)
    ]; 
    
  }
  adTask(){
    var addTask = document.getElementById("addGradedTask");
    addTask.addEventListener("click", () => {
          this.addGradedTask();
    });
    this.gradedTasks = [];
  }
  addStudent(){ 
      var addStudents = document.getElementById("addStudents");
      addStudents.addEventListener("click", () => {
          this.addStudents();
      });
  }
  /** Draw Students rank table in descendent order using points as a criteria */
  getRanking(){
        this.students.sort(function(a, b) {
            return (b.points - a.points);
        });
        var studentsEl = document.getElementById("llistat");
   
        while (studentsEl.firstChild) {
            studentsEl.removeChild(studentsEl.firstChild);
        }

        let headerString="<tr><td colspan='3'></td>";
        this.gradedTasks.forEach(function(taskItem){            
            headerString+="<td>"+taskItem.name+"</td>";
        });
        studentsEl.innerHTML= headerString;
        this.students.forEach(function(studentItem) {
            var liEl = studentItem.getHTMLView();
            studentsEl.appendChild(liEl);
        });
    }
    /** Create a form to create a GradedTask that will be added to every student */
   addGradedTask(){        
        let taskName = prompt("Please enter your task name");
        let gtask = new GradedTask(taskName);
        this.gradedTasks.push(gtask);
        this.students.forEach(function(studentItem) {            
            studentItem.addGradedTask(gtask);
        });
        this.getRanking();
        
    }
    addStudents(){
        let studentName = prompt("Enter the student name");
        let adds = new Person(studentName,"Martinez",0);
        this.students.push(adds);
        this.gradedTasks.forEach(function(tasks){
            adds.addGradedTask(tasks);
        });
        this.getRanking();
        
    }
}

export default Context = new Context();