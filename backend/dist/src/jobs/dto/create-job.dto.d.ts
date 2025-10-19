export declare class CreateJobDto {
    enterpriseId: string;
    title: string;
    description: string;
    requirements?: string;
    salaryMin?: number;
    salaryMax?: number;
    workConditions?: string;
    location: string;
    isActive?: boolean;
}
