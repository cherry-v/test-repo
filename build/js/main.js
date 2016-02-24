$(document).ready(function() {   
    /**link false**/
    $('a[href$="#"]').on('click', function(event) {
        event.preventDefault();
    });
    
});

