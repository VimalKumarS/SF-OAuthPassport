/**
 * Created by vimalkumar on 3/13/2016.
 */

var authenticationOptions = {};

var CF_CLIENT_ID = '//3MVG9Gmy2zmPB01qfiw6htsllaBe7PbvmT29sqnF9fzse7a7Lyo8cSAdS14z.LtRoM0a7QuHDvB.vXaU24Qki//';

// Set Force.com app's clientSecret
var CF_CLIENT_SECRET = '//1393651144483113262//';

var CF_CALLBACK_URL = 'http://localhost/auth/salesforce/callback';

var SF_baseURL = 'https://test.salesforce.com';

var oauth2= require('./oAuth-Salesforce');

module.exports=function(app,passport) {


    app.get('/auth/forcedotcom', passport.authenticate('forcedotcom'));

    /*
     *  {
     display: "page", // valid values are: "page", "popup", "touch", "mobile"
     prompt: "", // valid values are: "login", "consent", or "login consent"
     login_hint: ""
     },function(req, res){}*/

    function checkSession(req) {
        var logins = {
            fdc_user: true,
            fdc_user_id: null,

        }

        if (req.session["forcedotcom"]) {
            logins.fdc_user = true;
            logins.fdc_user_id = req.session["forcedotcom"]["id"];
        }


        return logins;
    }


    /* app.get('/auth/salesforce/callback',
     function(req,res){
     passport.authenticate('forcedotcom', { code: req.query.code,    redirect_uri: CF_CALLBACK_URL,
     client_id: CF_CLIENT_ID,
     grant_type:'authorization_code',
     client_secret: CF_CLIENT_SECRET } ,
     function(err,req,res){
     console.log("callback")
     next();
     } )

     },
     function(err,req, res){
     console.log("callback")
     req.session["forcedotcom"] = req.session["passport"]["user"];

     res.render("index",{ title: checkSession(req)    });
     }
     );*/
    /*
     app.get('/auth/salesforce/callback',

     function(req, res){


     passport.authenticate('forcedotcom', { code: req.query.code,client_id: CF_CLIENT_ID,
     grant_type:'authorization_code',
     client_secret: CF_CLIENT_SECRET ,
     failureRedirect: '/error',successRedirect:'/'})},function(req,res){

     console.log("callback")
     req.session["forcedotcom"] = req.session["passport"]["user"];

     res.render("index",{ title: checkSession(req)    });
     }
     ); */
    app.get('/auth/salesforce/callback',

        function (req, res) {

            // To do: store the user session info
            // to get the user session url
            var authorizationCode = req.query.code;

            oauth2.authenticate({
                base_url:SF_baseURL,
                redirect_uri: CF_CALLBACK_URL,
                client_id: CF_CLIENT_ID,
                client_secret: CF_CLIENT_SECRET,
                code: authorizationCode
            }, function (error, payload) {

                //console.log(payload);
                req.session.UserSessionInfo=payload;
                res.redirect("/");
               //res.render("index",{ title: JSON.stringify(payload)    });
            });

        });

}