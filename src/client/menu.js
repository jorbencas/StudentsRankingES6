'use strict'
import {context} from './context.js';
import {deleteCookie,loadTemplate} from './utils.js';

function generateMenu() {
  let output = '';
  if (context.user.displayName) {
    output += '<li><a href="">Welcome ' + context.user.displayName + '</a></li>';
  }
  output += '<li><a href="#settings"> Settings</a></li>';  
  output += '<li><a href="#addStudent"> + Student</a></li>';
  output += '<li><a href="#addGradedTask"> + Graded task</a></li>';
  if (context.user.displayName) {
    output += '<li><a  href="#logout"><button id="logut"><strong>LOGOUT</strong></button></a></li>';
  }
  document.getElementById('menuButtons').innerHTML = output;
}

function logout() {
  context.user = '';
  deleteCookie('user');
  deleteCookie('connect.sid');
  loadTemplate('api/logout',function(response) {
                context.login();
              },'GET','',false);
}
export {generateMenu,logout};
