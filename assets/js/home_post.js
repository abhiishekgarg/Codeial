{
    // method to submit the form data for new post using AJAX
    let createPost = function()
    {
        let newPostForm  = $('#new-post-form');

        newPostForm.submit(function(event)
        {
            event.preventDefault();
            $.ajax
            ({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function(data)
                {
                    console.log(data);
                }, error: function(error)
                {
                    console.log(error.responseText);
                }
            });
        });
    }
    

    // method to create a post in DOM
    createPost();


}