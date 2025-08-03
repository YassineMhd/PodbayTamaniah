import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('search_results')
export class SearchResult {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'track_id', type: 'bigint', unique: true })
  trackId: number;

  @Column({ name: 'track_name' })
  trackName: string;

  @Column({ name: 'artist_name', nullable: true })
  artistName: string;

  @Column({ name: 'collection_name', nullable: true })
  collectionName: string;

  @Column({ name: 'primary_genre_name', nullable: true })
  primaryGenreName: string;

  @Column({ name: 'artwork_url_100', nullable: true })
  artworkUrl100: string;

  @Column({ name: 'feed_url', nullable: true })
  feedUrl: string;

  @Column({ name: 'search_term' })
  searchTerm: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'kind', nullable: true })
  kind: string;

  @Column({ name: 'wrapper_type', nullable: true })
  wrapperType: string;
}
