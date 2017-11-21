/**
 * Person class. We store personal information and attitudePoints that reflect daily classroom job
 *
 * @constructor
 * @param {string} name - Person name
 * @param {string} surname - Person surname
 * @param {array} attitudeTasks - Person awarded AttitudeTasks array   
 * @param {number} id - Person id default value null whwen created first time
 * @tutorial pointing-criteria
 */

import {formatDate,popupwindow,hashcode,loadTemplate} from './utils.js';
import {context} from './context.js';
import AttitudeTask from './attitudetask.js';
import GradedTask from './gradedtask.js';
import {saveStudents, uploadAvatar} from './dataservice.js';
import {template} from './templator.js';

const privateAddTotalPoints = Symbol('privateAddTotalPoints'); /** To accomplish private method */
const _totalPoints = Symbol('TOTAL_POINTS'); /** To acomplish private property */

class Person {
  constructor(name,surname,attitudeTasks,id=null) {
    this[_totalPoints] = 0;
    this.name = name;
    this.surname = surname;
    if (!id) {
      this.id = hashcode(this.name + this.surname);
    }else {
      this.id = id;
    }
    this.attitudeTasks = attitudeTasks;

    this.attitudeTasks.forEach(function (itemAT) {
      this[_totalPoints] += parseInt(itemAT['task'].points);
    }.bind(this));
  }

  /** Add points to person. we should use it carefully . */
  [privateAddTotalPoints] (points) {
    if (!isNaN(points)) {
      this[_totalPoints] += points;
      context.getTemplateRanking();
    }
  }

  /** Get person id  based on a 10 character hash composed by name+surname */
  getId() {
    return this.id;
  }

  /** Read person _totalPoints. A private property only modicable inside person instance */
  getTotalPoints() {
    return this[_totalPoints];
  }

  /** Add a Attitude task linked to person with its own mark. */
  addAttitudeTask(taskInstance) {
    this.attitudeTasks.push({'task':taskInstance});
    this[privateAddTotalPoints](parseInt(taskInstance.points));
    context.notify('Added ' + taskInstance.description + ' to ' + this.name + ',' + this.surname);
  }
  /** Get students Marks sliced by showNumGradedTasks from context*/
  getStudentMarks() {
    let gtArray = GradedTask.getStudentMarks(this.getId()).reverse();
    return gtArray.slice(0,context.showNumGradedTasks);
  }

  getGTtotalPoints() {
    return GradedTask.getStudentGradedTasksPoints(this.getId());
  }

  /** Renders person edit form */
  getHTMLEdit() {
    let callback = function(responseText) {
      document.getElementById('content').innerHTML = responseText;
      let saveStudent = document.getElementById('newStudent');
      document.getElementById('idFirstName').value = this.name;
      document.getElementById('idSurnames').value = this.surname;
      let avatar = document.getElementById('upload');
      //uploadAvatar(window.btoa(avatar));
      let codeavatar = "";
      avatar.onchange = function (avatar){
        var fileavatar = avatar.target.files;
        let fileReader = new FileReader();
        fileReader.onload = function(evt){
        codeavatar = evt.target.result;
        };
        fileReader.readAsDataURL(fileavatar[0]);
      };


      saveStudent.addEventListener('submit', () => {
        let oldId = this.getId();
        this.name = document.getElementById('idFirstName').value;
        this.surname = document.getElementById('idSurnames').value;
        let student = new Person(this.name,this.surname,this.attitudeTasks,this.id);
        context.students.set(student.getId(),student);
        var iDavatar = JSON.stringify([student.getId(), codeavatar]);
        uploadAvatar(iDavatar);
        saveStudents(JSON.stringify([...context.students]));
      });
    }.bind(this);

    loadTemplate('templates/addStudent.html',callback);
  }
  /** Renders person detail view */
  getHTMLDetail() {
    loadTemplate('templates/detailStudent.html',function(responseText) {
        document.getElementById('content').innerHTML = responseText;
        let TPL_STUDENT = this;
        let scope = {};
        scope.TPL_ATTITUDE_TASKS = this.attitudeTasks.reverse();
        let TPL_GRADED_TASKS = '';
        context.gradedTasks.forEach(function(gtItem) {
          TPL_GRADED_TASKS += '<li class="list-group-item">' + gtItem.getStudentMark(TPL_STUDENT.getId()) + '->' +
                        gtItem.name + '->' + formatDate(new Date(gtItem.datetime)) + '</li>';
        });
        
        let out = template(responseText,scope);
        console.log(out);
        document.getElementById('content').innerHTML = eval('`' + out + '`');
      }.bind(this));
  }
  // getfinalMark(){
  //   return document.getElementById('').value;
  // }

  finalGrade(){
    let answer=((parseInt(this.getTotalPoints()) * localStorage.getItem('Actitdepoints')) / parseInt(context.getfirststudent().getTotalPoints()));
    console.log( '(' + parseInt(this.getTotalPoints()) + '*' +  localStorage.getItem('Actitdepoints') + ')' + '/' + parseInt(context.getfirststudent().getTotalPoints()));
    console.log(( parseInt(this.getTotalPoints()) *  localStorage.getItem('Actitdepoints')) + '/' + parseInt(context.getfirststudent().getTotalPoints()));
    console.log('AttitudeTasks' + answer);
    let gradetasks = (this.getGTtotalPoints() * (100 - localStorage.getItem('aActitdepoints'))) / 100;
    console.log( '(' + this.getGTtotalPoints() +  '*' + (100 - localStorage.getItem('Actitdepoints')) + ')' + '/' + 100 );
    console.log((this.getGTtotalPoints() * (100 - localStorage.getItem('Actitdepoints'))) + '/' + 100 );
    console.log('Gradetasks mark' + gradetasks);

    let points =  parseInt(answer) + parseInt(gradetasks);
    console.log('Student: '+ this.name + ' ' + this.surname);
   console.log(points);
    console.log('Final Marks'+ (points *10) / 10 );
    console.log('---------------------------------------------------------------------------');
    return Math.round((points *10) / 10);
  }
}

export default Person;
