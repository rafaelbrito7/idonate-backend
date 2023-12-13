import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AppError } from '../errors';

@Injectable()
export class AtGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    return super.canActivate(context);
  }

  handleRequest(err, user, info: Error) {
    // Check if error is due to JWT expiration
    if (info && info.name === 'TokenExpiredError') {
      throw new AppError('JWT expired', 401);
    }

    // Handle other errors or successful authentication
    if (err || !user) {
      throw err || new AppError('Unauthorized', 401);
    }
    return user;
  }
}
