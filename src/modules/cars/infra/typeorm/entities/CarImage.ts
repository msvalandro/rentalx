import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity('cars_image')
class CarImage {
  @PrimaryColumn()
  id: string;

  @Column({ name: 'car_id' })
  carId: string;

  @Column({ name: 'image_name' })
  imageName: string;

  @CreateDateColumn()
  createdAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}

export { CarImage };
