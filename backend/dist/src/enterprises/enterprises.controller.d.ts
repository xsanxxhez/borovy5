import { EnterprisesService } from './enterprises.service';
import { CreateEnterpriseDto } from './dto/create-enterprise.dto';
import { UpdateEnterpriseDto } from './dto/update-enterprise.dto';
export declare class EnterprisesController {
    private enterprisesService;
    constructor(enterprisesService: EnterprisesService);
    create(dto: CreateEnterpriseDto): Promise<{
        id: string;
        name: string;
        description: string | null;
        location: string;
        contactInfo: import("@prisma/client/runtime/library").JsonValue;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<({
        _count: {
            jobs: number;
        };
    } & {
        id: string;
        name: string;
        description: string | null;
        location: string;
        contactInfo: import("@prisma/client/runtime/library").JsonValue;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    findOne(id: string): Promise<{
        jobs: ({
            _count: {
                applications: number;
            };
        } & {
            id: string;
            description: string;
            location: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            enterpriseId: string;
            title: string;
            requirements: string;
            salaryMin: number | null;
            salaryMax: number | null;
            workConditions: string | null;
        })[];
    } & {
        id: string;
        name: string;
        description: string | null;
        location: string;
        contactInfo: import("@prisma/client/runtime/library").JsonValue;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, dto: UpdateEnterpriseDto): Promise<{
        id: string;
        name: string;
        description: string | null;
        location: string;
        contactInfo: import("@prisma/client/runtime/library").JsonValue;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        id: string;
        name: string;
        description: string | null;
        location: string;
        contactInfo: import("@prisma/client/runtime/library").JsonValue;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    toggleActive(id: string): Promise<{
        id: string;
        name: string;
        description: string | null;
        location: string;
        contactInfo: import("@prisma/client/runtime/library").JsonValue;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
