jQuery(document).ready(function($) {

			//Anomation at load -----------------
			Pace.on('done', function(event) {
				
			});//Pace


			$(".ql_scroll_top").click(function() {
			  $("html, body").animate({ scrollTop: 0 }, "slow");
			  return false;
			});

			/*Dropdown menu on hover */
			$('body').on('mouseenter', '#jqueryslidemenu:not(.in) ul li', function(event) {
				event.preventDefault();
				$(this).find('.dropdown-menu').first().stop(true, true).delay(100).slideDown(400, function(){
					$(this).addClass('open');
				});
			});
			$('body').on('mouseleave', '#jqueryslidemenu:not(.in) ul li', function(event) {
				event.preventDefault();
				$(this).find('.dropdown-menu').first().stop(true, true).delay(100).slideUp(200, function(){
					$(this).removeClass('open');
				});
			});

			//Instafeed
			if ( typeof userId !== 'undefined' && typeof accessToken !== 'undefined') {

				if ( $("#instafeed").length > 0) {
					var feed = new Instafeed({
				        //To get a User account
				        get: 'user',
	           			userId: userId,
	           			accessToken: accessToken,
				        limit: 8,
				        template: '<a target="_blank" href="{{link}}"><img src="{{image}}" /></a>'
				    });
				    feed.run();
			    };
			}else{
				$(".instagram_widget").remove();
			}
			




			//Social Icons
			if ( typeof social_icons !== 'undefined' ) {
				$.each( social_icons, function(index, val) {
					 $("#menu-social ul").append('<li><a href="' + val + '"><span class="screen-reader-text">' + extractDomain(val) + '</span></a></li>');
				});
			}else{
				$("#menu-social").remove();
			}


			//Featured Posts
			if ( ! $(".f_post").length > 0 ) {
				$(".widget_featured_posts").remove();
			};





			//Search Plugin
			$('#search-field').keydown(function(e) {
				var input_val = $(this).val();
		        $(this).val( strip(input_val) );

			});
			
			
			$("#search-field").ghostHunter({
			  results   : "#results",
			  before          : function(){
			  },
			  onComplete      : function( results ){
			  	$("#main").empty();
			  	var search_value = $("#search-field").val();

			  	var search_result = '';

			  	switch (results.length) {
				    case 0:
				        search_result = 'No posts found';
				    case 1:
				        search_result = results.length + ' post';
				    default:				    
				        search_result = results.length + ' posts';
			  	};
			  	var search_header = '<div class="search-content"><h1 class="search-title"><span>Search:</span> '+ search_value +'</h1><ul class="search-meta"><li class="search-stats"><i class="fa fa-pencil"></i>' + search_result + '</li></ul></div><!-- /search-content -->';
			  	$(search_header).appendTo('#main');

			  		var search_posts = '';
			  		$(results).each(function(index, el) {
			  			var search_post = '<article><h3 class="post-title"><a href="'+ el.link +'">'+ el.title +'</a></h3><p class="metadata"><time class="post-date">'+ el.pubDate.substring(0, el.pubDate.length - 12) +'</time></p></article>';
			  			search_posts = search_posts + search_post;
			  		});
			  		var search_list = '<div class="tag-post-list">'+ search_posts +'</div><div class="clearfix"></div>';
			  		$(search_list).appendTo('#main');
			    }
			});







			$('.dropdown-toggle').dropdown();
			$('*[data-toggle="tooltip"]').tooltip();

});

function extractDomain(url) {
    var domain;
    //find & remove protocol (http, ftp, etc.) and get domain
    if (url.indexOf("://") > -1) {
        domain = url.split('/')[2];
    }
    else {
        domain = url.split('/')[0];
    }
    //find & remove port number
    domain = domain.split(':')[0];
    domain = domain.replace("www.", "");
    domain = domain.replace(".com", "");
    return domain;
}
//Remove HTML from input search
function strip(html){
   var StrippedString = html.replace(/(<([^>]+)>)/ig,"");
   return StrippedString;
}