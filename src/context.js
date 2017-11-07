/**
 * Context class. Devised to control every element involved in the app: students, gradedTasks ...
 *
 * @constructor
 * @tutorial pointing-criteria
 */

/*jshint -W061 */

import Person from './person.js';
import GradedTask from './gradedtask.js';
import {hashcode,getElementTd,deleteContent,loadTemplate} from './utils.js';

class Context {
  
    constructor() {
      this.students = new Map();
      this.gradedTasks = [];
      this.showNumGradedTasks = 1;
  
      if (localStorage.getItem('students')) {//save the student in localstorage
        let students_ = new Map(JSON.parse(localStorage.getItem('students')));
        
        for (var [key, value] of students_) {
        
         var value = JSON.stringify(value);
         var value = JSON.parse(value);
        
         let p = new Person(value.name,value.surname, value.attitudeTasks,value.gradedTasks);
         this.students.set(key, p);
        
        }

      }
      if (localStorage.getItem('gradedTasks')) {
        this.gradedTasks = JSON.parse(localStorage.getItem('gradedTasks'));
      }
    }
  
    /** Draw Students rank table in descendent order using points as a criteria */
    getTemplateRanking() {
      if (this.students && this.students.size > 0) {
       
        var stud = new Map([...this.students.entries()].sort((a,b) => a[1].getTotalPoints() < b[1].getTotalPoints()));
       
        localStorage.setItem('students',JSON.stringify([...stud]));
  
        let GRADED_TASKS = '';
        this.gradedTasks.forEach(function(taskItem) {
          GRADED_TASKS += '<td>' + taskItem.name + '</td>';
        });
  
        loadTemplate('templates/rankingList.html',function(responseText) {
                document.getElementById('content').innerHTML = eval('`' + responseText + '`');
                let tableBody = document.getElementById('idTableRankingBody');
                stud.forEach(function(studentItem) {
                 // console.log(studentItem);
                  let liEl = studentItem.getHTMLView();
                  tableBody.appendChild(liEl);
                });
              }.bind(this));
      }else{
        alert('Please creat some student please');
        // loadTemplate('templates/rankingList.html',function() {
        //   let content = document.getElementById('content');
        //    let err = document.createElement('p');
        //     let text = document.createTextNode('Please creat some student please');
        //     err.appendChild(text);
        //     content.appendChild(err);
        // }.bind(this));
      }//end else 
    }
  
    /** Create a form to create a GradedTask that will be added to every student */
    addGradedTask() {
  
      let callback = function(responseText) {
              let saveGradedTask = document.getElementById('newGradedTask');
  
              saveGradedTask.addEventListener('submit', () => {
                let name = document.getElementById('idTaskName').value;
                let description = document.getElementById('idTaskDescription').value;
                let weight = document.getElementById('idTaskWeight').value;
                let gtask = new GradedTask(name,description,weight);
                this.gradedTasks.push(gtask);
                localStorage.setItem('gradedTasks',JSON.stringify(this.gradedTasks));
                this.students.forEach(function(studentItem) {
                  studentItem.addGradedTask(gtask);
                });
                this.getTemplateRanking();
              });
            }.bind(this);
  
      loadTemplate('templates/addGradedTask.html',callback);
    }
    /** Add a new person to the context app */
    addPerson() {
  
      let callback = function(responseText) {
              let saveStudent = document.getElementById('newStudent');

              saveStudent.addEventListener('submit', () => {
                let name = document.getElementById('idFirstName').value;
                let surnames = document.getElementById('idSurnames').value;
                let student = new Person(name,surnames,[],[]);
                this.gradedTasks.forEach(function(iGradedTask) {
                      student.addGradedTask(new GradedTask(iGradedTask.name));
                    });

                this.students.set(hashcode(student.name + student.surname), student);
              
                localStorage.setItem('students',JSON.stringify([...this.students]));
              });
            }.bind(this);
  
      loadTemplate('templates/addStudent.html',callback);
    }
    /** Add last action performed to lower information layer in main app */
  
    notify(text) {
      document.getElementById('notify').innerHTML = text;
    }

    //delete one student
  deletestudent(hash){
    for (var [key, value]  of this.students) {
    let hesh = parseInt(hash);
       if (key === hesh) {//copare the hash in localstorega with get hash
       if (confirm('Are you sure to delete student ' + value.name + ' ' + value.surname + ' ? ')) {
        this.students.delete(key);
       }
     }
    }
    this.getTemplateRanking();
  }
/**update one student/ */
  updatestudent(hash){
    for (var [key, value]  of this.students) {
      let hesh = parseInt(hash);
     if (key === hesh) {
      let that = key;
      let thatval = value;
     let callback = function (responseText){ 
           document.getElementById('idFirstName').value = thatval.name;//insert real values in form 
           document.getElementById('idSurnames').value = thatval.surname;//insert real  values in form 
         let saveStudent = document.getElementById('newStudent');
          saveStudent.addEventListener('submit', () => {
            context.students.delete(that);//deete the student
           let name = document.getElementById('idFirstName').value;
           let surnames = document.getElementById('idSurnames').value;
           let student =  new Person(name,surnames,[],[]);
           context.gradedTasks.forEach(function(iGradedTask) {
            student.addGradedTask(new GradedTask(iGradedTask.name));
          });
           context.students.set(hashcode(student.name + student.surname), student);   
           localStorage.setItem('students',JSON.stringify([...context.students]));
         });
      }.bind(this.that);
      loadTemplate('templates/updateStudent.html',callback);
     }
    }
  }

}
  
  export let context = new Context(); //Singleton export