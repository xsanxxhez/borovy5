import { ApplicationsService } from './applications.service';
import { ApplyJobDto } from './dto/apply-job.dto';
import { UpdateApplicationStatusDto } from './dto/update-application-status.dto';
export declare class ApplicationsController {
    private applicationsService;
    constructor(applicationsService: ApplicationsService);
    apply(user: any, dto: ApplyJobDto): Promise<{
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
    getMyApplications(user: any): Promise<({
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
    approve(id: string, dto: UpdateApplicationStatusDto): Promise<{
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
}
