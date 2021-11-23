import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ReceptionWork } from './reception-work.entity';

@Entity("t_reception")
export class Reception extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ReceptionWork, work => work.id)
  @JoinColumn({ name: "reception_work_id" })
  work: ReceptionWork;

  @Column('text')
  result: string;

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
