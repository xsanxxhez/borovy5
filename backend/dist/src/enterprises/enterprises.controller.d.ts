import { EnterprisesService } from './enterprises.service';
import { CreateEnterpriseDto } from './dto/create-enterprise.dto';
import { UpdateEnterpriseDto } from './dto/update-enterprise.dto';
export declare class EnterprisesController {
    private enterprisesService;
    constructor(enterprisesService: EnterprisesService);
    create(dto: CreateEnterpriseDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        isActive: boolean;
        location: string;
        contactInfo: import("@prisma/client/runtime/library").JsonValue;
    }>;
    findAll(): Promise<({
        _count: {
            jobs: number;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        isActive: boolean;
        location: string;
        contactInfo: import("@prisma/client/runtime/library").JsonValue;
    })[]>;
    findOne(id: string): Promise<{
        jobs: ({
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
            requirements: string;
            salaryMin: number | null;
            salaryMax: number | null;
            workConditions: string | null;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        isActive: boolean;
        location: string;
        contactInfo: import("@prisma/client/runtime/library").JsonValue;
    }>;
    update(id: string, dto: UpdateEnterpriseDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        isActive: boolean;
        location: string;
        contactInfo: import("@prisma/client/runtime/library").JsonValue;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        isActive: boolean;
        location: string;
        contactInfo: import("@prisma/client/runtime/library").JsonValue;
    }>;
    toggleActive(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        isActive: boolean;
        location: string;
        contactInfo: import("@prisma/client/runtime/library").JsonValue;
    }>;
}
