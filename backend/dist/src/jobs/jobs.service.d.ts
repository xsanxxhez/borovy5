import { PrismaService } from '../prisma/prisma.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
export declare class JobsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateJobDto): Promise<{
        enterprise: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string | null;
            isActive: boolean;
            location: string;
            contactInfo: import("@prisma/client/runtime/library").JsonValue | null;
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
    }>;
    findAll(): Promise<({
        enterprise: {
            name: string;
            location: string;
        };
        _count: {
            applications: number;
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
    })[]>;
    findAllForAdmin(): Promise<({
        enterprise: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string | null;
            isActive: boolean;
            location: string;
            contactInfo: import("@prisma/client/runtime/library").JsonValue | null;
        };
        _count: {
            applications: number;
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
    })[]>;
    findOne(id: string): Promise<{
        applications: ({
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
        })[];
        enterprise: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string | null;
            isActive: boolean;
            location: string;
            contactInfo: import("@prisma/client/runtime/library").JsonValue | null;
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
    }>;
    findByEnterprise(enterpriseId: string): Promise<({
        _count: {
            applications: number;
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
    })[]>;
    update(id: string, dto: UpdateJobDto): Promise<{
        enterprise: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string | null;
            isActive: boolean;
            location: string;
            contactInfo: import("@prisma/client/runtime/library").JsonValue | null;
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
    }>;
    remove(id: string): Promise<{
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
    }>;
    toggleActive(id: string): Promise<{
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
    }>;
}
