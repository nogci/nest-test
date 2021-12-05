import { Controller, Post, Get, Body, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { CreateReceptionDto } from './dto/create-reception.dto';
import { ReceptionService } from './reception.service';
import { Reception } from 'src/entities/reception.entity';

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

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  one(@Param('id') id: number): Promise<Reception> {
    return this.receptionService.one(id);
  }

  @Post(':id')
  async update(@Param('id') id: string, @Body() requestParam: {result:string}) {
    console.log(requestParam);
    const data: Partial<Reception> = {result: requestParam.result};
    return await this.receptionService.update(+id, data);
  }

}
