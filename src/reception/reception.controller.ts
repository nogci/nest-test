import { Controller, Post, Get, Body } from '@nestjs/common';
import { CreateReceptionDto } from './dto/create-reception.dto';
import { ReceptionService } from './reception.service';

@Controller('reception')
export class ReceptionController {

  constructor(private readonly receptionService: ReceptionService) {}

  @Post()
  create(@Body() createReceptionDto: CreateReceptionDto) {
    return this.receptionService.create1(createReceptionDto.result);
  }

  @Get()
  findAll() {
    return this.receptionService.findAll();
  }

}
