/**
 * Person class. We store personal information and attitudePoints that reflect daily classroom job
 *
 * @constructor
 * @param {string} name - Person name
 * @param {string} surname - Person surname
 * @param {array} attitudeTasks - Person awarded AttitudeTasks array   
 * @param {array} gradedTasks - Person gradedTasks array
 * @tutorial pointing-criteria
 */

import { formatDate, popupwindow, hashcode, getElementTd, loadTemplate } from './utils.js';
import { context } from './context.js';
import AttitudeTask from './attitudetask.js';

const privateAddTotalPoints = Symbol('privateAddTotalPoints'); /** To accomplish private method */
const _totalPoints = Symbol('TOTAL_POINTS'); /** To acomplish private property */

class Person {
  constructor(name, surname, attitudeTasks, gradedTasks) {
    this[_totalPoints] = 0;
    this.name = name;
    this.surname = surname;

    this.attitudeTasks = attitudeTasks;
    this.gradedTasks = gradedTasks;

    this.attitudeTasks.forEach(function (itemAT) {
      this[_totalPoints] += parseInt(itemAT['task'].points);
    }.bind(this));
    this.gradedTasks.forEach(function (itemGT) {
      this[_totalPoints] += parseInt(itemGT.points);
    }.bind(this));
  }

  /** Add points to persons we should carefully use it. */
  [privateAddTotalPoints](points) {
    if (!isNaN(points)) {
      this[_totalPoints] += points;
      context.getTemplateRanking();
    }
  }

  /** Read person _totalPoints. A private property only modicable inside person instance */
  getTotalPoints() {
    return this[_totalPoints];
  }

  /** Add a gradded task linked to person with its own mark. */
  addGradedTask(taskInstance) {
    this.gradedTasks.push({ 'task': taskInstance, 'points': 0 });
  }

  /** Add a Attitude task linked to person with its own mark. */
  addAttitudeTask(taskInstance) {
    this.attitudeTasks.push({ 'task': taskInstance });
    this[privateAddTotalPoints](parseInt(taskInstance.points));
    context.notify('Added ' + taskInstance.description + ' to ' + this.name + ',' + this.surname);
  }
  gethash(){//creat a new hash
    let id = hashcode(this.name + this.surname);
    return id;
  }

  /** Renders HTML person view Create a table row (tr) with
   *  all name, attitudePoints , add button and one input for 
   * every gradded task binded for that person. */
  getHTMLView() {
    let liEl = document.createElement('tr');

    //creating update button
    let btu = document.createElement('a');
    let btun = document.createTextNode('Update');
    btu.setAttribute("id", "us");
    btu.setAttribute('href', '#updateStudent/' + this.gethash());
    btu.appendChild(btun);
    let us = document.getElementById('us');
    liEl.appendChild(getElementTd(btu));

    //creating delete button
    let btd = document.createElement('a');
    let btdn = document.createTextNode('Delete');
    btd.setAttribute('id', 'ds');
    btd.setAttribute('href', '#deleteStudent/' + this.gethash());
    btd.appendChild(btdn);
    let ds = document.getElementById('ds');
    liEl.appendChild(getElementTd(btd));

    //getting name and subname and creating their elements
    let s = getElementTd(this.surname);
    let n = getElementTd(this.name);
    
    let a = document.createElement('a');
    let b = document.createElement('a');
     a.setAttribute('href','#detailStudent/' + this.gethash());
     b.setAttribute('href','#detailStudent/' + this.gethash());
    a.appendChild(s);
    b.appendChild(n);
    liEl.appendChild(getElementTd(a));
    liEl.appendChild(getElementTd(b));

    liEl.appendChild(getElementTd(this[_totalPoints]));

    let addAttitudeTaskEl = document.createElement('a');
    let tb = document.createTextNode('+XP');
    addAttitudeTaskEl.setAttribute('id', 'xp');
    addAttitudeTaskEl.setAttribute('href', '#xp/' + this.gethash() );
    addAttitudeTaskEl.appendChild(tb);
    liEl.appendChild(getElementTd(addAttitudeTaskEl));

    let that = this;

    addAttitudeTaskEl.addEventListener('click', function(){
      that.getask();
    });

    this.gradedTasks.forEach(function (gTaskItem) {
      let inputEl = document.createElement('input');
      inputEl.type = 'number';
      inputEl.min = 0;
      inputEl.max = 100;
      inputEl.value = gTaskItem['points'];
      inputEl.addEventListener('change', function (event) {
        that[privateAddTotalPoints](parseInt(gTaskItem['points'] * (-1)));
        gTaskItem['points'] = inputEl.value;
        that[privateAddTotalPoints](parseInt(gTaskItem['points']));
      });
      liEl.appendChild(getElementTd(inputEl));
    });

    return liEl;
  }

  //this function take the student details
  getdetails(){
    loadTemplate('templates/detailStudent.html', function (responseText) {
      let STUDENT = this;
      let ATTITUDE_TASKS = '';
      this.attitudeTasks.reverse().forEach(function (atItem) {
        ATTITUDE_TASKS += '<li>' + atItem.task.points + '->' +
          atItem.task.description + '->' + formatDate(new Date(atItem.task.datetime)) + '</li>';
      });
      let GRADED_TASKS = '';
      this.gradedTasks.forEach(function (gtItem) {
        GRADED_TASKS += '<li>' + gtItem.points + '->' +
          gtItem.task.name + '->' + formatDate(new Date(gtItem.task.datetime)) + '</li>';
      });
      document.getElementById('content').innerHTML = eval('`' + responseText + '`');
    }.bind(this));
  }

  //this function creating a popUp and managment the AttitudeTasks
  getask(){
    let person = context.students.get(this.gethash());
    
    let popUp = popupwindow('templates/listAttitudeTasks.html', 'XP points to ' + person.name, 300, 400);
    console.log(popUp);
     popUp.onload = function () {
       popUp.document.title = person.name + ' ' +
         person.surname + ' XP points';
       let xpButtons = popUp.document.getElementsByClassName('xp');
       Array.prototype.forEach.call(xpButtons, function (xpBItem) { 
        xpBItem.addEventListener('click', () => {
           popUp.close();
           person.addAttitudeTask(new AttitudeTask('XP task',
             xpBItem.innerHTML, xpBItem.value));
         });
       });
     }; 
     return person;
  }
}

export default Person;