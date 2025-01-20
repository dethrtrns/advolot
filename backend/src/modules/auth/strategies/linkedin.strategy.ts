import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-linkedin-oauth2';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';

/**
 * TODO: LinkedIn OAuth Integration
 * Current Status: Partially implemented but not working due to app verification requirements
 * 
 * Required Steps:
 * 1. Complete LinkedIn app verification process
 * 2. Get app verified as being associated with the company
 * 3. Test and fix OAuth flow with verified app credentials
 * 4. Update scopes and permissions as needed after verification
 * 
 * For now, users should use email/password or Google OAuth for authentication.
 */
@Injectable()
export class LinkedInStrategy extends PassportStrategy(Strategy, 'linkedin') {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      clientID: configService.get<string>('LINKEDIN_CLIENT_ID'),
      clientSecret: configService.get<string>('LINKEDIN_CLIENT_SECRET'),
      callbackURL: 'http://localhost:3002/auth/linkedin/callback',
      scope: ['openid', 'profile', 'email'],
      state: true,
      passReqToCallback: true,
      auth: {
        authType: 'reauthenticate'
      }
    });
  }

  async validate(
    req: any,
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: Function,
  ): Promise<any> {
    try {
      console.log('LinkedIn OAuth Flow - Request Headers:', req.headers);
      console.log('LinkedIn OAuth Flow - Request Query:', req.query);
      console.log('LinkedIn OAuth Flow - Access Token:', accessToken);
      console.log('LinkedIn OAuth Flow - Profile:', JSON.stringify(profile, null, 2));
      
      // Map LinkedIn profile to expected format
      const mappedProfile = {
        id: profile.id,
        emails: [{ value: profile.emails?.[0]?.value || profile.emailAddress || `${profile.id}@linkedin.com` }],
        name: {
          givenName: profile.name?.givenName || profile.firstName || profile.displayName?.split(' ')[0] || '',
          familyName: profile.name?.familyName || profile.lastName || profile.displayName?.split(' ').slice(1).join(' ') || '',
        },
        provider: 'linkedin',
        _json: profile._json
      };

      console.log('Mapped Profile:', JSON.stringify(mappedProfile, null, 2));

      const user = await this.authService.validateOAuthUser(mappedProfile, 'linkedin');
      console.log('Validated User:', JSON.stringify(user, null, 2));
      done(null, user);
    } catch (error) {
      console.error('LinkedIn OAuth Error:', error);
      console.error('Error Stack:', error.stack);
      done(error, null);
    }
  }
} 