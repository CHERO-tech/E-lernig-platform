import { User, UserRole, ProfileUpdate } from './types';

// In-memory mock user store
const mockUsers = new Map<string, { user: User; password: string }>();

// In-memory password reset tokens. In a real deployment these would be
// emailed to the user rather than handed back in the response.
const resetTokens = new Map<string, { email: string; expiresAt: number }>();

// Mock users for testing
const defaultMockUsers: Array<{ user: User; password: string }> = [
  {
    user: {
      id: 'student-1',
      email: 'student@example.com',
      name: 'Alex Student',
      role: 'student',
      avatar: 'AS',
      createdAt: new Date(),
    },
    password: 'password123',
  },
  {
    user: {
      id: 'trainer-1',
      email: 'trainer@example.com',
      name: 'John Trainer',
      role: 'trainer',
      avatar: 'JT',
      createdAt: new Date(),
    },
    password: 'password123',
  },
  {
    user: {
      id: 'school-1',
      email: 'school@example.com',
      name: 'Riverside Academy',
      role: 'school',
      avatar: 'RA',
      createdAt: new Date(),
    },
    password: 'password123',
  },
  {
    user: {
      id: 'guardian-1',
      email: 'guardian@example.com',
      name: 'Maria Guardian',
      role: 'guardian',
      avatar: 'MG',
      createdAt: new Date(),
    },
    password: 'password123',
  },
  {
    user: {
      id: 'company-1',
      email: 'company@example.com',
      name: 'Acme Talent Co.',
      role: 'company',
      avatar: 'AC',
      createdAt: new Date(),
    },
    password: 'password123',
  },
  {
    user: {
      id: 'admin-1',
      email: 'admin@example.com',
      name: 'Sam Admin',
      role: 'admin',
      avatar: 'SA',
      createdAt: new Date(),
    },
    password: 'password123',
  },
];

// Initialize mock users
defaultMockUsers.forEach((entry) => {
  mockUsers.set(entry.user.email, entry);
});

export const mockAuthService = {
  async login(email: string, password: string): Promise<User> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const userEntry = mockUsers.get(email);
    if (!userEntry || userEntry.password !== password) {
      throw new Error('Invalid email or password');
    }

    return userEntry.user;
  },

  async signup(
    email: string,
    password: string,
    name: string,
    role: UserRole
  ): Promise<User> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (mockUsers.has(email)) {
      throw new Error('Email already exists');
    }

    const newUser: User = {
      id: `${role}-${Date.now()}`,
      email,
      name,
      role,
      avatar: name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase(),
      createdAt: new Date(),
    };

    mockUsers.set(email, { user: newUser, password });
    return newUser;
  },

  async logout(): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 300));
  },

  async getCurrentUser(email: string): Promise<User | null> {
    const userEntry = mockUsers.get(email);
    return userEntry?.user || null;
  },

  async changePassword(
    email: string,
    currentPassword: string,
    newPassword: string
  ): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 600));

    const userEntry = mockUsers.get(email);
    if (!userEntry || userEntry.password !== currentPassword) {
      throw new Error('Current password is incorrect');
    }

    userEntry.password = newPassword;
  },

  async deleteAccount(email: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 600));
    mockUsers.delete(email);
  },

  async updateProfile(currentEmail: string, updates: ProfileUpdate): Promise<User> {
    await new Promise((resolve) => setTimeout(resolve, 600));

    const entry = mockUsers.get(currentEmail);
    if (!entry) {
      throw new Error('User not found');
    }

    const nextEmail = updates.email?.trim();
    if (nextEmail && nextEmail !== currentEmail) {
      if (mockUsers.has(nextEmail)) {
        throw new Error('Email already in use');
      }
      mockUsers.delete(currentEmail);
      entry.user = { ...entry.user, ...updates, email: nextEmail };
      mockUsers.set(nextEmail, entry);
    } else {
      entry.user = { ...entry.user, ...updates };
    }

    return entry.user;
  },

  async requestPasswordReset(email: string): Promise<string> {
    await new Promise((resolve) => setTimeout(resolve, 800));
    // Always generate and return a token, regardless of whether the address is
    // registered — the response itself never reveals which emails have accounts.
    // Only when the token is actually redeemed (below) does it matter whether a
    // real account existed. There's no email service here, so the caller is
    // responsible for surfacing this token directly to the user with a clear
    // "this would normally be emailed" disclaimer.
    const token = Math.random().toString(36).slice(2, 8).toUpperCase();
    if (mockUsers.has(email)) {
      resetTokens.set(token, { email, expiresAt: Date.now() + 15 * 60 * 1000 });
    }
    return token;
  },

  async resetPasswordWithToken(token: string, newPassword: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 600));

    const entry = resetTokens.get(token);
    if (!entry || entry.expiresAt < Date.now()) {
      throw new Error('That reset code is invalid or has expired');
    }
    const userEntry = mockUsers.get(entry.email);
    if (!userEntry) {
      throw new Error('That reset code is invalid or has expired');
    }
    userEntry.password = newPassword;
    resetTokens.delete(token);
  },
};
