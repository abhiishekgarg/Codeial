module.exports.home = function(req, res)
{
    // console.log(req.cookies);
    return res.render('home',
    {
        title: 'Codeial | Home'
    });
}

// module.exports.actionName = function(req, res){}