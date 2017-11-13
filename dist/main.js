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
    (0, _dataservice.updateFromServer)();
    /* if (localStorage.getItem('students')) {
      let students_ = new Map(JSON.parse(localStorage.getItem('students')));
      students_.forEach(function(value_,key_,students_) {
        students_.set(key_,new Person(value_.name,value_.surname,
          value_.attitudeTasks,value_.id));
      });
      this.students = students_;
    }*/
    if (localStorage.getItem('gradedTasks')) {
      var gradedTasks_ = new Map(JSON.parse(localStorage.getItem('gradedTasks')));
      gradedTasks_.forEach(function (value_, key_, gradedTasks_) {
        gradedTasks_.set(key_, new _gradedtask2.default(value_.name, value_.description, value_.weight, value_.studentsMark, value_.id));
      });
      this.gradedTasks = gradedTasks_;
    }
  }
  /** Check if user is logged */


  _createClass(Context, [{
    key: 'isLogged',
    value: function isLogged() {
      if (this.user) {
        return true;
      } else {
        return false;
      }
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
              (0, _menu.generateMenu)();
              that.getTemplateRanking();
              that.showMenu();
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

      if (this.students && this.students.size > 0) {
        /* We sort students descending from max number of points to min */
        var arrayFromMap = [].concat(_toConsumableArray(this.students.entries()));
        arrayFromMap.sort(function (a, b) {
          return b[1].getTotalPoints() - a[1].getTotalPoints();
        });
        this.students = new Map(arrayFromMap);

        localStorage.setItem('students', JSON.stringify([].concat(_toConsumableArray(this.students)))); //Use of spread operator to convert a Map to an array of pairs
        var TPL_GRADED_TASKS = '';
        /* Maximum visible graded tasks could not be greater than actually existing graded tasks */
        if (this.showNumGradedTasks >= this.gradedTasks.length) {
          this.showNumGradedTasks = this.gradedTasks.length;
        }

        if (this.gradedTasks && this.gradedTasks.size > 0) {
          var arrayGradedTasks = [].concat(_toConsumableArray(this.gradedTasks.entries())).reverse();
          //TPL_GRADED_TASKS = arrayGradedTasks.slice(this.showNumGradedTasks);
          for (var i = 0; i < this.showNumGradedTasks; i++) {
            if (i === this.showNumGradedTasks - 1) {
              TPL_GRADED_TASKS += '<th><a href="#detailGradedTask/' + arrayGradedTasks[i][0] + '">' + arrayGradedTasks[i][1].name + '(' + arrayGradedTasks[i][1].weight + '%)&nbsp;</a><a href="#MoreGradedTasks"><button id="more_gt"><i class="fa fa-hand-o-right fa-1x"></i></button></a></th>';
            } else {
              TPL_GRADED_TASKS += '<th><a href="#detailGradedTask/' + arrayGradedTasks[i][0] + '">' + arrayGradedTasks[i][1].name + '(' + arrayGradedTasks[i][1].weight + '%)</a></th>';
            }
          }
        }

        (0, _utils.loadTemplate)('templates/rankingList.html', function (responseText) {
          document.getElementById('content').innerHTML = eval('`' + responseText + '`');
          var tableBody = document.getElementById('idTableRankingBody');
          var that = this;
          var callback = function callback() {
            var gtInputs = document.getElementsByClassName('gradedTaskInput');
            Array.prototype.forEach.call(gtInputs, function (gtInputItem) {
              gtInputItem.addEventListener('change', function () {
                var idPerson = gtInputItem.getAttribute('idPerson');
                var pers = parseInt(idPerson);
                var idGradedTask = gtInputItem.getAttribute('idGradedTask');
                var gt = that.gradedTasks.get(parseInt(idGradedTask));
                gt.addStudentMark(idPerson, gtInputItem.value);
                // let XP_GRADETASKS = GradedTask.calculatexpgradetask(pers);
                context.getTemplateRanking();
              });
            });
          };
          var itemsProcessed = 0;
          this.students.forEach(function (studentItem, key, map) {
            studentItem.getHTMLView(tableBody);
            itemsProcessed++;
            if (itemsProcessed === map.size) {
              setTimeout(callback, 300); //FAULTY 
            }
          });
        }.bind(this));
      } else {
        localStorage.setItem('students', []);
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

        var POINTSTASK = parseInt(100 - _gradedtask2.default.totalweight());
        document.getElementById('tp').innerHTML = 'Task Weight (0-' + POINTSTASK + ' %):';
        document.getElementById('idTaskWeight').setAttribute('max', POINTSTASK);

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
          localStorage.setItem('gradedTasks', JSON.stringify([].concat(_toConsumableArray(_this.gradedTasks)))); //Use of spread operator to convert a Map to an array of pairs
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

        saveStudent.addEventListener('submit', function () {
          var name = document.getElementById('idFirstName').value;
          var surnames = document.getElementById('idSurnames').value;
          var student = new _person2.default(name, surnames, []);
          _this2.gradedTasks.forEach(function (iGradedTask) {
            iGradedTask.addStudentMark(student.getId(), 0);
          });
          _this2.students.set(student.getId(), student);
          _this2.getTemplateRanking();
          return false; //Avoid form submit
        });
      }.bind(this);

      (0, _utils.loadTemplate)('templates/addStudent.html', callback);
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

},{"./dataservice.js":3,"./gradedtask.js":4,"./menu.js":6,"./person.js":7,"./utils.js":9}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateFromServer = undefined;

var _utils = require('./utils.js');

var _context = require('./context.js');

var _person = require('./person.js');

var _person2 = _interopRequireDefault(_person);

var _gradedtask = require('./gradedtask.js');

var _gradedtask2 = _interopRequireDefault(_gradedtask);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Singleton
function updateFromServer() {

  (0, _utils.loadTemplate)('api/getStudents', function (response) {
    localStorage.setItem('students', response);
    loadStudentsToLocalStorage();
  }, 'GET', '', false);
  /*loadTemplate('api/getGradedTasks',function(response) {
                        localStorage.setItem('gradedTasks',response);
                        loadGradedTasksToLocalStorage();
                      },'GET','',false);
  loadGradedTasksToLocalStorage();*/
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

},{"./context.js":2,"./gradedtask.js":4,"./person.js":7,"./utils.js":9}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _task = require('./task.js');

var _task2 = _interopRequireDefault(_task);

var _utils = require('./utils.js');

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
      localStorage.setItem('gradedTasks', JSON.stringify([].concat(_toConsumableArray(_context.context.gradedTasks)))); //Use of spread operator to convert a Map to an array of pairs 
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
        document.getElementById('idTaskWeight').value = this.weight;

        var POINTSTASK = parseInt(100 - GradedTask.totalweight());
        var totalpoint = parseInt(POINTSTASK) + parseInt(this.weight);
        document.getElementById('tp').innerHTML = 'Task Weight (0-' + totalpoint + ' %):';
        document.getElementById('idTaskWeight').setAttribute('max', totalpoint);
        saveGradedTask.addEventListener('submit', function () {
          var oldId = _this2.getId();
          _this2.name = document.getElementById('idTaskName').value;
          _this2.description = document.getElementById('idTaskDescription').value;
          _this2.weight = document.getElementById('idTaskWeight').value;
          var gradedTask = new GradedTask(_this2.name, _this2.description, _this2.weight, _this2.studentsMark, _this2.id);
          _context.context.gradedTasks.set(_this2.id, gradedTask);
          localStorage.setItem('gradedTasks', JSON.stringify([].concat(_toConsumableArray(_context.context.gradedTasks)))); //Use of spread operator to convert a Map to an array of pairs 
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
  }, {
    key: 'calculatexpgradetask',
    value: function calculatexpgradetask(idStudent) {

      var marks = 0;
      _context.context.gradedTasks.forEach(function (valueGT, keyGT, gradedTasks_) {
        marks += valueGT[STUDENT_MARKS].get(idStudent) * valueGT.weight / 100;
      });
      return marks;
    }
  }, {
    key: 'totalweight',
    value: function totalweight() {
      var marks = 0;
      _context.context.gradedTasks.forEach(function (valueGT, keyGT, gradedTasks_) {
        marks += parseInt(valueGT.weight);
      });
      console.log(marks);
      return marks;
    }
  }]);

  return GradedTask;
}(_task2.default);

exports.default = GradedTask;

},{"./context.js":2,"./task.js":8,"./utils.js":9}],5:[function(require,module,exports){
'use strict';

var _context = require('./context.js');

var _utils = require('./utils.js');

var _menu = require('./menu.js');

var _attitudetask = require('./attitudetask.js');

var _attitudetask2 = _interopRequireDefault(_attitudetask);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Once the page is loaded we get a context app object an generate students rank view. */
window.onload = function () {
  //context.getTemplateRanking();
  _context.context.login();
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
      default:
        if (_context.context.isLogged()) {
          _context.context.getTemplateRanking();
        }
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

},{"./attitudetask.js":1,"./context.js":2,"./menu.js":6,"./utils.js":9}],6:[function(require,module,exports){
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
    output += '<li class="nav-item"><a class="nav-link" href="">Welcome ' + _context.context.user.displayName + '</a></li>';
  }
  output += '<li class="nav-item"><a class="nav-link" href="#addStudent"><button class="btn btn-secondary"> + Student</button></a></li>';
  output += '<li class="nav-item"><a class="nav-link" href="#addGradedTask"><button class="btn btn-secondary"> + Graded task</button></a></li>';
  if (_context.context.user.displayName) {
    output += '<li class="nav-item"><a class="nav-link" href="#logout"><button class="btn btn-danger"> LOGOUT</button></a></li>';
  }
  document.getElementById('menuButtons').innerHTML = output;
}

function logout() {
  _context.context.user = '';
  (0, _utils.deleteCookie)('user');
  (0, _utils.loadTemplate)('api/logout', function (response) {
    _context.context.login();
  }, 'GET', '', false);
}
exports.generateMenu = generateMenu;
exports.logout = logout;

},{"./context.js":2,"./utils.js":9}],7:[function(require,module,exports){
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

    /** Renders HTML person table row (tr) with
     *  complete name, attitudePoints , add button and one input for 
     * every gradded task binded for that person. */

  }, {
    key: 'getHTMLView',
    value: function getHTMLView(targetElement) {
      (0, _utils.loadTemplate)('templates/lineStudent.html', function (responseText) {
        var TPL_PERSON = this;
        var TPL_REPEATED_GRADED_TASKS = '';
        var gradedTasks = _gradedtask2.default.getStudentMarks(this.getId()).reverse();
        var XP_GRADETASKS = _gradedtask2.default.calculatexpgradetask(this.getId());
        if (_context.context.showNumGradedTasks <= gradedTasks.length) {
          for (var i = 0; i < _context.context.showNumGradedTasks; i++) {
            TPL_REPEATED_GRADED_TASKS += '<td><input type="number" class="gradedTaskInput" idPerson="' + TPL_PERSON.getId() + '" idGradedTask="' + gradedTasks[i][0] + '" min=0 max=100 value="' + gradedTasks[i][1] + '"/></td>';
          }
        }
        targetElement.innerHTML += eval('`' + responseText + '`');
      }.bind(this));
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
        saveStudent.addEventListener('submit', function () {
          var oldId = _this.getId();
          _this.name = document.getElementById('idFirstName').value;
          _this.surname = document.getElementById('idSurnames').value;
          var student = new Person(_this.name, _this.surname, _this.attitudeTasks, _this.id);
          _context.context.students.set(student.getId(), student);
          localStorage.setItem('students', JSON.stringify([].concat(_toConsumableArray(_context.context.students)))); //Use of spread operator to convert a Map to an array of pairs
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
        var TPL_ATTITUDE_TASKS = '';
        this.attitudeTasks.reverse().forEach(function (atItem) {
          TPL_ATTITUDE_TASKS += '<li class="list-group-item">' + atItem.task.points + '->' + atItem.task.description + '->' + (0, _utils.formatDate)(new Date(atItem.task.datetime)) + '</li>';
        });
        var TPL_GRADED_TASKS = '';
        _context.context.gradedTasks.forEach(function (gtItem) {
          TPL_GRADED_TASKS += '<li class="list-group-item">' + gtItem.getStudentMark(TPL_STUDENT.getId()) + '->' + gtItem.name + '->' + (0, _utils.formatDate)(new Date(gtItem.datetime)) + '</li>';
        });
        document.getElementById('content').innerHTML = eval('`' + responseText + '`');
      }.bind(this));
    }
  }]);

  return Person;
}();

exports.default = Person;

},{"./attitudetask.js":1,"./context.js":2,"./gradedtask.js":4,"./utils.js":9}],8:[function(require,module,exports){
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

},{"./utils.js":9}],9:[function(require,module,exports){
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
      xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    }
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
