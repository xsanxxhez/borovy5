import { PrismaService } from '../prisma/prisma.service';
export declare class ApplicationsService {
    private prisma;
    constructor(prisma: PrismaService);
    apply(userId: string, jobId: string): Promise<{
        job: {
            enterprise: {
                name: string;
                location: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            description: string;
            isActive: boolean;
            location: string;
            enterpriseId: string;
            title: string;
            requirements: string | null;
            salaryMin: number | null;
            salaryMax: number | null;
            workConditions: string | null;
        };
    } & {
        id: string;
        updatedAt: Date;
        userId: string;
        jobId: string;
        status: import(".prisma/client").$Enums.ApplicationStatus;
        appliedAt: Date;
        workEndDate: Date | null;
    }>;
    getMyApplications(userId: string): Promise<({
        job: {
            enterprise: {
                name: string;
                location: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            description: string;
            isActive: boolean;
            location: string;
            enterpriseId: string;
            title: string;
            requirements: string | null;
            salaryMin: number | null;
            salaryMax: number | null;
            workConditions: string | null;
        };
    } & {
        id: string;
        updatedAt: Date;
        userId: string;
        jobId: string;
        status: import(".prisma/client").$Enums.ApplicationStatus;
        appliedAt: Date;
        workEndDate: Date | null;
    })[]>;
    getAllApplications(): Promise<({
        user: {
            id: string;
            email: string;
            fullName: string;
            phone: string;
            avatar: string;
        };
        job: {
            enterprise: {
                name: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            description: string;
            isActive: boolean;
            location: string;
            enterpriseId: string;
            title: string;
            requirements: string | null;
            salaryMin: number | null;
            salaryMax: number | null;
            workConditions: string | null;
        };
    } & {
        id: string;
        updatedAt: Date;
        userId: string;
        jobId: string;
        status: import(".prisma/client").$Enums.ApplicationStatus;
        appliedAt: Date;
        workEndDate: Date | null;
    })[]>;
    updateStatus(id: string, status: 'APPROVED' | 'REJECTED' | 'REMOVED' | 'DONE', workEndDate?: Date): Promise<{
        user: {
            id: string;
            email: string;
            fullName: string;
        };
        job: {
            title: string;
        };
    } & {
        id: string;
        updatedAt: Date;
        userId: string;
        jobId: string;
        status: import(".prisma/client").$Enums.ApplicationStatus;
        appliedAt: Date;
        workEndDate: Date | null;
    }>;
    approve(id: string, workEndDate: Date): Promise<{
        user: {
            id: string;
            email: string;
            fullName: string;
        };
        job: {
            title: string;
        };
    } & {
        id: string;
        updatedAt: Date;
        userId: string;
        jobId: string;
        status: import(".prisma/client").$Enums.ApplicationStatus;
        appliedAt: Date;
        workEndDate: Date | null;
    }>;
    reject(id: string): Promise<{
        user: {
            id: string;
            email: string;
            fullName: string;
        };
        job: {
            title: string;
        };
    } & {
        id: string;
        updatedAt: Date;
        userId: string;
        jobId: string;
        status: import(".prisma/client").$Enums.ApplicationStatus;
        appliedAt: Date;
        workEndDate: Date | null;
    }>;
    remove(id: string): Promise<{
        user: {
            id: string;
            email: string;
            fullName: string;
        };
        job: {
            title: string;
        };
    } & {
        id: string;
        updatedAt: Date;
        userId: string;
        jobId: string;
        status: import(".prisma/client").$Enums.ApplicationStatus;
        appliedAt: Date;
        workEndDate: Date | null;
    }>;
    markAsDone(id: string): Promise<{
        user: {
            id: string;
            email: string;
            fullName: string;
        };
        job: {
            title: string;
        };
    } & {
        id: string;
        updatedAt: Date;
        userId: string;
        jobId: string;
        status: import(".prisma/client").$Enums.ApplicationStatus;
        appliedAt: Date;
        workEndDate: Date | null;
    }>;
    getApplicationsByJob(jobId: string): Promise<({
        user: {
            id: string;
            email: string;
            fullName: string;
            phone: string;
            avatar: string;
        };
    } & {
        id: string;
        updatedAt: Date;
        userId: string;
        jobId: string;
        status: import(".prisma/client").$Enums.ApplicationStatus;
        appliedAt: Date;
        workEndDate: Date | null;
    })[]>;
}
