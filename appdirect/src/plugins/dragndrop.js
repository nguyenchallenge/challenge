var jQuery = require('jquery');

(function($) {
  'use strict';

  $.fn.dragdrop = function (options) {

    var settings = $.extend({
          elements: '.container-tweet'
        }, options );

    var dragSrcEl = null;

    var cols = $(settings.elements, this);

    var handleDragStart = function (e) {
      this.style.opacity = '0.4';
      dragSrcEl = this;

      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/html', this.innerHTML);
      e.dataTransfer.setData('text', this.attributes['data-id'].value);
    };

    var handleDragOver = function (e) {
      if (e.preventDefault) {
        e.preventDefault();
      }

      e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.

      return false;
    };

    var handleDragEnter = function (e) {
      this.classList.add('over');
    };

    var handleDragLeave = function (e) {
      this.classList.remove('over');
    };

    var handleDrop = function (e) {
      e.stopImmediatePropagation();
      e.preventDefault();

      var srcElDataId    = e.dataTransfer.getData('text'),
          targetElDataId = this.attributes['data-id'].value,
          srcEl          = document.querySelector('[data-id="' + srcElDataId + '"]'),
          tempTargetElDataId;

      if (srcElDataId !== targetElDataId) {
        srcEl.innerHTML = this.innerHTML;
        this.innerHTML = e.dataTransfer.getData('text/html');

        tempTargetElDataId = this.attributes['data-id'].value;
        srcEl.attributes['data-id'].value = tempTargetElDataId;
        this.attributes['data-id'].value = srcElDataId;
      }

      return false;
    };

    var handleDragEnd = function (e) {
      [].forEach.call(cols, function (col) {
        col.classList.remove('over');
        col.style.opacity = '1';
      });

      saveColPosition();
    };

    var unbindEvents = function () {
      [].forEach.call(cols, function(col) {
        col.removeEventListener('dragstart', handleDragStart, false);
        col.removeEventListener('dragenter', handleDragEnter, false);
        col.removeEventListener('dragover', handleDragOver, false);
        col.removeEventListener('dragleave', handleDragLeave, false);
        col.removeEventListener('drop', handleDrop, false);
        col.removeEventListener('dragend', handleDragEnd, false);
      });
    };

    var bindEvents = function () {
      [].forEach.call(cols, function(col) {
        col.addEventListener('dragstart', handleDragStart, false);
        col.addEventListener('dragenter', handleDragEnter, false);
        col.addEventListener('dragover', handleDragOver, false);
        col.addEventListener('dragleave', handleDragLeave, false);
        col.addEventListener('drop', handleDrop, false);
        col.addEventListener('dragend', handleDragEnd, false);
      });
    };

    var saveColPosition = function () {
      var el,
          elDataId,
          elIndex;

      [].forEach.call(cols, function(col) {
        el = col.attributes['data-id'];
        elDataId = el.value;
        el = document.querySelector('[data-id="' + elDataId + '"]');

        elIndex = [].slice.call(el.parentNode.children).indexOf(el);
        localStorage.setItem(elDataId, +elIndex + 1);
      });
    };

    return {
      off: unbindEvents,
      on: bindEvents
    };
  };
})(jQuery);
