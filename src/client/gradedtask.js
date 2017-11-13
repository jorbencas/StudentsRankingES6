'use strict';

import Task from './task.js';
import {loadTemplate,hashcode} from './utils.js';
import {context} from './context.js';

/**
 * GradedTask class. Create a graded task in order to be evaluated 
 * for every student engaged. Theory tests and procedure practices 
 * are part of this category.
 * @constructor
 * @param {string} name - task name
 * @param {string} description - task description
 * @param {number} weight - task weight %
 * @param {number} id - task id default null when created for first time
 * @tutorial pointing-criteria
 */

const STUDENT_MARKS = Symbol('STUDENT_MARKS'); /** To acomplish private property */

class GradedTask extends Task {
  constructor(name,description,weight,studentsMark,id=null) {
    super(name,description,id);
    this.weight = weight;
    this.studentsMark = studentsMark;
    this[STUDENT_MARKS] = new Map(studentsMark); //We need a private map to make it easier to access student marks using its id. The problem is that a Map inside other map can be converted to a pair array
  }

  /** Add student mark using his/her person ID   */
  addStudentMark(idStudent,markPoints) {
    this[STUDENT_MARKS].set(parseInt(idStudent),markPoints);
    this.studentsMark = [...this[STUDENT_MARKS].entries()];
    localStorage.setItem('gradedTasks',JSON.stringify([...context.gradedTasks])); //Use of spread operator to convert a Map to an array of pairs 
  }

  /** Static method to get list marks associated with one student */
  static getStudentMarks(idStudent) {
    let marks = [];
    context.gradedTasks.forEach(function(valueGT,keyGT,gradedTasks_) {
      marks.push([valueGT.getId(),valueGT[STUDENT_MARKS].get(idStudent)]);
     });
    return marks;
  }

  /** Get student mark by their person ID */
  getStudentMark(idStudent) {
    return this[STUDENT_MARKS].get(idStudent);
  }

  getHTMLEdit() {
    let callback = function(responseText) {

      document.getElementById('content').innerHTML = responseText;
      let saveGradedTask = document.getElementById('newGradedTask');
      document.getElementById('idTaskName').value = this.name;
      document.getElementById('idTaskDescription').value = this.description;
      document.getElementById('idTaskWeight').value = this.weight;

     let POINTSTASK = parseInt(100 - GradedTask.totalweight());
     let totalpoint = parseInt(POINTSTASK) + parseInt(this.weight);
     document.getElementById('tp').innerHTML = 'Task Weight (0-'+totalpoint+' %):';
       document.getElementById('idTaskWeight').setAttribute('max',totalpoint);
      saveGradedTask.addEventListener('submit', () => {
        let oldId = this.getId();
        this.name = document.getElementById('idTaskName').value;
        this.description = document.getElementById('idTaskDescription').value;
        this.weight = document.getElementById('idTaskWeight').value;
        let gradedTask = new GradedTask(this.name,this.description,this.weight,this.studentsMark,this.id);
        context.gradedTasks.set(this.id,gradedTask);
        localStorage.setItem('gradedTasks',JSON.stringify([...context.gradedTasks])); //Use of spread operator to convert a Map to an array of pairs 
      });
    }.bind(this);

    loadTemplate('templates/addGradedTask.html',callback);
  }

  static calculatexpgradetask(idStudent){

    let marks = 0;
    context.gradedTasks.forEach(function(valueGT,keyGT,gradedTasks_) {
      marks += valueGT[STUDENT_MARKS].get(idStudent) * valueGT.weight  / 100;
     });
    return marks;
  }


  static totalweight(){
        let marks = 0;
        context.gradedTasks.forEach(function(valueGT,keyGT,gradedTasks_) {
          marks +=  parseInt(valueGT.weight);
         });
         console.log(marks);
        return marks;
      }
}

export default GradedTask;
