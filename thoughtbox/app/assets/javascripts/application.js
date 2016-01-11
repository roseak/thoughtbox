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
    "<li class='read-" + link.read  + "' data-id='" + link.id + "'>"
    + "<h5 contenteditable='true' class='title-editable read-" + link.read + "'>" + link.title + "</h5>"
    + "<h6 contenteditable='true' class='url-editable'>" + link.url + "</h6>"
    + "<h6>read: " + link.read + "</h6></li>"
    + "<input class='btn btn-default pull-right' id='read-" + link.read + "-button' type='button' name='submit' value='" + marked(link.read) + "'>"
  )


  readButtons(link)
  editTitle();
  editUrl();
  searched();
};

function marked(val){
  if(val === 'true') {
    return "Mark as Unread";
  } else {
    return "Mark as Read";
  };
};

function readButtons(link){
  $('#read-' + link.read + '-button').on('click', function(){
    var $id = link.id
    var $original = link.read
    var $read = opposite(link.read)
    console.log($read)
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
        updateMarked($link, link.read, $original);
      },
    });
  });
};

function updateMarked(link, val, original){
  result = marked(val);
  console.log(result)
  $(link).find('#read-' + original + '-button').html(result);
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
          updateUrl($link, link.body);
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
