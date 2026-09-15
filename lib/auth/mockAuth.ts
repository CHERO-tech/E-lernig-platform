import { User, UserRole, ProfileUpdate } from './types';

// In-memory mock user store
const mockUsers = new Map<string, { user: User; password: string }>();

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

  async requestPasswordReset(_email: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 800));
    // Mock: always resolves so the UI can show a "check your email" state,
    // regardless of whether the address is registered (avoids leaking
    // which emails have accounts).
  },
};
