'use strict';

import AttitudeTask from './attitudetask.js';
import {context} from './context.js';
import {formatDate,popupwindow,hashcode,getElementTd,loadTemplate} from './utils.js';
/** Once the page is loaded we get a context app object an generate students rank view. */
window.onload = function() {
  context.getTemplateRanking();
  //location.search = '';
};

/*router of the application */ 
  window.onhashchange = function () {

    let hashs = location.search = '';
    let hash = window.location.hash;
    let regexp = RegExp('[0-9]{1,15}$|-[0-9]{1,15}$','g').exec(hash);
    switch (hash) {
      case '#addStudent':
        context.addPerson();
        location.search = '';
      break;
      case '#addGTask':
        context.addGradedTask();
        location.search = '';
      break;
      case '#deleteStudent/'+ regexp:
        context.deletestudent(hash.split('/')[1]);
        location.search = '';
      break;
      case'#updateStudent/' + regexp:
        context.updatestudent(hash.split('/')[1]);
        location.search = '';
      break;
      case '#detailStudent/' + regexp:
       context.students.get(parseInt(hash.split('/')[1])).getdetails();
       location.search = '';
      break;
      case '#rankinglist':
        context.getTemplateRanking();
        location.search = '';
      break;
      default:
      context.getTemplateRanking();
      break;
    }
  }


  


