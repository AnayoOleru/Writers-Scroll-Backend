import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as TwitterStrategy } from 'passport-twitter';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';
import controllers from '../controllers';

const { authController } = controllers;

dotenv.config();

const {
  FACEBOOK_CLIENT_ID,
  FACEBOOK_CLIENT_SECRET,
  TWITTER_APP_ID,
  TWITTER_APP_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_APP_SECRET,
} = process.env;

const facebookConfig = {
  clientID: FACEBOOK_CLIENT_ID,
  clientSecret: FACEBOOK_CLIENT_SECRET,
  callbackURL: 'http://localhost:3000/api/v1/auth/facebook/callback',
  profileFields: ['id', 'emails', 'displayName', 'photos'],
};

const twitterConfig = {
  consumerKey: TWITTER_APP_ID,
  consumerSecret: TWITTER_APP_SECRET,
  callbackURL: 'http://localhost:3000/api/v1/auth/twitter/callback',

  includeEmail: true,
};

const googleConfig = {
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_APP_SECRET,
  callbackURL: 'http://localhost:3000/api/v1/auth/google/callback',
};

const facebookStrategy = new FacebookStrategy(
  facebookConfig,
  authController.socialCallback
);

const twitterStrategy = new TwitterStrategy(
  twitterConfig,
  authController.socialCallback
);

const googleStrategy = new GoogleStrategy(
  googleConfig,
  authController.socialCallback
);

export { facebookStrategy, twitterStrategy, googleStrategy };
