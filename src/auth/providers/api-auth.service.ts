import { BadRequestException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import { AuthProvider } from '../auth.provider';
import { User } from '../entities/user';
import { HealthStatus } from 'src/health/enums/health-status.enum';
import { Role } from '../enums/role.enum';

@Injectable()
export class ApiAuthService implements AuthProvider {
  private endpoint = 'https://api-web-x0ca.onrender.com';

  constructor(private readonly http: HttpService) {}

  async validate(token: string): Promise<User> {
    const response = await fetch(this.endpoint + '/api/auth/validar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });

    if (!response.ok) throw new BadRequestException();

    const json = (await response.json()) as ValidateResponse;

    const user = new User();

    user.id = json.usuarioId.toString();
    user.email = json.email;
    user.name = json.nome;
    user.role = json.perfil == 'ALUNO' ? Role.ALUNO : Role.COMISSAO;

    return user;
  }

  async health(): Promise<HealthStatus> {
    const response = await fetch(this.endpoint, {
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.status === 401) return HealthStatus.OK;

    return HealthStatus.DOWN;
  }
}

type ValidateResponse = {
  valido: boolean;
  usuarioId: number;
  nome: string;
  email: string;
  perfil: string;
  status: string;
};
