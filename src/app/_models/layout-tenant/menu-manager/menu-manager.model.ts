export interface MenuManager {
    id: string;
    icon: string;
    code: string;
    name: string;
    menuType: number;
    url: string;
    subMenu: any[];
    status: number;
}