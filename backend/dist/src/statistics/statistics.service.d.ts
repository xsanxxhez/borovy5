import { PrismaService } from '../prisma/prisma.service';
export declare class StatisticsService {
    private prisma;
    constructor(prisma: PrismaService);
    getWorkerStats(userId: string): Promise<{
        totalApplications: number;
        approvedApplications: number;
        rejectedApplications: number;
        pendingApplications: number;
        doneApplications: number;
    }>;
    getManagerStats(userId: string): Promise<{
        totalPromoCodes: number;
        activePromoCodes: number;
        totalRegistrations: number;
        registrationsLastMonth: number;
        totalWorkers: number;
        workers: {
            id: string;
            fullName: string;
            email: string;
            createdAt: Date;
            totalApplications: number;
            approvedApplications: number;
        }[];
    }>;
    getAdminStats(): Promise<{
        users: {
            total: number;
            workers: number;
            managers: number;
            admins: number;
            newLastMonth: number;
        };
        enterprises: {
            total: number;
            active: number;
        };
        jobs: {
            total: number;
            active: number;
        };
        applications: {
            total: number;
            applied: number;
            approved: number;
            rejected: number;
            done: number;
            newLastMonth: number;
        };
        promoCodes: {
            total: number;
            active: number;
        };
    }>;
}
