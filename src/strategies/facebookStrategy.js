const { FACEOBOOK_CLIENT_ID, FACEOBOOK_CLIENT_SECRET } = require('../config')
const UserStrategy = require('../models/UserStrategy')

const passport = require('passport')
const { Strategy: FacebookStrategy } = require('passport-facebook')

passport.serializeUser((user, done) => {
    done(null, user.id)
} )
passport.deserializeUser( async (id, done) => {
    const user = await UserStrategy.findById(id)
    done(null, user)
})

passport.use(new FacebookStrategy({
        clientID: FACEOBOOK_CLIENT_ID,
        clientSecret: FACEOBOOK_CLIENT_SECRET,
        callbackURL: '/auth/facebook/callback',
        profileFields: ['id', 'displayName', 'photos', 'email'],
        scope: ['email']
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            
            console.log(profile.emails[0].value)
            const userFound = await UserStrategy.findOne({facebookId: profile.id})
            if (userFound) return done(null, userFound)

            const newUserStrategy = new UserStrategy({
                facebookId: profile.id, 
                username: profile.displayName,
                email: profile.emails[0].value
             });
            console.log(newUserStrategy)
            
            // await newUserStrategy.save() 
            // return done(null, newUserStrategy)
        } catch (error) {
            console.log(error)
            return done(error, null)
        }
    }
)
)