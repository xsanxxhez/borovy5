import { PrismaService } from '../prisma/prisma.service';
import { ApplyJobDto } from './dto/apply-job.dto';
import { UpdateApplicationStatusDto } from './dto/update-application-status.dto';
export declare class ApplicationsService {
    private prisma;
    constructor(prisma: PrismaService);
    apply(userId: string, dto: ApplyJobDto): Promise<{
        job: {
            enterprise: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                description: string | null;
                isActive: boolean;
                location: string;
                contactInfo: import("@prisma/client/runtime/library").JsonValue;
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
            requirements: string;
            salaryMin: number | null;
            salaryMax: number | null;
            workConditions: string | null;
        };
    } & {
        id: string;
        userId: string;
        jobId: string;
        status: import(".prisma/client").$Enums.ApplicationStatus;
        appliedAt: Date;
        workEndDate: Date | null;
    }>;
    getMyApplications(userId: string): Promise<({
        job: {
            enterprise: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                description: string | null;
                isActive: boolean;
                location: string;
                contactInfo: import("@prisma/client/runtime/library").JsonValue;
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
            requirements: string;
            salaryMin: number | null;
            salaryMax: number | null;
            workConditions: string | null;
        };
    } & {
        id: string;
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
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                description: string | null;
                isActive: boolean;
                location: string;
                contactInfo: import("@prisma/client/runtime/library").JsonValue;
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
            requirements: string;
            salaryMin: number | null;
            salaryMax: number | null;
            workConditions: string | null;
        };
    } & {
        id: string;
        userId: string;
        jobId: string;
        status: import(".prisma/client").$Enums.ApplicationStatus;
        appliedAt: Date;
        workEndDate: Date | null;
    })[]>;
    getApplicationsByJob(jobId: string): Promise<({
        user: {
            id: string;
            email: string;
            fullName: string;
            phone: string;
            bio: string;
            avatar: string;
        };
    } & {
        id: string;
        userId: string;
        jobId: string;
        status: import(".prisma/client").$Enums.ApplicationStatus;
        appliedAt: Date;
        workEndDate: Date | null;
    })[]>;
    approve(id: string, dto: UpdateApplicationStatusDto): Promise<{
        user: {
            id: string;
            email: string;
            password: string;
            fullName: string;
            phone: string | null;
            role: import(".prisma/client").$Enums.Role;
            bio: string | null;
            avatar: string | null;
            resetToken: string | null;
            agreedToTerms: boolean;
            agreedToPrivacy: boolean;
            createdAt: Date;
            updatedAt: Date;
        };
        job: {
            enterprise: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                description: string | null;
                isActive: boolean;
                location: string;
                contactInfo: import("@prisma/client/runtime/library").JsonValue;
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
            requirements: string;
            salaryMin: number | null;
            salaryMax: number | null;
            workConditions: string | null;
        };
    } & {
        id: string;
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
            password: string;
            fullName: string;
            phone: string | null;
            role: import(".prisma/client").$Enums.Role;
            bio: string | null;
            avatar: string | null;
            resetToken: string | null;
            agreedToTerms: boolean;
            agreedToPrivacy: boolean;
            createdAt: Date;
            updatedAt: Date;
        };
        job: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            description: string;
            isActive: boolean;
            location: string;
            enterpriseId: string;
            title: string;
            requirements: string;
            salaryMin: number | null;
            salaryMax: number | null;
            workConditions: string | null;
        };
    } & {
        id: string;
        userId: string;
        jobId: string;
        status: import(".prisma/client").$Enums.ApplicationStatus;
        appliedAt: Date;
        workEndDate: Date | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        userId: string;
        jobId: string;
        status: import(".prisma/client").$Enums.ApplicationStatus;
        appliedAt: Date;
        workEndDate: Date | null;
    }>;
    markAsDone(id: string): Promise<{
        id: string;
        userId: string;
        jobId: string;
        status: import(".prisma/client").$Enums.ApplicationStatus;
        appliedAt: Date;
        workEndDate: Date | null;
    }>;
}
