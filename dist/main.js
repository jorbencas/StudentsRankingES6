(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _task = require('./task.js');

var _task2 = _interopRequireDefault(_task);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * AttitudeTask class. Create a attitude task in order to be
 * assigned to an individual or group of students. This could be for
 * example , participative attitude at class. Point a good 
 * question in class. Be the first finishing some exercise ...
 * 
 * @constructor
 * @param {string} name - task name
 * @param {string} description - task description
 * @param {string} points - task points associated to that behaviour
 * @tutorial pointing-criteria
 */

var AttitudeTask = function (_Task) {
  _inherits(AttitudeTask, _Task);

  function AttitudeTask(name, description, points) {
    _classCallCheck(this, AttitudeTask);

    var _this = _possibleConstructorReturn(this, (AttitudeTask.__proto__ || Object.getPrototypeOf(AttitudeTask)).call(this, name, description));

    _this.points = points;
    return _this;
  }

  return AttitudeTask;
}(_task2.default);

exports.default = AttitudeTask;

},{"./task.js":8}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.context = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Context class. Devised to control every element involved in the app: students, gradedTasks ...
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @constructor
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @tutorial pointing-criteria
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

/*jshint -W061 */

var _person = require('./person.js');

var _person2 = _interopRequireDefault(_person);

var _gradedtask = require('./gradedtask.js');

var _gradedtask2 = _interopRequireDefault(_gradedtask);

var _dataservice = require('./dataservice.js');

var _utils = require('./utils.js');

var _menu = require('./menu.js');

