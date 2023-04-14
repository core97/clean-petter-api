import { VisitRepository } from '@visit/domain/visit.repository';

export default class VisitService {
  constructor(private deps: { visitRepository: VisitRepository }) {}

  async create(visit: Parameters<VisitRepository['create']>[0]) {
    const visitCreated = await this.deps.visitRepository.create(visit);
    return visitCreated;
  }

  async getOneById(id: Parameters<VisitRepository['findOneById']>[0]) {
    const visit = await this.deps.visitRepository.findOneById(id);
    return visit;
  }

  async deleteOneById(id: Parameters<VisitRepository['deleteOneById']>[0]) {
    await this.deps.visitRepository.deleteOneById(id);
  }

  async updateOneById(visit: Parameters<VisitRepository['updateOneById']>[0]) {
    const updatedVisit = await this.deps.visitRepository.updateOneById(visit);
    return updatedVisit;
  }
}
