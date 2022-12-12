export interface PackageMenuManager {
    id: string;
    code: string;
    name: string;
    layouts: number;
    children?: any[];
}

export interface PackageMenuManagerOfSchool {
    id: string;
    tenantId: string;
    code: string;
    name: string;
    layouts: string[];
    children?: any[];
}

