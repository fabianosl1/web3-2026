import { Injectable, UnauthorizedException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

import { AuthProvider } from '../auth.provider';
import { User } from '../entities/user';
import { Role } from '../enums/role.enum';
import { HealthStatus } from '../../health/enums/health-status.enum';

@Injectable()
export class ApiAuthService implements AuthProvider {

    constructor(
        private readonly http: HttpService,
    ) {}

    async validate(token: string): Promise<User> {

        const response = await firstValueFrom(
            this.http.post(
                'http://localhost:8081/api/auth/validar',
                { token }
            )
        );

        const data = response.data;

        if (!data.valido) {
            throw new UnauthorizedException(data.motivo);
        }

        if (data.status !== 'ATIVO') {
            throw new UnauthorizedException('Usuário desativado.');
        }

        const user = new User();

        user.id = data.usuarioId;
        user.name = data.nome;
        user.email = data.email;

        user.role =
            data.perfil === 'COMISSAO'
                ? Role.COMISSAO
                : Role.ALUNO;

        return user;
    }

    async health() {
        return HealthStatus.OK;
    }
}