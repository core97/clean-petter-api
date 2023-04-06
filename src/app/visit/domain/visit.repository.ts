import { Visit, VisitProps } from '@visit/domain/visit.entity';
import { Repository } from '@shared/domain/types/repository';

export interface VisitRepository extends Repository<Visit, VisitProps> {}
