import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchDto } from './search.dto';
import { GroupedSearchResponseDto } from './grouped-search-response.dto';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async search(@Body() searchDto: SearchDto): Promise<GroupedSearchResponseDto> {
    return this.searchService.search(searchDto);
  }
}