var _templator = require('./templator.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Context = function () {
  function Context() {
    _classCallCheck(this, Context);

    this.students = new Map();
    this.gradedTasks = new Map();
    this.showNumGradedTasks = 1; //Max visible graded tasks in ranking list table
    if ((0, _utils.getCookie)('user')) {
      this.user = JSON.parse((0, _utils.getCookie)('user'));
    }
  }

  /** Check if user is logged */


  _createClass(Context, [{
    key: 'isLogged',
    value: function isLogged() {
      (0, _utils.loadTemplate)('api/loggedin', function (response) {
        if (response === '0') {
          //alert('LOGGED IN 0');
          this.user = undefined;
          this.login();
          return false;
        } else {
          //alert('LOGGED IN TRUE');
          this.user = JSON.parse(response);
          (0, _dataservice.updateFromServer)();
          this.getTemplateRanking();
          return true;
        }
      }.bind(this), 'GET', '', false);
    }

    /** Show login form template when not authenticated */

  }, {
    key: 'login',
    value: function login() {
      var that = this;
      if (!this.user) {
        (0, _utils.loadTemplate)('templates/login.html', function (responseText) {
          that.hideMenu();
          document.getElementById('content').innerHTML = eval('`' + responseText + '`');
          var loginForm = document.getElementById('loginForm');

          loginForm.addEventListener('submit', function (event) {
            event.preventDefault();
            var username = document.getElementsByName('username')[0].value;
            var password = document.getElementsByName('password')[0].value;
            (0, _utils.loadTemplate)('api/login', function (userData) {
              that.user = JSON.parse(userData);
              (0, _utils.setCookie)('user', userData, 7);
              (0, _dataservice.updateFromServer)();
              that.getTemplateRanking();
            }, 'POST', 'username=' + username + '&password=' + password, false);
            return false; //Avoid form submit
          });
        });
      } else {
        (0, _menu.generateMenu)();
        that.getTemplateRanking();
      }
    }
  }, {
    key: 'showMenu',
    value: function showMenu() {
      document.getElementById('navbarNav').style.visibility = 'visible';
    }
  }, {
    key: 'hideMenu',
    value: function hideMenu() {
      document.getElementById('navbarNav').style.visibility = 'hidden';
    }

    /** Get a Person instance by its ID */

  }, {
    key: 'getPersonById',
    value: function getPersonById(idHash) {
      return this.students.get(parseInt(idHash));
    }
    /** Get a GradedTask instance by its ID */

  }, {
    key: 'getGradedTaskById',
    value: function getGradedTaskById(idHash) {
      return this.gradedTasks.get(parseInt(idHash));
    }
    /** Draw Students ranking table in descendent order using total points as a criteria */

  }, {
    key: 'getTemplateRanking',
    value: function getTemplateRanking() {
      (0, _menu.generateMenu)();
      this.showMenu();

      if (this.students && this.students.size > 0) {
        //alert('SI STUDENTS');
        /* We sort students descending from max number of points to min */
        var arrayFromMap = [].concat(_toConsumableArray(this.students.entries()));
        arrayFromMap.sort(function (a, b) {
          return b[1].finalGrade() - a[1].finalGrade();
        });
        this.students = new Map(arrayFromMap);

        (0, _dataservice.saveStudents)(JSON.stringify([].concat(_toConsumableArray(this.students))));
        var TPL_GRADED_TASKS = '';

        if (this.gradedTasks && this.gradedTasks.size > 0) {
          if (this.showNumGradedTasks >= this.gradedTasks.size) {
            this.showNumGradedTasks = this.gradedTasks.size;
          }
          var arrayGradedTasks = [].concat(_toConsumableArray(this.gradedTasks.entries())).reverse();
          for (var i = 0; i < this.showNumGradedTasks; i++) {
            if (i === this.showNumGradedTasks - 1) {
              TPL_GRADED_TASKS += '<th><a href="#detailGradedTask/' + arrayGradedTasks[i][0] + '">' + arrayGradedTasks[i][1].name + '(' + arrayGradedTasks[i][1].weight + '%)&nbsp;</a><a href="#MoreGradedTasks"><button id="more_gt"><h4>+</h4></button></a></th>';
            } else {
              TPL_GRADED_TASKS += '<th><a href="#detailGradedTask/' + arrayGradedTasks[i][0] + '">' + arrayGradedTasks[i][1].name + '(' + arrayGradedTasks[i][1].weight + '%)</a></th>';
            }
          }
        }
        var scope = {};
        scope.TPL_GRADED_TASKS = TPL_GRADED_TASKS;
        scope.TPL_PERSONS = arrayFromMap;

        (0, _utils.loadTemplate)('templates/rankingList.html', function (responseText) {
          var out = (0, _templator.template)(responseText, scope);
          //console.log(out);
          document.getElementById('content').innerHTML = eval('`' + out + '`');
          var that = this;
          var callback = function callback() {
            var gtInputs = document.getElementsByClassName('gradedTaskInput');
            Array.prototype.forEach.call(gtInputs, function (gtInputItem) {
              gtInputItem.addEventListener('change', function () {
                var idPerson = gtInputItem.getAttribute('idStudent');
                var idGradedTask = gtInputItem.getAttribute('idGradedTask');
                var gt = that.gradedTasks.get(parseInt(idGradedTask));
                gt.addStudentMark(idPerson, gtInputItem.value);
                that.getTemplateRanking();
              });
            });
          };
          callback();
        }.bind(this));
      } else {
        //alert('NO STUDENTS');
        document.getElementById('content').innerHTML = '';
      }
    }

    /** Create a form to create a GradedTask that will be added to every student */

  }, {
    key: 'addGradedTask',
    value: function addGradedTask() {

      var callback = function (responseText) {
        var _this = this;

        document.getElementById('content').innerHTML = responseText;
        var saveGradedTask = document.getElementById('newGradedTask');
        var totalGTweight = _gradedtask2.default.getGradedTasksTotalWeight();
        document.getElementById('labelWeight').innerHTML = 'Task Weight (0-' + (100 - totalGTweight) + '%)';
        var weightIput = document.getElementById('idTaskWeight');
        weightIput.setAttribute('max', 100 - totalGTweight);

        saveGradedTask.addEventListener('submit', function () {
          var name = document.getElementById('idTaskName').value;
          var description = document.getElementById('idTaskDescription').value;
          var weight = document.getElementById('idTaskWeight').value;
          var gtask = new _gradedtask2.default(name, description, weight, []);
          var gtaskId = gtask.getId();
          _this.students.forEach(function (studentItem, studentKey, studentsRef) {
            gtask.addStudentMark(studentKey, 0);
          });
          _this.gradedTasks.set(gtaskId, gtask);
          (0, _dataservice.saveGradedTasks)(JSON.stringify([].concat(_toConsumableArray(_this.gradedTasks))));
          _this.getTemplateRanking();
          return false; //Avoid form submit
        });
      }.bind(this);

      (0, _utils.loadTemplate)('templates/addGradedTask.html', callback);
    }
    /** Add a new person to the context app */

  }, {
    key: 'addPerson',
    value: function addPerson() {

      var callback = function (responseText) {
        var _this2 = this;

        document.getElementById('content').innerHTML = responseText;
        var saveStudent = document.getElementById('newStudent');
        var avatar = document.getElementById('upload');
        //uploadAvatar(window.btoa(avatar));
        var codeavatar = "";
        avatar.onchange = function (avatar) {
          var fileavatar = avatar.target.files;
          var fileReader = new FileReader();
          fileReader.onload = function (evt) {
            codeavatar = evt.target.result;
          };
          fileReader.readAsDataURL(fileavatar[0]);
        };

        saveStudent.addEventListener('submit', function (event) {
          event.preventDefault();
          var name = document.getElementById('idFirstName').value;
          var surnames = document.getElementById('idSurnames').value;
          var student = new _person2.default(name, surnames, []);
          _this2.gradedTasks.forEach(function (iGradedTask) {
            iGradedTask.addStudentMark(student.getId(), 0);
          });
          _this2.students.set(student.getId(), student);

          var iDavatar = JSON.stringify([student.getId(), codeavatar]);
          (0, _dataservice.uploadAvatar)(iDavatar);

          _this2.getTemplateRanking();
          return false; //Avoid form submit
        });
      }.bind(this);

      (0, _utils.loadTemplate)('templates/addStudent.html', callback);
    }
  }, {
    key: 'settings',
    value: function settings() {
      var callback = function callback(responseText) {
        document.getElementById('content').innerHTML = responseText;
        var slider = document.getElementById("myRange");
        var output = document.getElementById("demo");
        var outputg = document.getElementById("DEMO");
        slider.value = localStorage.getItem('Actitdepoints');
        output.innerHTML = slider.value;
        outputg.innerHTML = 100 - parseInt(slider.value);
        slider.oninput = function () {
          output.innerHTML = this.value;
          outputg.innerHTML = 100 - parseInt(this.value);
        };

        var saveSettings = document.getElementById("Settings");
        saveSettings.addEventListener('submit', function () {
          var output = document.getElementById("demo").innerText;
          //var outputg = document.getElementById("DEMO").innerText;
          console.log('ActtitudTasks' + output);
          localStorage.setItem('Actitdepoints', output);
          context.getTemplateRanking();
        });
      };

      (0, _utils.loadTemplate)('templates/settings.html', callback);
    }
  }, {
    key: 'getfirststudent',
    value: function getfirststudent() {
      var arrayFromMap = [].concat(_toConsumableArray(this.students.entries()));
      arrayFromMap.sort(function (a, b) {
        return b[1].getTotalPoints() - a[1].getTotalPoints();
      });
      return arrayFromMap[0][1];
    }
    /** Add last action performed to lower information layer in main app */

  }, {
    key: 'notify',
    value: function notify(text) {
      document.getElementById('notify').innerHTML = text;
    }
  }]);

  return Context;
}();

