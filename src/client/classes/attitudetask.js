import Task from './task.js';

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
import {context} from '../context.js';
import {popupwindow,loadTemplate, hashcode} from '../lib/utils.js';
import {saveAtitudeTasks, loadAtitudeTasks} from '../dataservice.js';
import {template} from '../lib/templator.js';

class AttitudeTask extends Task {
  constructor(name,description, hits, points) {
    super(name,description);
    this.hits = hits;
    this.points = points;
  }

  static getAtPoints(Taskid) {
    var task = context.getAtitudeTaskById(Taskid);
    return task.points;
  }

   getAtitudePoints(TasksId, atitudetask){
    context.atitudetask.set(parseInt(TasksId), atitudetask);
    saveAtitudeTasks(JSON.stringify([...context.atitudetask]));
  }
  /** Open window dialog associated to a person instance and let us award him with some XP points */
  static addXP(personInstance) {
    let scope = {};
    let XParrayFromMap = [...context.atitudetask.entries()];
    XParrayFromMap.sort(function (a, b) {
      return (b[1].hits - a[1].hits);
    });
    scope.XP_POINTS = XParrayFromMap;
    let callback = function(responseText) {
      let out = template(responseText, scope);
      $('#content').html($('#content').html() + eval('`' + out + '`'));
      $('#XPModal').modal('toggle');
      $('.xp').each(function(index) {
        if($(this).attr('value')>0){
          $(this).addClass('btn-success');
        }else{
          $(this).addClass('btn-danger');
        }
        $(this).click(() => { 
          $('#XPModal').modal('toggle');
           var task = context.getAtitudeTaskById(this.id);
           task.hits += 1;
           personInstance.addAttitudeTask(task);
           [...context.atitudetask].push(task);
           saveAtitudeTasks(JSON.stringify([...context.atitudetask]));
           $('.modal-backdrop').remove();
           context.getTemplateRanking();     
        });
      });

      $('.form-inline').submit(() => {
        let date = new Date();
        let hits = hashcode('XP task' + $('#text').val());
        var TaskIns = { 'id': hits };
        // console.log(TaskIns);
        personInstance.addAttitudeTask(TaskIns); 
        let atitudetask = new AttitudeTask('XP task', $('#text').val(),1, $('#points').val());
        atitudetask.getAtitudePoints(hits,$("#points").val());
         context.atitudetask.set(hits, atitudetask);
        saveAtitudeTasks(JSON.stringify([...context.atitudetask]));
        $('.modal-backdrop').remove();
        context.getTemplateRanking();  
     });
    }
    loadTemplate('templates/listAttitudeTasks.2.html',callback);
  }
}

export default AttitudeTask;
