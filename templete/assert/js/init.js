(function($){
  $(function(){

  $('.button-collapse').sideNav();

      $("#search").focus(function () {
          $("#search-results").css("display", "block");
      });

  }); // end of document ready
})(jQuery); // end of jQuery name space

