import { VisitRepository } from '@visit/domain/visit.repository';

export default class VisitService {
  private visitRepository!: VisitRepository;

  constructor(dependencies: { visitRepository: VisitRepository }) {
    Object.assign(this, dependencies);
  }

  async create(visit: Parameters<VisitRepository['create']>[0]) {
    const visitCreated = await this.visitRepository.create(visit);
    return visitCreated;
  }

  async getOneById(id: Parameters<VisitRepository['findOneById']>[0]) {
    const visit = await this.visitRepository.findOneById(id);
    return visit;
  }

  async deleteOneById(id: Parameters<VisitRepository['deleteOneById']>[0]) {
    await this.visitRepository.deleteOneById(id);
  }

  async updateOneById(visit: Parameters<VisitRepository['updateOneById']>[0]) {
    const updatedVisit = await this.visitRepository.updateOneById(visit);
    return updatedVisit;
  }
}