var context = exports.context = new Context(); //Singleton export

},{"./dataservice.js":3,"./gradedtask.js":4,"./menu.js":6,"./person.js":7,"./templator.js":9,"./utils.js":10}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadAvatar = exports.saveGradedTasks = exports.saveStudents = exports.updateFromServer = undefined;

var _utils = require('./utils.js');

var _context = require('./context.js');

var _person = require('./person.js');

var _person2 = _interopRequireDefault(_person);

var _gradedtask = require('./gradedtask.js');

var _gradedtask2 = _interopRequireDefault(_gradedtask);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Singleton
function updateFromServer() {
  if (_context.context.user.id) {
    (0, _utils.loadTemplate)('api/getStudents', function (response) {
      localStorage.setItem('students', response);
      loadStudentsToLocalStorage();
      _context.context.getTemplateRanking();
    }, 'GET', '', false);
    (0, _utils.loadTemplate)('api/getGradedTasks', function (response) {
      localStorage.setItem('gradedTasks', response);
      loadGradedTasksToLocalStorage();
      _context.context.getTemplateRanking();
    }, 'GET', '', false);
  }
}

function saveStudents(arrayStudents) {
  localStorage.setItem('students', arrayStudents);
  (0, _utils.loadTemplate)('api/saveStudents', function (response) {
    console.log('SAVE STUDENTS ' + response);
  }, 'POST', localStorage.getItem('students'), false);
}

function uploadAvatar(avatar) {
  (0, _utils.loadTemplate)('api/uploadAvatar', function (response) {
    console.log('SAVE AVATAR ' + response);
  }, 'POST', avatar, false);
}

