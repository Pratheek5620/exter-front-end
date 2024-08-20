// helpers/auth_helper.ts
import { UserManager, WebStorageStateStore, UserManagerSettings, User } from 'oidc-client';

const getSettings = (): UserManagerSettings => {
  const baseSettings: UserManagerSettings = {
    authority: 'http://localhost:8080/realms/Exter-Battery-Swapping',
    client_id: 'exterAdminConsole',
    client_secret:'u5ZfxZY5SXsdtdweY7kPoL25O3Wvy35v',
    redirect_uri: 'http://localhost:3000/callback',
    post_logout_redirect_uri: 'http://localhost:3000/',
    response_type: 'code',
    scope: 'openid profile email',
    automaticSilentRenew: true,
    silentRequestTimeout: 10000,
  };

  if (typeof window !== 'undefined') {
    return {
      ...baseSettings,
      userStore: new WebStorageStateStore({ store: window.localStorage }),
    };
  }

  return baseSettings;
};

const userManager = typeof window !== 'undefined' ? new UserManager(getSettings()) : null;

export const getUser = async (): Promise<User | null> => {
  try {
    return userManager ? await userManager.getUser() : null;
  } catch (error) {
    console.error('Failed to get user:', error);
    return null;
  }
};

export const getClientID = async (): Promise<string | null> => {
  try {
    const user = await getUser();
    if (user && user.profile) {
      // Assuming clientID is stored in the 'clientID' claim of the ID token
      // Adjust this according to your Keycloak server's configuration
      return user.profile.clientID || null;
    }
    return null;
  } catch (error) {
    console.error('Failed to get client ID:', error);
    return null;
  }
};

export const login = async (): Promise<void> => {
  try {
    if (userManager) {
      await userManager.signinRedirect();
    }
  } catch (error) {
    console.error('Login failed:', error);
  }
};

// Add this to auth_helper.ts

export const getUserRole = async (): Promise<string | null> => {
  try {
    const user = await getUser();
    if (user && user.profile) {
      // Assuming the role is stored in the 'role' claim of the ID token
      // Adjust this according to how your Keycloak server provides role information
      return user.profile.role || null;
    }
    return null;
  } catch (error) {
    console.error('Failed to get user role:', error);
    return null;
  }
};

export const logout = async (): Promise<void> => {
  try {
    if (userManager) {
      await userManager.signoutRedirect();
    }
  } catch (error) {
    console.error('Logout failed:', error);
  }
};

export const handleCallback = async (): Promise<User | null> => {    
  //TODO: rehandle the exception not exception eating !
  try {
    return userManager ? await userManager.signinRedirectCallback() : null;
  } catch (error) {
    //console.error('Error handling callback:', error);
    return null;
  }
};

export const renewToken = async (): Promise<User | null> => {
  try {
    return userManager ? await userManager.signinSilent() : null;
  } catch (error) {
    console.error('Token renewal failed:', error);
    return null;
  }
};

export const getAccessToken = async (): Promise<string | null> => {
  try {
    const user = await getUser();
    return user ? user.access_token : null;
  } catch (error) {
    console.error('Failed to get access token:', error);
    return null;
  }
};

if (userManager) {
  userManager.events.addUserLoaded((user) => {
   // console.log('User loaded:', user);
  });

  userManager.events.addSilentRenewError((error) => {
    console.error('Silent renew error:', error);
  });

  userManager.events.addUserSignedOut(() => {
    console.log('User signed out');
  });
}

export default userManager;
