var MODULE=(function(my,$){
    // description page variables
    var $mainDescriptionDiv=$('<div class="main row"></div>');
    var $headingDiv=$('<h1></h1>');
    var $headingDivAnchor=$('<a href="#" target="_blank"></a>');
    var $ratingDiv=$('<h5></h5>');
    var $topDiv=$('<div class="top-div"></div>');
    var $goBack=$('<a href="#"><img src="svg/leftarrow.svg"><h5 id="go-back">Search results</h5></a>');
    var $titleDiv=$('<div class="title-div col-xs-4"></div>');
    var $titleImg=$('<img>');
    var $descriptionDiv=$('<div class="description-div col-xs-8"></div>');
    var $descriptionHeading=$('<h5 style="font-weight:bold">Plot Synopsis:</h5>');
    var $descriptionPara=$('<p></p>');
    var $button=$('<a href="#" class="btn btn-primary" id="button-imdb" target="_blank">View on IMDB</a>');
    
    //setup
    $headingDivAnchor.append($headingDiv);
    $topDiv.append($goBack).append($headingDivAnchor).append($ratingDiv);
    $titleDiv.append($titleImg); //append $titleImg into $titleDiv
    $descriptionDiv.append($descriptionHeading).append($descriptionPara).append($button);
    $mainDescriptionDiv.append($topDiv).append($titleDiv).append($descriptionDiv).hide();
    $('.container').append($mainDescriptionDiv);
    
    //click handler on the movies
    $('ul#movies').on("click",'li',function(){
            
        // get the title of the clicked movie
        var title=$(this).children('span[class="movie-title"]').text();
        // get the year of the clicked movie
        var year=$(this).children('span[class="movie-year"]').text(); 



        //make an ajax call to get the imdb rating and the plot
        $.getJSON("http://www.omdbapi.com/?t="+title+"&plot=full",function(response){
            //setting the movie search field to empty after a movie is clicked
            $('#search').val('');
            //setting the year search field to empty after a movie is clicked
            $('#year').val('');
            //getting the plot of the clicked movie
            var plot=response.Plot;
            //getting the imdb rating of the clicked movie
            var imdbRating=response.imdbRating;
            // get the image url of the clicked movie
            var imgUrl=response.Poster;
            // get the imdb id
            var imdbId="http://www.imdb.com/title/"+response.imdbID;
            //console.log(response);
            //hide the movies that were searched
            $('#movies').hide();
            //set the heading text 
            $headingDiv.text(title+' ('+year+')');
            //set the rating text
            $ratingDiv.text("IMDB Rating: "+imdbRating);
            //set the description
            $descriptionPara.text(plot);
            //set the image url of the title image
            $titleDiv.html('<img>');
            $titleDiv.children().attr("src","http://img.omdbapi.com/?apikey=fe9f4454&i="+response.imdbID);
            //set the button href attribute 
            $button.attr("href",imdbId);
            //set the imdb url of the movie title link
            $headingDivAnchor.attr("href",imdbId);
            //if the image url returns 'N/A'
            if(imgUrl==='N/A'){
                $titleDiv.html('<i class="material-icons poster-placeholder">crop_original</i></div>');
            }
            //scroll to the top of the page
            window.scrollTo(0, 0);
            //show the description page of the clicked movie
            $mainDescriptionDiv.show();
        });//end ajax call
        
        //Click listener on the Search results line
        $('.top-div a').on("click",function(){
            $('#movies').show();
            $('.main').hide();
            
        });//end click listener
        
        
    });
}(MODULE || {},jQuery));