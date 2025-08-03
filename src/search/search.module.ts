import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { SearchResult } from './search.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SearchResult])],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