function saveGradedTasks(arrayGT) {
  localStorage.setItem('gradedTasks', arrayGT);
  (0, _utils.loadTemplate)('api/saveGradedTasks', function (response) {
    console.log('SAVE GRADED TASKS ' + response);
  }, 'POST', localStorage.getItem('gradedTasks'), false);
}
function loadStudentsToLocalStorage() {
  if (localStorage.getItem('students')) {
    var students_ = new Map(JSON.parse(localStorage.getItem('students')));
    students_.forEach(function (value_, key_, students_) {
      students_.set(key_, new _person2.default(value_.name, value_.surname, value_.attitudeTasks, value_.id));
    });
    _context.context.students = students_;
  }
}
function loadGradedTasksToLocalStorage() {
  if (localStorage.getItem('gradedTasks')) {
    var gradedTasks_ = new Map(JSON.parse(localStorage.getItem('gradedTasks')));
    gradedTasks_.forEach(function (value_, key_, gradedTasks_) {
      gradedTasks_.set(key_, new _gradedtask2.default(value_.name, value_.description, value_.weight, value_.studentsMark, value_.id));
    });
    _context.context.gradedTasks = gradedTasks_;
  }
}

exports.updateFromServer = updateFromServer;
exports.saveStudents = saveStudents;
exports.saveGradedTasks = saveGradedTasks;
exports.uploadAvatar = uploadAvatar;

},{"./context.js":2,"./gradedtask.js":4,"./person.js":7,"./utils.js":10}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _task = require('./task.js');

var _task2 = _interopRequireDefault(_task);

var _utils = require('./utils.js');

var _dataservice = require('./dataservice.js');

