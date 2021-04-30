"use strict";
// Class definition

var StudioCkeditor = (function () {
  // Private functions
  var demos = function () {
    ClassicEditor.create(document.querySelector("#abs-ckeditor-1"))
      .then((editor) => {
        console.log(editor);
      })
      .catch((error) => {
        console.error(error);
      });

    InlineEditor.create(document.querySelector("#abs-ckeditor-2"))
      .then((editor) => {
        console.log(editor);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return {
    // public functions
    init: function () {
      demos();
    },
  };
})();

// Initialization
jQuery(document).ready(function () {
  StudioCkeditor.init();
});