document.getElementById('myForm').addEventListener('submit', saveBookmark);

function saveBookmark(e) {
    //Get form values
    var websiteName = document.getElementById('websiteName').value;
    var websiteURL = document.getElementById('websiteURL').value;

    if(!websiteName || !websiteURL) {
        alert('Please fill in the form');
    }

    var bookmark = {
        Name: websiteName,
        URL: websiteURL
    }

    if(localStorage.getItem('bookmarks') === null) {

        var bookmarks = [];

        bookmarks.push(bookmark);

        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    } else {

        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

        bookmarks.push(bookmark);

        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

        fetchBookmarks();

        document.getElementById('name').innerHTML = '';
        document.getElementById('URL').innerHTML = '';

    }

    //prevent form from submitting
    e.preventDefault();
}

function deleteBookmark(url) {

    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    for (var i = 0; i < bookmarks.length; i++) {

        if( bookmarks[i].URL == url ) {

            bookmarks.splice(i, 1);

        }

    }

    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    fetchBookmarks();

}



function fetchBookmarks() {

    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    var bookmarksResults = document.getElementById('bookmarksResults');

    bookmarksResults.innerHTML = '';

    for (var i = 0; i < bookmarks.length; i++) {

        var name = bookmarks[i].Name;
        var url = bookmarks[i].URL;

        bookmarksResults.innerHTML += '<div class="well">'+
                                      '<h3>'+name+                                       
                                      ' <a class="btn btn-default" href="'+url+'">Visit</a> ' +
                                      ' <a onclick="deleteBookmark(\''+url+'\')" href="#" class="btn btn-danger">Delete</a> ' +
                                      '</h3>'+
                                      '</div>';

    }

}

