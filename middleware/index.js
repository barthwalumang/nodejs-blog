var Blog = require("../models/blog");
var middlewareObj = {};

middlewareObj.checkBlogOwner = function(req,res,next){
    if(req.isAuthenticated()){
        Blog.findById(req.params.id,function(err,foundBlog){
            if(err){
                req.flash("error","Blog not found");
                res.redirect("back");
            } else {
                if(foundBlog.author.id.equals(req.user._id)){
                    next()
                } else {
                    req.flash("error","Permission Denied!");
                    res.redirect("back");
                }
            }
        })
    } else {
        req.flash("error","Login First!!!")
        res.redirect("back");
    }
}
middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","Login First!!!");
    res.redirect("/login");
}

module.exports = middlewareObj;