var _context = require('./context.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

var STUDENT_MARKS = Symbol('STUDENT_MARKS'); /** To acomplish private property */

var GradedTask = function (_Task) {
  _inherits(GradedTask, _Task);

  function GradedTask(name, description, weight, studentsMark) {
    var id = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;

    _classCallCheck(this, GradedTask);

    var _this = _possibleConstructorReturn(this, (GradedTask.__proto__ || Object.getPrototypeOf(GradedTask)).call(this, name, description, id));

    _this.weight = weight;
    _this.studentsMark = studentsMark;
    _this[STUDENT_MARKS] = new Map(studentsMark); //We need a private map to make it easier to access student marks using its id. The problem is that a Map inside other map can be converted to a pair array
    return _this;
  }

  /** Add student mark using his/her person ID   */


  _createClass(GradedTask, [{
    key: 'addStudentMark',
    value: function addStudentMark(idStudent, markPoints) {
      this[STUDENT_MARKS].set(parseInt(idStudent), markPoints);
      this.studentsMark = [].concat(_toConsumableArray(this[STUDENT_MARKS].entries()));
      (0, _dataservice.saveGradedTasks)(JSON.stringify([].concat(_toConsumableArray(_context.context.gradedTasks))));
    }

    /** Static method to get list marks associated with one student */

  }, {
    key: 'getStudentMark',


    /** Get student mark by their person ID */
    value: function getStudentMark(idStudent) {
      return this[STUDENT_MARKS].get(idStudent);
    }
  }, {
    key: 'getHTMLEdit',
    value: function getHTMLEdit() {
      var callback = function (responseText) {
        var _this2 = this;

        document.getElementById('content').innerHTML = responseText;
        var saveGradedTask = document.getElementById('newGradedTask');
        document.getElementById('idTaskName').value = this.name;
        document.getElementById('idTaskDescription').value = this.description;
        var totalGTweight = GradedTask.getGradedTasksTotalWeight();
        var weightIput = document.getElementById('idTaskWeight');
        document.getElementById('labelWeight').innerHTML = 'Weight (0-' + (100 - (totalGTweight - this.weight)) + '%)';
        weightIput.value = this.weight;
        weightIput.setAttribute('max', 100 - (totalGTweight - this.weight));

        saveGradedTask.addEventListener('submit', function () {
          var oldId = _this2.getId();
          _this2.name = document.getElementById('idTaskName').value;
          _this2.description = document.getElementById('idTaskDescription').value;
          _this2.weight = document.getElementById('idTaskWeight').value;
          var gradedTask = new GradedTask(_this2.name, _this2.description, _this2.weight, _this2.studentsMark, _this2.id);
          _context.context.gradedTasks.set(_this2.id, gradedTask);
          (0, _dataservice.saveGradedTasks)(JSON.stringify([].concat(_toConsumableArray(_context.context.gradedTasks))));
        });
      }.bind(this);

      (0, _utils.loadTemplate)('templates/addGradedTask.html', callback);
    }
  }], [{
    key: 'getStudentMarks',
    value: function getStudentMarks(idStudent) {
      var marks = [];
      _context.context.gradedTasks.forEach(function (valueGT, keyGT, gradedTasks_) {
        marks.push([valueGT.getId(), valueGT[STUDENT_MARKS].get(idStudent)]);
      });
      return marks;
    }
    /** Calculate total graded points associated to one student */

  }, {
    key: 'getStudentGradedTasksPoints',
    value: function getStudentGradedTasksPoints(idStudent) {
      var points = 0;
      _context.context.gradedTasks.forEach(function (itemTask) {
        points += itemTask[STUDENT_MARKS].get(idStudent) * (itemTask.weight / 100);
      });
      return Math.round(points * 100 / 100);
    }
    /** CAlculate total aggregated GT weight */

  }, {
    key: 'getGradedTasksTotalWeight',
    value: function getGradedTasksTotalWeight() {
      var points = 0;
      _context.context.gradedTasks.forEach(function (itemTask) {
        points += parseInt(itemTask.weight);
      });
      return points;
    }
  }]);

  return GradedTask;
}(_task2.default);

exports.default = GradedTask;

},{"./context.js":2,"./dataservice.js":3,"./task.js":8,"./utils.js":10}],5:[function(require,module,exports){
'use strict';

var _context = require('./context.js');

var _utils = require('./utils.js');

var _menu = require('./menu.js');

var _attitudetask = require('./attitudetask.js');

var _attitudetask2 = _interopRequireDefault(_attitudetask);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Once the page is loaded we get a context app object an generate students rank view. */
window.onload = function () {
  _context.context.isLogged();
};

/** Primitive routing mechanism we hope in future will be brave enought to  implement a ng-repeat feature at least*/
//Singleton
window.onclick = function (e) {
  e = e || event;
  var isLink = findParent('a', e.target || e.srcElement);
  if (isLink) {
    switch (true) {
      /** View Student information detail */
      case /#student/.test(isLink.href):
        var personInstance = _context.context.getPersonById((0, _utils.getIdFromURL)(isLink.href));
        personInstance.getHTMLDetail();
        break;
      /** Modify student information */
      case /#editStudent/.test(isLink.href):
        personInstance = _context.context.getPersonById((0, _utils.getIdFromURL)(isLink.href));
        personInstance.getHTMLEdit();
        break;
      /** Delete student with confirmation */
      case /#deleteStudent/.test(isLink.href):
        if (window.confirm('Are you sure?')) {
          _context.context.students.delete(parseInt((0, _utils.getIdFromURL)(isLink.href)));
          _context.context.getTemplateRanking();
        }
        break;
      /** Show popup associated to an student in order to assign XP points  */
      case /#addXP/.test(isLink.href):
        personInstance = _context.context.getPersonById((0, _utils.getIdFromURL)(isLink.href));
        showXP(personInstance);
        break;
      /** Add new student form */
      case /#addStudent/.test(isLink.href):
        _context.context.addPerson();
        break;
      /** logout */
      case /#logout/.test(isLink.href):
        (0, _menu.logout)();
        break;
      /** Button to show a one more graded task on ranking table list */
      case /#MoreGradedTasks/.test(isLink.href):
        _context.context.showNumGradedTasks++;
        _context.context.getTemplateRanking();
        break;
      /** Add new Graded Task form */
      case /#addGradedTask/.test(isLink.href):
        _context.context.addGradedTask();
        break;
      case /#detailGradedTask/.test(isLink.href):
        var gtInstance = _context.context.getGradedTaskById((0, _utils.getIdFromURL)(isLink.href));
        gtInstance.getHTMLEdit();
        break;
      case /#settings/.test(isLink.href):
        _context.context.settings();
        break;
      default:
        _context.context.isLogged();
    }
  }
};

/** find first parent with tagName [tagname] so nested links <a> are triggered too */
function findParent(tagname, el) {
  while (el) {
    if ((el.nodeName || el.tagName).toLowerCase() === tagname.toLowerCase()) {
      return el;
    }
    el = el.parentNode;
  }
  return null;
}

/** Open window dialog associated to a person instance and let us award him with some XP points */
function showXP(personInstance) {
  var popUpXP = (0, _utils.popupwindow)('templates/listAttitudeTasks.html', 'XP points to ' + personInstance.name, 600, 600);

  popUpXP.onload = function () {
    popUpXP.document.title = personInstance.name + ' ' + personInstance.surname + ' XP points';
    var xpButtons = popUpXP.document.getElementsByClassName('xp');
    Array.prototype.forEach.call(xpButtons, function (xpBItem) {
      xpBItem.addEventListener('click', function () {
        popUpXP.close();
        personInstance.addAttitudeTask(new _attitudetask2.default('XP task', xpBItem.innerHTML, xpBItem.value));
      });
    });
  };
}

},{"./attitudetask.js":1,"./context.js":2,"./menu.js":6,"./utils.js":10}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logout = exports.generateMenu = undefined;

var _context = require('./context.js');

var _utils = require('./utils.js');

function generateMenu() {
  var output = '';
  if (_context.context.user.displayName) {
    output += '<li><a href="">Welcome ' + _context.context.user.displayName + '</a></li>';
  }
  output += '<li><a href="#settings"> Settings</a></li>';
  output += '<li><a href="#addStudent"> + Student</a></li>';
  output += '<li><a href="#addGradedTask"> + Graded task</a></li>';
  if (_context.context.user.displayName) {
    output += '<li><a  href="#logout"><button id="logut"><strong>LOGOUT</strong></button></a></li>';
  }
  document.getElementById('menuButtons').innerHTML = output;
}

function logout() {
  _context.context.user = '';
  (0, _utils.deleteCookie)('user');
  (0, _utils.deleteCookie)('connect.sid');
  (0, _utils.loadTemplate)('api/logout', function (response) {
    _context.context.login();
  }, 'GET', '', false);
}
exports.generateMenu = generateMenu;
exports.logout = logout;

},{"./context.js":2,"./utils.js":10}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Person class. We store personal information and attitudePoints that reflect daily classroom job
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @constructor
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @param {string} name - Person name
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @param {string} surname - Person surname
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @param {array} attitudeTasks - Person awarded AttitudeTasks array   
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @param {number} id - Person id default value null whwen created first time
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @tutorial pointing-criteria
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _utils = require('./utils.js');

