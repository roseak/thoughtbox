// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require_tree .

$(document).ready(function(){
  console.log("working")
    getLinks();
    // createLink();
});

function getLinks(){
  $.getJSON('/api/v1/links', function(data) {
    $.each(data, function(index, link){
      renderLinks(link)
    })
  });
};

function renderLinks(link) {
  $('#link-listing').prepend(
    "<li data-id='" + link.id + "'>"
    + "<h5>Title: " + link.title + "</h5>"
    + "<h6>URL: " + link.url + "</h6>"
    + "<h6>read: " + link.read + "</h6></li>"
  )
}

function createLink(){
  $('#create-link').on('click', function(){
    var linkTitle  = $('#link-title').val()
    var linkUrl   = $('#link-url').val()
    var linkParams = {
      link: {
        title: linkTitle,
        url: linkUrl
      }
    }

    $('#link-title').val('')
    $('#link-url').val('')

    $.ajax({
      type: 'POST',
      cache: false,
      url:  '/api/v1/links.json',
      data: linkParams,
      success: function(link){
        renderLinks(link)
      }
    })
  })
};
