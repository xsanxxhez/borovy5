"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePromoCodeDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreatePromoCodeDto {
}
exports.CreatePromoCodeDto = CreatePromoCodeDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Уникальный код промокода',
        example: 'SUMMER2024',
        minLength: 3,
        maxLength: 20
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3, { message: 'Код промокода должен содержать минимум 3 символа' }),
    (0, class_validator_1.MaxLength)(20, { message: 'Код промокода не должен превышать 20 символов' }),
    (0, class_validator_1.Matches)(/^[A-Z0-9_]+$/, {
        message: 'Код промокода может содержать только заглавные буквы, цифры и символ подчеркивания'
    }),
    __metadata("design:type", String)
], CreatePromoCodeDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Описание промокода',
        example: 'Промокод для летней акции 2024',
        maxLength: 255
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(255, { message: 'Описание не должно превышать 255 символов' }),
    __metadata("design:type", String)
], CreatePromoCodeDto.prototype, "description", void 0);
//# sourceMappingURL=create-promo-code.dto.js.map