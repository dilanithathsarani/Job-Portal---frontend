const JOB_DELETED_EVENT = "job-portal:job-deleted";
const JOB_DELETED_STORAGE_KEY = "job-portal:last-deleted-job";

export const publishJobDeleted = (jobId) => {
    const detail = { jobId, deletedAt: Date.now() };

    window.dispatchEvent(new CustomEvent(JOB_DELETED_EVENT, { detail }));
    try {
        localStorage.setItem(JOB_DELETED_STORAGE_KEY, JSON.stringify(detail));
    } catch {
        // The current tab is already synchronized when storage is unavailable.
    }
};

export const subscribeToJobDeletions = (callback) => {
    const handleLocalDeletion = (event) => callback(event.detail.jobId);
    const handleCrossTabDeletion = (event) => {
        if (event.key !== JOB_DELETED_STORAGE_KEY || !event.newValue) return;

        try {
            const { jobId } = JSON.parse(event.newValue);
            if (jobId) callback(jobId);
        } catch {
            // Ignore malformed storage values from outside this application.
        }
    };

    window.addEventListener(JOB_DELETED_EVENT, handleLocalDeletion);
    window.addEventListener("storage", handleCrossTabDeletion);

    return () => {
        window.removeEventListener(JOB_DELETED_EVENT, handleLocalDeletion);
        window.removeEventListener("storage", handleCrossTabDeletion);
    };
};
