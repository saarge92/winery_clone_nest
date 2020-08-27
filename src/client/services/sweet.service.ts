import { SweetDto } from '../dto/sweet.dto';
import { Sweet } from '../../entities/sweet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/index';
import { ISweetService } from '../intefaces/sweet_service.interface';
import { ConflictException } from '@nestjs/common';

/**
 * Service of sweets business logic
 * @author Serdar Durdyev
 */
export class SweetService implements ISweetService {
  constructor(@InjectRepository(Sweet) private readonly sweetRepository: Repository<Sweet>) {
  }

  /**
   * Create "sweet" record
   * @param sweetDto Data transfer object about new "sweet" record
   * @return {Promise<Sweet>} Returns asynchronously Sweet record
   */
  public async createSweet(sweetDto: SweetDto): Promise<Sweet> {
    const sweet = new Sweet();
    sweet.name = sweetDto.name;
    await this.sweetRepository.save(sweet);
    return sweet;
  }

  /**
   * Update asynchronously existed sweet record
   * @param id Id of editing sweet in our system
   * @param sweetDto Data transfer object about updating object
   */
  public async updateSweet(id: string, sweetDto: SweetDto): Promise<Sweet> {
    const sweet = await this.sweetRepository.findOne(id);
    if (!sweet)
      throw new ConflictException('Запись с таким не найдена');
    sweet.name = sweetDto.name;
    await this.sweetRepository.save(sweet);
    return sweet;
  }

  /**
   * Get info about sweet by id
   * @param id Id of requested
   */
  public async getSweetById(id: string): Promise<Sweet> {
    return await this.sweetRepository.findOne(id);
  }

  /**
   * Get list of sweets of vines in our system
   * @returns {Promise<Array<Sweet>>>} Returns array of sweets
   */
  public async getSweetList(): Promise<Array<Sweet>> {
    return await this.sweetRepository.find();
  }

  /**
   * Delete record about sweet from database
   * @param id Id of deleting sweet record
   */
  public async deleteSweetById(id: string) {
    const sweet = await this.sweetRepository.findOne(id);
    if (!sweet)
      throw new ConflictException('Запись с таким id не найдена');
    await this.sweetRepository.softDelete(id);
  }
}