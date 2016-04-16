/**
 * Created by vimalkumar on 3/13/2016.
 */


var ForceDotComStrategy = require('passport-forcedotcom').Strategy;


var CF_CLIENT_ID = '3MVG9Gmy2zmPB01qfiw6htsllaBe7PbvmT29sqnF9fzse7a7Lyo8cSAdS14z.LtRoM0a7QuHDvB.vXaU24Qki';

// Set Force.com app's clientSecret
var CF_CLIENT_SECRET = '1393651144483113262';

var CF_CALLBACK_URL = 'http://localhost/auth/salesforce/callback';

var SF_AUTHORIZE_URL = 'https://test.salesforce.com/services/oauth2/authorize';

var SF_TOKEN_URL = 'https://test.salesforce.com/services/oauth2/token';


module.exports=function(app,passport){


    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(obj, done) {
        done(null, obj);
    });


// Use the ForceDotComStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Salesforce
//   profile), and invoke a callback with a user object.
    /*
    * authorizationURL: SF_AUTHORIZE_URL,
     tokenURL: SF_TOKEN_URL,
     response_type:"token",
    * */
    var sfStrategy = new ForceDotComStrategy({
        clientID: CF_CLIENT_ID,
        clientSecret: CF_CLIENT_SECRET,
        callbackURL: CF_CALLBACK_URL,
        authorizationURL: SF_AUTHORIZE_URL,
        tokenURL: SF_TOKEN_URL,


    }, function(accessToken, refreshToken, profile, done) {

        // asynchronous verification, for effect...
        process.nextTick(function() {

            // To keep the example simple, the user's forcedotcom profile is returned to
            // represent the logged-in user.  In a typical application, you would want
            // to associate the forcedotcom account with a user record in your database,
            // and return that user instead.
            //
            // We'll remove the raw profile data here to save space in the session store:
            //delete profile._raw;
            console.log(profile);
            return done(null, profile);
        });
    });

    passport.use(sfStrategy);

}