var _context = require('./context.js');

var _attitudetask = require('./attitudetask.js');

var _attitudetask2 = _interopRequireDefault(_attitudetask);

var _gradedtask = require('./gradedtask.js');

var _gradedtask2 = _interopRequireDefault(_gradedtask);

var _dataservice = require('./dataservice.js');

var _templator = require('./templator.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var privateAddTotalPoints = Symbol('privateAddTotalPoints'); /** To accomplish private method */
var _totalPoints = Symbol('TOTAL_POINTS'); /** To acomplish private property */

var Person = function () {
  function Person(name, surname, attitudeTasks) {
    var id = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

    _classCallCheck(this, Person);

    this[_totalPoints] = 0;
    this.name = name;
    this.surname = surname;
    if (!id) {
      this.id = (0, _utils.hashcode)(this.name + this.surname);
    } else {
      this.id = id;
    }
    this.attitudeTasks = attitudeTasks;

    this.attitudeTasks.forEach(function (itemAT) {
      this[_totalPoints] += parseInt(itemAT['task'].points);
    }.bind(this));
  }

  /** Add points to person. we should use it carefully . */


  _createClass(Person, [{
    key: privateAddTotalPoints,
    value: function value(points) {
      if (!isNaN(points)) {
        this[_totalPoints] += points;
        _context.context.getTemplateRanking();
      }
    }

    /** Get person id  based on a 10 character hash composed by name+surname */

  }, {
    key: 'getId',
    value: function getId() {
      return this.id;
    }

    /** Read person _totalPoints. A private property only modicable inside person instance */

  }, {
    key: 'getTotalPoints',
    value: function getTotalPoints() {
      return this[_totalPoints];
    }

    /** Add a Attitude task linked to person with its own mark. */

  }, {
    key: 'addAttitudeTask',
    value: function addAttitudeTask(taskInstance) {
      this.attitudeTasks.push({ 'task': taskInstance });
      this[privateAddTotalPoints](parseInt(taskInstance.points));
      _context.context.notify('Added ' + taskInstance.description + ' to ' + this.name + ',' + this.surname);
    }
    /** Get students Marks sliced by showNumGradedTasks from context*/

  }, {
    key: 'getStudentMarks',
    value: function getStudentMarks() {
      var gtArray = _gradedtask2.default.getStudentMarks(this.getId()).reverse();
      return gtArray.slice(0, _context.context.showNumGradedTasks);
    }
  }, {
    key: 'getGTtotalPoints',
    value: function getGTtotalPoints() {
      return _gradedtask2.default.getStudentGradedTasksPoints(this.getId());
    }

    /** Renders person edit form */

  }, {
    key: 'getHTMLEdit',
    value: function getHTMLEdit() {
      var callback = function (responseText) {
        var _this = this;

        document.getElementById('content').innerHTML = responseText;
        var saveStudent = document.getElementById('newStudent');
        document.getElementById('idFirstName').value = this.name;
        document.getElementById('idSurnames').value = this.surname;
        var avatar = document.getElementById('upload');
        //uploadAvatar(window.btoa(avatar));
        var codeavatar = "";
        avatar.onchange = function (avatar) {
          var fileavatar = avatar.target.files;
          var fileReader = new FileReader();
          fileReader.onload = function (evt) {
            codeavatar = evt.target.result;
          };
          fileReader.readAsDataURL(fileavatar[0]);
        };
        saveStudent.addEventListener('submit', function () {
          var oldId = _this.getId();
          _this.name = document.getElementById('idFirstName').value;
          _this.surname = document.getElementById('idSurnames').value;
          var student = new Person(_this.name, _this.surname, _this.attitudeTasks, _this.id);
          _context.context.students.set(student.getId(), student);
          var iDavatar = JSON.stringify([student.getId(), codeavatar]);
          (0, _dataservice.uploadAvatar)(iDavatar);
          (0, _dataservice.saveStudents)(JSON.stringify([].concat(_toConsumableArray(_context.context.students))));
        });
      }.bind(this);

      (0, _utils.loadTemplate)('templates/addStudent.html', callback);
    }
    /** Renders person detail view */

  }, {
    key: 'getHTMLDetail',
    value: function getHTMLDetail() {
      (0, _utils.loadTemplate)('templates/detailStudent.html', function (responseText) {
        document.getElementById('content').innerHTML = responseText;
        var TPL_STUDENT = this;
        var scope = {};
        scope.TPL_ATTITUDE_TASKS = this.attitudeTasks.reverse();
        var TPL_GRADED_TASKS = '';
        _context.context.gradedTasks.forEach(function (gtItem) {
          TPL_GRADED_TASKS += '<li class="list-group-item">' + gtItem.getStudentMark(TPL_STUDENT.getId()) + '->' + gtItem.name + '->' + (0, _utils.formatDate)(new Date(gtItem.datetime)) + '</li>';
        });
        var out = (0, _templator.template)(responseText, scope);
        console.log(out);
        document.getElementById('content').innerHTML = eval('`' + out + '`');
      }.bind(this));
    }
  }, {
    key: 'finalGrade',
    value: function finalGrade() {
      var answer = parseInt(this.getTotalPoints()) * localStorage.getItem('Actitdepoints') / parseInt(_context.context.getfirststudent().getTotalPoints());
      console.log('(' + parseInt(this.getTotalPoints()) + '*' + localStorage.getItem('Actitdepoints') + ')' + '/' + parseInt(_context.context.getfirststudent().getTotalPoints()));
      console.log(parseInt(this.getTotalPoints()) * localStorage.getItem('Actitdepoints') + '/' + parseInt(_context.context.getfirststudent().getTotalPoints()));
      console.log('AttitudeTasks' + answer);
      var gradetasks = this.getGTtotalPoints() * (100 - localStorage.getItem('aActitdepoints')) / 100;
      console.log('(' + this.getGTtotalPoints() + '*' + (100 - localStorage.getItem('Actitdepoints')) + ')' + '/' + 100);
      console.log(this.getGTtotalPoints() * (100 - localStorage.getItem('Actitdepoints')) + '/' + 100);
      console.log('Gradetasks mark' + gradetasks);

      var points = parseInt(answer) + parseInt(gradetasks);
      console.log('Student: ' + this.name + ' ' + this.surname);
      console.log(points);
      console.log('Final Marks' + points * 10 / 10);
      console.log('---------------------------------------------------------------------------');
      return Math.round(points * 10 / 10);
    }
  }]);

  return Person;
}();

exports.default = Person;

},{"./attitudetask.js":1,"./context.js":2,"./dataservice.js":3,"./gradedtask.js":4,"./templator.js":9,"./utils.js":10}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Task class. Create a task in order to be evaluated for every student engaged. 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @constructor
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @param {string} name - task name
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @param {string} description - task description
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @param {number} id - task id default null when created for first time
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @tutorial pointing-criteria
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _utils = require('./utils.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Task = function () {
  function Task(name, description) {
    var id = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    _classCallCheck(this, Task);

    this.name = name;
    this.description = description;
    this.datetime = new Date();
    if (!id) {
      this.id = (0, _utils.hashcode)(this.name + this.datetime);
    } else {
      this.id = id;
    }
  }

  /** Get id task hash based on name + datetime concatenation */


  _createClass(Task, [{
    key: 'getId',
    value: function getId() {
      return this.id;
    }
  }]);

  return Task;
}();

