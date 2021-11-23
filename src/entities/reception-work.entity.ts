import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity("m_reception_work")
export class ReceptionWork extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  /** 新規登録日時 */
  @CreateDateColumn({ name: 'created_at', type: 'timestamp', precision: 0 })
  readonly createdAt: Date;
  
  /** 最終更新日時 */
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', precision: 0 })
  readonly updatedAt: Date;

  // constructor(name: string, description: string) {
  //   super();
  //   this.name = name;
  //   this.description = description;
  // }
}
