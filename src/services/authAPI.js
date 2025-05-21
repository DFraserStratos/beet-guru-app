import { mockData, delay } from './apiUtils';

export const authAPI = {
  login: async (email, password) => {
    await delay();
    const user = mockData.users.find(u => u.email === email);
    if (!user || password !== 'password') {
      throw new Error('Invalid credentials');
    }
    return user;
  },

  register: async (userData) => {
    await delay();
    const newUser = {
      id: String(mockData.users.length + 1),
      ...userData
    };
    mockData.users.push(newUser);
    return newUser;
  },

  resetPassword: async (email) => {
    await delay();
    const user = mockData.users.find(u => u.email === email);
    if (!user) {
      throw new Error('User not found');
    }
    return { success: true };
  },

  checkEmailExists: async (email) => {
    await delay();
    const user = mockData.users.find(u => u.email === email);
    return { exists: Boolean(user) };
  },

  generateMagicLink: async (email) => {
    await delay(800);
    const token = Math.random().toString(36).substring(2, 15) +
                Math.random().toString(36).substring(2, 15);

    mockData.magicLinkTokens.push({
      token,
      email,
      expiry: new Date(Date.now() + 30 * 60 * 1000)
    });

    const magicLink = `${window.location.origin}/auth/verify?token=${token}`;

    return {
      success: true,
      magicLink
    };
  },

  verifyMagicLink: async (token) => {
    await delay();
    const tokenData = mockData.magicLinkTokens.find(t => t.token === token);
    if (!tokenData) {
      throw new Error('Invalid or expired token');
    }

    if (new Date() > new Date(tokenData.expiry)) {
      throw new Error('Token expired');
    }

    const user = mockData.users.find(u => u.email === tokenData.email);

    return {
      email: tokenData.email,
      isExistingUser: Boolean(user),
      user: user || null
    };
  },

  loginWithMagicLink: async (token) => {
    await delay();
    const verification = await authAPI.verifyMagicLink(token);
    if (!verification.isExistingUser) {
      throw new Error('User not found');
    }

    mockData.magicLinkTokens = mockData.magicLinkTokens.filter(t => t.token !== token);

    return verification.user;
  }
};

export default authAPI;