exports.default = Task;

},{"./utils.js":10}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
String.prototype.replaceAll = function (search, replacement) {
  var target = this;
  return target.replace(new RegExp(search, 'g'), replacement);
};

function template(responseTPL, scope) {
  //let virt = document.createElement('html');
  //virt.innerHTML = responseTPL;
  var parser = new DOMParser();
  var virt = parser.parseFromString(responseTPL, 'text/html');

  var elements = virt.querySelectorAll('[ng-repeat]');

  while (elements && elements[0]) {
    var repeatExpr = elements[0].getAttribute('ng-repeat');
    var words = /(\S*) in (\S*)/.exec(repeatExpr);
    if (words[2].startsWith('scope')) {
      var arrayIt = eval(words[2]);
      words[2] = words[2].substring(6, words[2].lenght); //Remove scope word from beginning
      explodeNode(virt, elements[0], arrayIt, words[1], words[2]);
    } else {
      explodeNode(virt, elements[0], scope[words[2]], words[1], words[2]);
    }
    elements = virt.querySelectorAll('[ng-repeat]');
  }
  //console.log(virt.getElementsByTagName('body')[0].innerHTML);
  //let output = eval('`' + virt.getElementsByTagName('body')[0].innerHTML + '`');
  return virt.getElementsByTagName('body')[0].innerHTML;
}

