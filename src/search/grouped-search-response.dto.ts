import { SearchResult } from './search.entity';

export class GroupedSearchResponseDto {
  podcasts: SearchResult[];
  movies: SearchResult[];
  others: SearchResult[];
  totalResults: number;
}

export interface SearchStats {
  podcastCount: number;
  movieCount: number;
  otherCount: number;
  totalCount: number;
}
