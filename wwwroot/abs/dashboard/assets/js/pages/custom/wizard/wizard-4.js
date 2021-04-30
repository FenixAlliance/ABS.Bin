"use strict";

// Class definition
var StudioWizard4 = (function () {
  // Base elements
  var wizardEl;
  var formEl;
  var validator;
  var wizard;

  // Private functions
  var initWizard = function () {
    // Initialize form wizard
    wizard = new StudioWizard("abs_wizard_v4", {
      startStep: 1, // initial active step number
      clickableSteps: true, // allow step clicking
    });

    // Validation before going to next page
    wizard.on("beforeNext", function (wizardObj) {
      if (validator.form() !== true) {
        wizardObj.stop(); // don't go to the next step
      }
    });

    wizard.on("beforePrev", function (wizardObj) {
      if (validator.form() !== true) {
        wizardObj.stop(); // don't go to the next step
      }
    });

    // Change event
    wizard.on("change", function (wizard) {
      StudioUtil.scrollTop();
    });
  };

  var initValidation = function () {
    validator = formEl.validate({
      // Validate only visible fields
      ignore: ":hidden",

      // Validation rules
      rules: {
        //= Step 1
        fname: {
          required: true,
        },
        lname: {
          required: true,
        },
        phone: {
          required: true,
        },
        emaul: {
          required: true,
          email: true,
        },

        //= Step 2
        address1: {
          required: true,
        },
        postcode: {
          required: true,
        },
        city: {
          required: true,
        },
        state: {
          required: true,
        },
        country: {
          required: true,
        },

        //= Step 3
        ccname: {
          required: true,
        },
        ccnumber: {
          required: true,
          creditcard: true,
        },
        ccmonth: {
          required: true,
        },
        ccyear: {
          required: true,
        },
        cccvv: {
          required: true,
          minlength: 2,
          maxlength: 3,
        },
      },

      // Display error
      invalidHandler: function (event, validator) {
        StudioUtil.scrollTop();

        swal.fire({
          title: "",
          text:
            "There are some errors in your submission. Please correct them.",
          type: "error",
          confirmButtonClass: "btn btn-secondary",
        });
      },

      // Submit valid form
      submitHandler: function (form) {},
    });
  };

  var initSubmit = function () {
    var btn = formEl.find('[data-ktwizard-type="action-submit"]');

    btn.on("click", function (e) {
      e.preventDefault();

      if (validator.form()) {
        // See: src\js\framework\base\app.js
        StudioApp.progress(btn);
        //StudioApp.block(formEl);

        // See: http://malsup.com/jquery/form/#ajaxSubmit
        formEl.ajaxSubmit({
          success: function () {
            StudioApp.unprogress(btn);
            //StudioApp.unblock(formEl);

            swal.fire({
              title: "",
              text: "The application has been successfully submitted!",
              type: "success",
              confirmButtonClass: "btn btn-secondary",
            });
          },
        });
      }
    });
  };

  return {
    // public functions
    init: function () {
      wizardEl = StudioUtil.get("kt_wizard_v4");
      formEl = $("#kt_form");

      initWizard();
      initValidation();
      initSubmit();
    },
  };
})();

jQuery(document).ready(function () {
  StudioWizard4.init();
});