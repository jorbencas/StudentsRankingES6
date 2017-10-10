(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Val = function Val(id, val) {
  _classCallCheck(this, Val);

  this.id = id;
  this.val = val;
};

exports.default = Val;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Task = function Task(title) {
    _classCallCheck(this, Task);

    this.title = title;
};

exports.default = Task;

},{}],3:[function(require,module,exports){

'use strict';

var _person = require('./person.js');

var _person2 = _interopRequireDefault(_person);

var _Task = require('./Task.js');

var _Task2 = _interopRequireDefault(_Task);

var _Mark = require('./Mark.js');

var _Mark2 = _interopRequireDefault(_Mark);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var students = [new _person2.default("Paco", "Vañó", 5), new _person2.default("Lucia", "Botella", 10), new _person2.default("German", "Ojeda", 3), new _person2.default("Salva", "Peris", 1), new _person2.default("Oscar", "Carrion", 40)];

var IthemTasks = [new _Task2.default("presto")];

var preval = [new _Mark2.default(0, 1)];

function getRanking(students) {

  students.sort(function (a, b) {
    return b.points - a.points;
  });

  var studentsEl = document.getElementById("llistat");

  var pages = document.getElementById("page");

  //Estamos creando el input de la tarea.

  var nt = document.getElementById("nt");
  var taskcount = -9; //Declaracción de id incremental (No funcciona optimamente al recargar la lista de alumnos).
  nt.onclick = function () {
    taskcount++;
    var inp = document.createElement("input");
    inp.setAttribute("type", "text");
    inp.setAttribute("id", taskcount);
    inp.setAttribute("class", "subject");
    pages.appendChild(inp);

    inp.addEventListener("keyup", function () {
      //se agreja el valor del input como atributo name
      var taskn = document.getElementById(taskcount).value;
      inp.setAttribute("name", taskn);
    });
  };

  var liEl = document.createElement("li");
  studentsEl.appendChild(liEl);

  while (studentsEl.firstChild) {
    studentsEl.removeChild(studentsEl.firstChild);
  }
  //Declaramos un contador, sera el id de cada input.
  var cont = -1;
  students.forEach(function (studentItem) {

    //Creammos la lista de alumnos.
    var liEl = document.createElement("li");
    var t = document.createTextNode(studentItem.surname + ", " + studentItem.name + ", " + studentItem.points + " "); // Create a text node
    liEl.appendChild(t);

    //Creamos el boton 
    var addPointsEl = document.createElement("button");
    var tb = document.createTextNode("+20");
    addPointsEl.appendChild(tb);

    studentsEl.appendChild(liEl);
    liEl.appendChild(addPointsEl);

    //Se ejecutara si el elemto del array (propiedad name del input tarea) no esta definido.
    if (IthemTasks.title === undefined || IthemTasks.title == "presto") {
      var nts = document.getElementById("nt");
      nts.addEventListener("click", function () {
        var tasks = document.getElementsByClassName("subject");
        for (var index = 0; index < tasks.length; index++) {
          var element = tasks[index];
          element.addEventListener("keyup", function () {
            var tvn = element.getAttribute('name');
            //Si el atibuto name, esta definido, o no es nulo.
            if (!(tvn == "undefined" || tvn == "null")) {
              IthemTasks.title = tvn; //guardamos el atributo name en el array
            }
          });
        }

        var inps = document.createElement("input");
        cont++;
        inps.setAttribute("id", cont);
        inps.setAttribute("type", "number");
        liEl.appendChild(inps);

        ithemclick(inps, cont, studentItem);
      });
    } else {
      //Este cosdigo se ejecutara cuando recarguemos la lista de estudiantes
      var tasks = document.getElementsByClassName("subject");
      //Obtenemos la classe de task, i hacemos un
      for (var index = 0; index < tasks.length; index++) {
        var element = tasks[index];
        element.addEventListener("keyup", function () {
          var tvn = element.getAttribute('name');
          if (!(tvn == "undefined" || tvn == "null")) {
            IthemTasks.title = tvn;
          }
        });
      }

      var inps = document.createElement("input");
      cont++;
      inps.setAttribute("id", cont);
      inps.setAttribute("type", "number");
      inps.setAttribute(IthemTasks.title, preval.val); //recuperamos el atributo nam que teniamos guardado (No funcciona optimamente).
      liEl.appendChild(inps);

      var po = preval.id; //Obtenemos el id que hemos guardado hen la classe value 
      console.log("ID that change value" + po);

      var change = document.getElementById(po);
      //Si el id que hemos guardado, del usuario es igual al id al que vamos ha añadir el valor
      if (cont == po || change != null) {
        change.setAttribute("value", preval.val); //Añadimos el valor que hemos guardado al elemento.
      }
      ithemclick(inps, cont, studentItem);
    }

    addPointsEl.addEventListener("click", function () {
      studentItem.addPoints(20);
      setTimeout(function () {
        getRanking(students);
      }, 1000);
    });
  });
}

window.onload = function () {
  getRanking(students);
};

function ithemclick(inps, cont, studentItem) {

  var point = document.getElementById(cont);

  point.addEventListener("change", function () {
    var points = point.value;
    console.log("Number of points add" + points);
    inps.setAttribute(IthemTasks.title, points); //Guardamos los puntos en la classe task.
    var value = point.getAttribute(IthemTasks.title);
    var parse = parseInt(value);
    preval.id = point.id; //Guardamos id del elemto que ha cambiado
    preval.val = parse; //Guardamos valor del elemto que ha cambiado
    studentItem.addPoints(parse);
    setTimeout(function () {
      getRanking(students);
    }, 1000);
  });
}

},{"./Mark.js":1,"./Task.js":2,"./person.js":4}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Person prototype. We store personal information and points that reflect daily classroom job
 *
 * @constructor
 * @param {string} name - Person name
 * @param {string} surname - Person surname
 * @param {number} points - Person points 
 * @tutorial pointing-criteria
 */

var Person = function () {
  function Person(name, surname, points) {
    _classCallCheck(this, Person);

    this.name = name;
    this.surname = surname;
    this.points = points;
    //anefds  
  }

  _createClass(Person, [{
    key: "addPoints",
    value: function addPoints(points) {
      this.points += points;
    }
  }]);

  return Person;
}();

exports.default = Person;

},{}]},{},[3]);
