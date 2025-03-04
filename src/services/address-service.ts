import { Address } from '../entities';
import { AppDataSource } from '../data-source';

export class AddressService {
  private addressRepo = AppDataSource.getRepository(Address);

  public async getAddress(userId: string) {
    return await this.addressRepo.findOne({ where: { user: { id: userId } } });
  }

  public async createAddress(userId: string, addressData: Partial<Address>) {
    const address = this.addressRepo.create({
      ...addressData,
      user: { id: userId },
    });
    return await this.addressRepo.save(address);
  }

  public async updateAddress(userId: string, addressData: Partial<Address>) {
    const address = await this.addressRepo.findOne({
      where: { user: { id: userId } },
    });
    if (!address) throw new Error('Address not found');
    Object.assign(address, addressData);
    return await this.addressRepo.save(address);
  }
}
