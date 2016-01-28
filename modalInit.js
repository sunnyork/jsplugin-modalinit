/* ***************************************
/* modalInit.js v1.0
/* ***************************************
/* javascript plugin based on jquery 1.11.1
/* author: Davis Lin
/* copyright (c) since 2014. Audatex TWIC.
/* ***************************************/

$(function() {

$.fn.extend({
  modalInit: function(userConf) {
    var conf = {},
        defaultConf = {
          modalContainer:'#modal-container', // {str} DOM selector of pop-up modal
          cancelBtn: '#modal-cancel', // {str} DOM selector of cancel btn. @ modal cotainer
          confirmBtn: '#modal-confirm' // {str} DOM selector of confirm btn. @ modal container
        };
    $.extend(conf,defaultConf,userConf);

    return $(this).each(function(i, e) {
      var modalTrig = $(this),
          modalContainer = $(conf.modalContainer),
          confirmBtn = $(conf.confirmBtn),
          cancelBtn = $(conf.cancelBtn),
          confirmCallback = conf.confirmCallback,
          openCallback = conf.openCallback;

      function modalInit(){

        // private attr.
        var obj = this;

        // public func.
        obj.bindOpen = function(){
          modalTrig.bind('click',function(){
            modalContainer.modal();
            if(openCallback && typeof openCallback == 'function'){
              openCallback();
            };
            obj.bindConfirm();
          });
          return obj;
        };

        obj.bindConfirm = function(){
          confirmBtn.bind('click',function(){
            obj.unbindTrig();
            if(confirmCallback && typeof confirmCallback == 'function'){
              confirmCallback();
            };
          });
          modalContainer.click(function(){obj.unbindTrig();});
          cancelBtn.click(function(){obj.unbindTrig();});
        };

        obj.unbindTrig = function(){
          confirmBtn.unbind('click');
        };

        obj.init = function(){
          obj.bindOpen();
        };

      }

      var modalInit = new modalInit();
      $(e).data('modalInit', modalInit); // API
      modalInit.init();

    });

  }
});

});