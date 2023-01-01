export type AppPermissions = "location" | "notifications"

export const AppConfig: AppConfigType  = {
    auth: {
        bioAuthentication: false,
        termsAndPolicies: false,
        forgotPassword: false,
    },
    permissions: {
        required: ["notifications"]
    }
}

interface AppConfigType {
    auth: {
        bioAuthentication: boolean;
        termsAndPolicies: boolean;
        forgotPassword: boolean;
    },
    permissions: {
        required: AppPermissions[]
    }
}