var MODULE=(function(my,$){
    //caching the element with the id movies
    var $movieList=$('#movies');
    var title;
    
    //a submit event when the submit button is pressed
    $('form').submit(function(evt){
        //stop browser's default behavior when submitting the form
        evt.preventDefault();
        //get the input text of the search field
        title=$('#search').val();
        //get the input text of the year field
        var year=$('#year').val();
        //set the variable api equal to the omdb api website with some query string parameters
        var api="http://www.omdbapi.com/?s="+title+"&y="+year+"&r=json&plot=full";
        
        //sending ajax request to OMDb to display movie data
        $.get(api,function callBack(data){
                //show the movies div
                $('#movies').show();
                //hide the main (description page) div
                $('.main').hide();
                //set the variable html equal to an empty string every time there is an ajax call to the omdb api
                var html='';
                //for each element in the response's array
                $.each(data.Search,function(i,movie){
                    //start populating the html string with the necessary html in the movies div
                    html+='<li><div class="poster-wrap">';
                    //if there is a poster available
                    if(movie.Poster!=="N/A"){
                        html+='<img class="movie-poster" src=http://img.omdbapi.com/?apikey=fe9f4454&i='+movie.imdbID+'></div>';
                    }
                    //if there is no poster availabe
                    else {
                        html+='<i class="material-icons poster-placeholder">crop_original</i></div>';
                    }

                    html+='<span class="movie-title">'+movie.Title+'</span>';
                    html+='<span class="movie-year">'+movie.Year+'</span>';
                });
                //if the movie exists
                if(html){
                    $movieList.html(html);
                }
                //if the movie doesn't exist
                else{ 
                    html="<li class='no-movies'><i class='material-icons icon-help'>help_outline</i>No movies found that match:"+ title+".</li> ";
                    $movieList.html(html);
                }
            });

        });//end submit event
    
        
        
    
    return my;
    
}(MODULE || {},jQuery));