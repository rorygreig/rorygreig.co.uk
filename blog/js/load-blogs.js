$( document ).ready(function() {
	loadBlogEntries();  
	//generate contents sidebar
	getContents();
});

function loadBlogEntries(){
	$.ajax({
         url: "blog_content/contents.json",
         success: function( contents ){
					contents.blogs.forEach(function( blog, index, blogs ){
						createEntry(blog);		
					});   
				},
         async:   false
    }); 
}

function createEntry( blog ){
	$.ajax({
         url: "/blog_content/" + blog.fileName,
         success: function( text ){
					date = formatDate( blog.dateCreated );
					text = processText(text);

					element = createEntryHTML(blog.title, blog.id, text, date);		
					$('.blog-content').append(element);
				},
         async:   false
    });  
}

function processText(inputStr){
	var text = inputStr;
	text = text.replace("\n", "</p><p>");	
	text = "<p>" + text + "</p>";
	return text;
}

function createEntryHTML(title, id, text, date){
	var element = $('<div href=' + id + ' id=' + id + ' title="' + title + '" class="blogentry"></div>');
	
	var titleElement = $('<h2 class="title"></h2>').html(title);	
	$(element).append(titleElement);
	
	var textElement = $('<p class="text"></p>').append(text);
	$(element).append(textElement);
	
	date = '<span class="glyphicon glyphicon-time"></span> Posted on ' + date;
	var dateElement = $('<p class="date"></p>').html(date);	
	$(element).append(dateElement);
	
	$(element).append('<hr>');
	
	return element;
}

function formatDate( input ){
	date = moment(input, "DD-MM-YYYY");
	return date.format("LL");
}

function getContents(){
	var entries = $('.blogentry');
	var listElement = $('<ul class="list-unstyled"></ul>');
	
	$(entries).each( function( index, entry, entries ){			
			var listItem = $('<li><a href="#' + entry.id + '">' + entry.title + '</a></li>');
			$(listElement).append(listItem);
		});   
	
	$('.blog-list').append(listElement);

}

