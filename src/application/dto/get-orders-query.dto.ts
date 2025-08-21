import { IsOptional, IsString, IsNumber, IsIn } from 'class-validator';
import { Transform } from 'class-transformer';

export default class GetOrdersQueryDto {
    @IsOptional()
    @IsString()
    marketplace?: string;

    @IsOptional()
    @IsString()
    status?: string;

    @IsOptional()
    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    storeId?: number;

    @IsOptional()
    @IsIn(['asc', 'desc'])
    sort?: 'asc' | 'desc';

    @IsOptional()
    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    limit?: number;

    @IsOptional()
    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    offset?: number;
}

