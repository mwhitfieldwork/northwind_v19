export interface Employee {
    employeeId: number;
    firstName: string;
    lastName: string;
    title: string;
    titleOfCourtesy?: string;
    birthDate?: Date;
    hireDate?: Date;
    address?: string;
    city: string;
    region?: string;
    postalCode?: string;
    country?: string;
    homePhone?: string;
    extension?: string;
    notes?: string;
    reportsTo?: string;
    photo?: string;
    isDeleted?: boolean
}