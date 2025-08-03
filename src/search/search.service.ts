import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import axios from 'axios';
import { SearchResult } from './search.entity';
import { SearchDto } from './search.dto';
import { GroupedSearchResponseDto } from './grouped-search-response.dto';

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(SearchResult)
    private readonly searchRepository: Repository<SearchResult>,
  ) {}

  async search(searchDto: SearchDto): Promise<GroupedSearchResponseDto> {
    const { term } = searchDto;
    console.log('Searching for term:', term);
    
    // 1. Call iTunes Search API with enhanced parameters
    const response = await axios.get('https://itunes.apple.com/search', {
      params: {
        term,
        media: 'all',
        explicit: 'Yes'
      },
    });

    const results = response.data.results;
    const savedResults: SearchResult[] = [];

    // 2. Store results in database
    for (const item of results) {
      try {
        // Check if already exists
        const existing = await this.searchRepository.findOne({
          where: { trackId: item.trackId },
        });

        if (!existing) {
          const searchResult = this.searchRepository.create({
            trackId: item.trackId,
            trackName: item.trackName,
            artistName: item.artistName,
            collectionName: item.collectionName,
            artworkUrl100: item.artworkUrl100,
            feedUrl: item.feedUrl,
            searchTerm: term,
            kind: item.kind,
            wrapperType: item.wrapperType,
            primaryGenreName: item.primaryGenreName,
          });

          const saved = await this.searchRepository.save(searchResult);
          savedResults.push(saved);
        } else {
          savedResults.push(existing);
        }
      } catch (error) {
        // Continue with other results if one fails
        console.error('Error saving result:', error);
      }
    }

    // 3. Group results by type
    const groupedResults = this.groupResultsByType(savedResults);
        
    return groupedResults;
  }

  private groupResultsByType(results: SearchResult[]): GroupedSearchResponseDto {
    const grouped: GroupedSearchResponseDto = {
      podcasts: [],
      movies: [],
      others: [],
      totalResults: results.length
    };

    results.forEach(item => {
      const kind = item.kind || '';
      const wrapperType = item.wrapperType || '';
      const genre = item.primaryGenreName || '';
      
      // Group podcasts
      if (kind === 'podcast' || wrapperType === 'podcast') {
        grouped.podcasts.push(item);
      }
      // Group movies and TV shows
      else if (
        kind === 'feature-movie' || 
        kind === 'tv-episode' ||
        kind === 'movie' ||
        wrapperType === 'movie' || 
        wrapperType === 'tv-episode' ||
        genre === 'Movies' || 
        genre === 'TV Shows' ||
        genre === 'Drama' ||
        genre === 'Comedy' ||
        genre === 'Action & Adventure'
      ) {
        grouped.movies.push(item);
      }
      // Everything else (music, audiobooks, apps, etc.)
      else {
        grouped.others.push(item);
      }
    });

    return grouped;
  }
}
