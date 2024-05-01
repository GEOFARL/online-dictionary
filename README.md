# Online Dictionary

## About the project

Find the words and learn together.

The project aims to help you find unknown words, their definitions and pronunciations. You will be able to save them for future in your profile.

## DB Schema

```mermaid
erDiagram
    USER ||--o{ WORD-VIEW : views
    WORD ||--o{ WORD-VIEW : viewed
    USER ||--o{ FAVORITE-WORDS : "favorites"
    WORD ||--o{ FAVORITE-WORDS : "favorited by"
    USER {
        int id PK "Primary Key"
        string email "Unique, Not Null"
        string fullName "Not Null"
        string password "Not Null"
        datetime createdAt "Default CURRENT_TIMESTAMP, Not Null"
        datetime updatedAt "Default CURRENT_TIMESTAMP, Not Null"
    }
    WORD {
        int id PK "Primary Key"
        string word "Not Null"
        string partOfSpeech
        boolean isWordOfTheDay "Default FALSE"
        datetime createdAt "Default CURRENT_TIMESTAMP, Not Null"
        datetime updatedAt "Default CURRENT_TIMESTAMP, Not Null"
    }
    WORD-VIEW {
        int id PK "Primary Key"
        int userId FK "Foreign Key, Not Null, References USER.id"
        int wordId FK "Foreign Key, Not Null, References WORD.id"
        int count "Default 1"
        datetime createdAt "Default CURRENT_TIMESTAMP, Not Null"
        datetime updatedAt "Default CURRENT_TIMESTAMP, Not Null"
    }
    FAVORITE-WORDS {
        int userId FK "Foreign Key, Not Null, References USER.id"
        int wordId FK "Foreign Key, Not Null, References WORD.id"
        datetime createdAt "Default CURRENT_TIMESTAMP, Not Null"
        datetime updatedAt "Default CURRENT_TIMESTAMP, Not Null"
    }

```

## Run locally

1. Create and fill all `.env` files, use `.env.example` for reference.
2. Create the database and run the migrations by `npm run migrate:up`
3. Install dependencies: `npm install`
4. Install pre-commit hooks: `npx simple-git-hooks`. This hook is used to verify code style on commit.
5. Build an app: `npm run build`.
6. Start an app: `npm run start`.

Or instead of building a project you can run it in the dev mode: `npm run start:dev`

## Contributing guide

### Pull Request Flow

```
<type>: <ticket-title> <project-prefix>-<issue-number>
```

For the full list of types check [Conventional Commits](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional)

Examples:

- `feat: add search field od-12`

### Branch Flow

```
<issue-number>-<type>-<short-desc>
```

Examples:

- `12-feat-add-search-field`
- `34-fix-user-profile`

### Commit Flow

We use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0) to handle commit messages

```
<type>: <description> <project-prefix>-<issue-number>
```

Examples:

- `feat: update word display od-54`
- `fix: make button text to be bold od-13`
