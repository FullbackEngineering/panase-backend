// panase-nestjs-backend/src/clients/clients.service.ts

import { Injectable, NotFoundException } from '@nestjs/common'; // 👈 NotFoundException import edildi
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './entities/client.entity';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private readonly clientsRepository: Repository<Client>,
  ) {}

  /**
   * Yeni bir hasta/danışan oluşturur
   */
  async create(createClientDto: CreateClientDto): Promise<Client> {
    const newClient = this.clientsRepository.create(createClientDto);
    return this.clientsRepository.save(newClient);
  }

  /**
   * Tüm hastaları listeler
   */
  async findAll(): Promise<Client[]> {
    return this.clientsRepository.find({
      order: {
        name: 'ASC',
      },
    });
  }

  /**
   * 🚨 DÜZELTİLMİŞ METOT
   * Tek bir hastayı ID ile bulur (Bulamazsa 404 Hata Fırlatır)
   */
  async findOne(id: string): Promise<Client> {
    const client = await this.clientsRepository.findOneBy({ id });

    if (!client) {
      // 👈 Eğer danışan 'null' ise, hata fırlat
      throw new NotFoundException(`Danışan (ID: ${id}) bulunamadı.`);
    }
    // 👈 Eğer buraya gelirse, 'client' asla 'null' değildir
    return client;
  }

  /**
   * Hasta bilgilerini günceller
   */
  async update(id: string, updateClientDto: UpdateClientDto) {
    // 👈 'findOne' metodu artık 'null' kontrolünü kendi içinde yapıyor.
    // Eğer danışan bulunamazsa, bu 'await' satırı hata fırlatacak.
    const client = await this.findOne(id);

    // 'client' objesini DTO'dan gelen yeni verilerle birleştir
    Object.assign(client, updateClientDto);

    // Güncellenmiş objeyi kaydet
    return this.clientsRepository.save(client);
  }

  /**
   * Hastayı siler
   */
  async remove(id: string) {
    // 👈 Silme işlemi de 'findOne'ı kullanarak daha güvenli hale getirilebilir
    const clientToRemove = await this.findOne(id); // Varlığını kontrol et
    return this.clientsRepository.remove(clientToRemove);
  }
}
