const legacyRoleAliases = {
    employee: "jobseeker",
};

export function normalizeRole(role) {
    if (typeof role !== "string") return role;

    const normalizedValue = role.trim().toLowerCase();
    return legacyRoleAliases[normalizedValue] || normalizedValue;
}

export function formatRole(role) {
    const normalizedRole = normalizeRole(role);
    const labels = {
        admin: "Admin",
        jobseeker: "Job Seeker",
        recruiter: "Recruiter",
        employer: "Employer",
    };

    return labels[normalizedRole] || normalizedRole || "Unknown";
}
