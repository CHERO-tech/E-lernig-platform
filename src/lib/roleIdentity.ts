export interface RoleIdentity {
  roleLabel: string;
  userName: string;
  userInitials: string;
}

const ROLE_IDENTITIES: Record<string, RoleIdentity> = {
  admin: { roleLabel: "Platform Admin", userName: "Platform Admin", userInitials: "PA" },
  trainer: { roleLabel: "Trainer", userName: "Emmanuel Nkurunziza", userInitials: "EN" },
  "school-admin": { roleLabel: "School Admin", userName: "Immaculée Nyiransengimana", userInitials: "IN" },
  guardian: { roleLabel: "Guardian", userName: "Jean de Dieu Senior", userInitials: "JS" },
  student: { roleLabel: "Student", userName: "Amahoro Jean de Dieu", userInitials: "AJ" },
  company: { roleLabel: "Company", userName: "TechRwanda Ltd", userInitials: "TR" },
};

// Fallback for a link that passes only `role`, so identity stays consistent instead of defaulting to Platform Admin.
export function identityForRole(role: string): RoleIdentity {
  return ROLE_IDENTITIES[role] ?? ROLE_IDENTITIES.admin;
}