function explodeNode(virtDom, element, arrayItems, strReplace, strBase) {
  element.removeAttribute('ng-repeat');
  if (arrayItems && arrayItems.length > 0) {
    var str = '';
    var lastSibling = element;
    for (var i = 0; i < arrayItems.length - 1; i++) {
      var cloned = element.cloneNode(true);
      str = cloned.innerHTML;
      str = str.replaceAll(strReplace, 'scope.' + strBase + '[' + (i + 1) + ']');
      cloned.innerHTML = str;
      var parent = element.parentNode;
      parent.insertBefore(cloned, lastSibling.nextSibling);
      lastSibling = cloned;
    }
    str = element.innerHTML;
    str = str.replaceAll(strReplace, 'scope.' + strBase + '[0]');
    element.innerHTML = str;
  } else {
    element.innerHTML = '';
  }
}

exports.template = template;

},{}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var CACHE_TEMPLATES = new Map();

/** Hash code funtion usefull for getting an unique id based on a large text */
function hashcode(str) {
  var hash = 0,
      i = void 0,
      chr = void 0;
  if (str.length === 0) {
    return hash;
  }
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

function setCookie(cname, cvalue, exdays) {
  if (cvalue && cvalue !== '') {
    var d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    var expires = 'expires=' + d.toUTCString();
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
  }
}
function getCookie(cname) {
  var name = cname + '=';
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

function deleteCookie(name) {
  document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function loadTemplate(urlTemplate, callback) {
  var method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'GET';
  var params = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
  var cached = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;

  if (CACHE_TEMPLATES.has(urlTemplate)) {
    return callback(CACHE_TEMPLATES.get(urlTemplate));
  } else {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        if (cached) {
          CACHE_TEMPLATES.set(urlTemplate, this.responseText);
        }
        callback(this.responseText);
      }
      if (this.status === 401) {
        if (urlTemplate === 'api/login') {
          document.getElementById('loginAlert').style.visibility = 'visible';
        }
      }
    };
    xhttp.open(method, urlTemplate, true);
    if (method === 'POST') {
      if (urlTemplate === 'api/saveStudents' || urlTemplate === 'api/saveGradedTasks' || urlTemplate === 'api/uploadAvatar') {
        console.log(urlTemplate, params);
        xhttp.setRequestHeader('Content-Type', 'application/json');
      } else {
        xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      }
    }
    console.log(params);
    xhttp.send(params);
  }
}

function popupwindow(url, title, w, h) {
  var left = screen.width / 2 - w / 2;
  var top = screen.height / 2 - h / 2;
  return window.open(url, title, 'toolbar=no, location=no, directories=no,' + 'status=no, menubar=no,scrollbars=no, resizable=no, copyhistory=no,' + ' width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
}

function formatDate(date) {
  var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();
  var minute = date.getMinutes();
  var hour = date.getHours();

  return day + ' ' + monthNames[monthIndex] + ' ' + year + ' ' + hour + ':' + minute;
}
function getIdFromURL(url) {
  var reg = /([0-9,-]*)$/gi;
  var matchResults = url.match(reg);
  return matchResults[0];
}

exports.formatDate = formatDate;
exports.popupwindow = popupwindow;
exports.hashcode = hashcode;
exports.deleteCookie = deleteCookie;
exports.setCookie = setCookie;
exports.getCookie = getCookie;
exports.loadTemplate = loadTemplate;
exports.getIdFromURL = getIdFromURL;

},{}]},{},[5]);
