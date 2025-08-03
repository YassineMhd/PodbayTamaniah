# PodbayThmanyah
Assignement

# iTunes Search API - Professional NestJS Implementation

A REST API built with NestJS that integrates with the iTunes Search API to search for podcasts and other media. This implementation provides a clean, straightforward solution for searching and storing iTunes results.

## 🚀 Features

✅ **NestJS Framework** with TypeScript  
✅ **iTunes Search API Integration** for media discovery  
✅ **SQLite Database** with TypeORM for data persistence  
✅ **Input Validation** with class-validator DTOs  
✅ **Search Result Storage** with duplicate prevention  
✅ **Environment Configuration** support

## 📁 Project Structure

```
src/
├── main.ts                           # Application entry point
├── app.module.ts                     # Root module configuration
└── search/                           # Search functionality module
    ├── search.controller.ts          # REST API endpoints
    ├── search.service.ts             # Business logic & iTunes API calls
    ├── search.entity.ts              # Database entity definition
    ├── search.dto.ts                 # Data transfer objects
    ├── search.module.ts              # Module configuration
    └── grouped-search-response.dto.ts # Response formatting
```

## 🛠️ Setup & Installation

### Prerequisites
- Node.js 16.0+ 
- No database setup required (uses SQLite)

### 1. Project Setup
```bash
# Extract the zip file to your desired directory
# Navigate to the project directory
cd iTunesSearch

# Install dependencies
npm install

# Build the project
npm run build
```

### 2. Environment Configuration (Optional)
Create `.env` file in the root directory:
```env
# Application Configuration
PORT=8000
NODE_ENV=development

# iTunes API Configuration
ITUNES_API_BASE_URL=https://itunes.apple.com
```

### 3. Database
The application uses SQLite with an automatically created `itunes_search.db` file. No manual database setup required.

## 🚀 Running the Application

```bash
# Development mode with hot reload
npm run start:dev

# Production build
npm run build
npm run start:prod
```

The application will start on `http://localhost:8000` by default.

## 📚 API Usage

### Main Endpoint

**Search iTunes**: `POST /search`

**Response**: Array of search results from iTunes API, stored in the database
```json
[
  {
    "id": "uuid-string",
    "trackId": 123456789,
    "trackName": "JavaScript Weekly",
    "artistName": "JS Community", 
    "collectionName": "Tech Podcasts",
    "primaryGenreName": "Technology",
    "artworkUrl100": "https://example.com/artwork.jpg",
    "feedUrl": "https://example.com/feed.xml",
    "searchTerm": "javascript",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

## 🏗️ How It Works

### Core Functionality
1. **iTunes Search**: Accepts search terms and queries the iTunes Search API
2. **Data Storage**: Stores search results in SQLite database (prevents duplicates)
3. **Result Retrieval**: Returns stored results from database
4. **Input Validation**: Validates request data using DTOs

### Database Schema

**Search Results Table**:
```sql
CREATE TABLE search_results (
    id TEXT PRIMARY KEY,
    track_id BIGINT UNIQUE,
    track_name TEXT,
    artist_name TEXT,
    collection_name TEXT,
    primary_genre_name TEXT,
    artwork_url_100 TEXT,
    feed_url TEXT,
    search_term TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    kind TEXT,
    wrapper_type TEXT
);
```

### Key Technologies
- **Framework**: NestJS 10 with TypeScript
- **Database**: SQLite with TypeORM
- **HTTP Client**: Axios for iTunes API calls
- **Validation**: class-validator & class-transformer

## 🔧 Development

### Available Scripts
```bash
# Build the application
npm run build

# Start in development mode
npm run start:dev

# Start in production mode
npm run start:prod
```

### Project Dependencies
- **@nestjs/core**: NestJS framework core
- **@nestjs/typeorm**: TypeORM integration
- **sqlite3**: SQLite database driver
- **axios**: HTTP client for iTunes API
- **class-validator**: Input validation
- **class-transformer**: Object transformation

---

**Built with NestJS, TypeScript, and SQLite**
