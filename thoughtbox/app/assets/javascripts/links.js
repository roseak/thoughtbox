$(document).ready(function(){
  console.log("working")
    // getLinks();
    // createLink();
});

function getLinks(){
  $.getJSON('/api/v1/links', function(data) {
    $.each(data, function(index, link){
      // renderLinks(link)
      console.log(link)
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
