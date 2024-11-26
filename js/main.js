(function ($) {
  "use strict";

  /*==================================================================
    [ Focus Contact2 ]*/
  $(".input3").each(function () {
    $(this).on("blur", function () {
      if ($(this).val().trim() != "") {
        $(this).addClass("has-val");
      } else {
        $(this).removeClass("has-val");
      }
    });
  });

  /*==================================================================
    [ Chose Radio ]*/
  $("#radio1").on("change", function () {
    if ($(this).is(":checked")) {
      $(".exit-price-slide").slideDown(300);
      $(".entry-price-slide").slideUp(0);
      // $(".entry-price-slide").css("display", "none");
      // $(".exit-price-slide").css("display", "block");
    }
  });

  $("#radio2").on("change", function () {
    if ($(this).is(":checked")) {
      $(".exit-price-slide").slideUp(0);
      $(".entry-price-slide").slideDown(300);
      // $(".exit-price-slide").css("display", "none");
      // $(".entry-price-slide").css("display", "block");
    }
  });

  /*==================================================================
    [ Validate ]*/
  var entryPrice = $('.validate-input input[name="entryPrice"]');
  var slPrice = $('.validate-input input[name="slPrice"]');

  $(".validate-form").on("submit", function () {
    var check = true;

    if ($(slPrice).val().trim() == "") {
      showValidate(slPrice);
      check = false;
    }

    if ($(entryPrice).val().trim() == "") {
      showValidate(entryPrice);
      check = false;
    }

    return check;
  });

  $(".validate-form .input3").each(function () {
    $(this).focus(function () {
      hideValidate(this);
    });
  });

  function showValidate(input) {
    var thisAlert = $(input).parent();

    $(thisAlert).addClass("alert-validate");
  }

  function hideValidate(input) {
    var thisAlert = $(input).parent();

    $(thisAlert).removeClass("alert-validate");
  }
})(jQuery);
