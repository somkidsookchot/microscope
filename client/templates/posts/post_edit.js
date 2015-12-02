Template.postEdit.events({
    'submit form': function (e) {
        e.preventDefault();

        var currentPostId = this._id;
        var currentPostUrl = this.url;

        var postProperties = {
            url: $(e.target).find('[name=url]').val(),
            title: $(e.target).find('[name=title]').val()
        }

        Posts.update(currentPostId, {$set: postProperties}, function (error) {
            var postWithSameLink = Posts.findOne({url: currentPostUrl});
            if (postWithSameLink) {

                alert('This link has already been posted');
            } else {
                if (error) {
                    // display the error to the user
                    alert(error.reason);
                } else {
                    Router.go('postPage', {_id: currentPostId});
                }
            }
        });
    },
    'click .delete': function (e) {
        e.preventDefault();

        if (confirm("Delete this post?")) {
            var currentPostId = this._id;
            Posts.remove(currentPostId);
            Router.go('postsList');
        }
    }
});