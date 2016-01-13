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
    getLinks();
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
    "<li class='read-" + link.read  + " link' data-id='" + link.id + "'>"
    + "<h5 contenteditable='true' class='title-editable'>" + link.title + "</h5>"
    + "<h6 contenteditable='true' class='url-editable'>" + link.url + "</h6>"
    + "<input class='btn btn-default pull-right' id='read-" + link.read + "-button' type='button' name='submit' value='" + marked(link.read) + "'></li>"
  )

  readButtons(link)
  editTitle();
  editUrl();
  searched();
  showRead();
  showUnread();
  sorted();
};

function showRead(){
  $('.read-btn').on('click', function(){
    $('.read-false').hide();
    $('.read-f').hide();
    $('.read-true').show();
  })
}

function showUnread(){
  $('.unread-btn').on('click', function(){
    $('.read-true').hide();
    $('.read-f').show();
    $('.read-false').show();
  })
}

function sorted(){
  $('.sort-btn').on('click', function() {
    var $link = $('.link');

    $link.sort(function(one, two) {
      var first = $(one).find('.title-editable').text().toLowerCase();
      var second = $(two).find('.title-editable').text().toLowerCase();
      return (first < second) ? 1 : 0;
    });

    $.each($link, function(index, element) {
      $('#link-listing').prepend(element);
    });
  });
}

function marked(val){
  if(val === 'true') {
    return 'Mark as Unread';
  } else {
    return 'Mark as Read';
  };
};

function readButtons(link){
  $('#read-' + link.read + '-button').on('click', function(){
    var $id = link.id
    var $original = link.read
    var $read = opposite(link.read)
    var $link = link
    var linkParams = {
      link: {
        read: $read
      }
    }

    function opposite(read) {
      if(read === 'true') {
        return false;
      } else {
         return true;
      };
    }

    $.ajax({
      type: 'PUT',
      url: '/api/v1/links/' + $id + '.json',
      data: linkParams,
      success: function(link){
        $("li[data-id=" + $id + "]").remove()
        renderLinks(link);
      },
    });
  });
};

function editTitle(){
  $('.title-editable').keydown(function(event){
    if(event.keyCode == 13){
      var $title = event.currentTarget.textContent
      var $link = $(this).closest('li.link')
      var $id = $(this).closest('li').attr('data-id')
      var linkParams = {
        link: {
          title: $title
        }
      }

      $.ajax({
        type: 'PUT',
        url: '/api/v1/links/' + $id + '.json',
        data: linkParams,
        success: function(link){
          $(event.target).blur();
          updateTitle($link, link.title);
        }
      })
    }
  })
}

function updateTitle(link, title){
  $(link).find('.title-editable').html(title);
}

function editUrl(){
  $('.url-editable').keydown(function(event){
    if(event.keyCode == 13){
      var $url = event.currentTarget.textContent
      var $link = $(this).closest('li.link')
      var $id = $(this).closest('li').attr('data-id')
      var linkParams = {
        link: {
          url: $url
        }
      }

      $.ajax({
        type: 'PUT',
        url: '/api/v1/links/' + $id + '.json',
        data: linkParams,
        success: function(link){
          $(event.target).blur();
          updateUrl($link, link.url);
        }
      })
    }
  })
}

function updateUrl(link, url){
  $(link).find('.url-editable').html(url);
}

function searched(){
  $('#filter').keyup(function(){
    var filter = $(this).val();
    $('#link-listing li').each(function(){
      if ($(this).text().search(new RegExp(filter, 'i')) < 0) {
        $(this).fadeOut();
      } else {
        $(this).show();
      }
    });
  });
}
