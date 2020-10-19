module.exports.profile = function(req, res)
{
    return res.render('profile',
    {
        title: 'Profile'
    });
}