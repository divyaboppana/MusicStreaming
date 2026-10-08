# Wavelength — Music Streaming Frontend

React + TypeScript + Redux Toolkit + MUI frontend for the ASP.NET Core Music Streaming API.

## Stack
- React 18 + TypeScript (Vite)
- Redux Toolkit (`createSlice` / `createAsyncThunk`) — no extra state library
- MUI (styled components kept in separate `*.styles.ts` files, no inline CSS soup)
- Axios, with the JWT token attached automatically from `localStorage`
- React Router v6

No `localStorage` is used for *data caching* — only the logged-in user's token/profile is
persisted there (that's the standard, safe way to keep someone logged in across a refresh).
Everything else (catalog, playlists) is fetched fresh from the API into Redux state.

## 1. Configure the API URL

Edit `.env`:

```
VITE_API_BASE_URL=http://localhost:5057/api
```

This must match the `applicationUrl` your backend is actually running on
(check `Properties/launchSettings.json` in the API project — the `http` profile
uses `5057`, the `https` profile uses `7062`).

## 2. Install & run

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173`. Make sure the backend's CORS policy allows this
origin (the provided `Program.cs` already uses `AllowAnyOrigin()`, so nothing to change there).

## 3. Login

- Register a new account from `/register` — it always gets the `User` role (this matches
  `RegisterRequestDto`, which has no role field).
- To test the **Admin** flows (Add Artist / Add Album / Add Song), promote a user directly
  in the database, e.g.:
  ```sql
  update Users set RoleName = 'Admin' where UserId = <your id>
  ```
  then log out and log back in so the new role is baked into the JWT.

## What each role sees

| | User | Admin |
|---|---|---|
| Browse / Search / view artists & albums | ✅ | ✅ |
| Create / rename / delete their own playlists, add/remove songs | ✅ | ✅ |
| Add Artist / Add Album / Add Song (sidebar section) | 🚫 | ✅ |

There's no edit/delete for artists, albums or songs on purpose — the spec only calls for
**add** on the catalog side; playlists are the only full-CRUD resource.

## Folder structure

```
src/
  api/          axios client + one file per resource (matches the controllers 1:1)
  app/          redux store + typed hooks
  features/     redux slices (auth, artists, albums, songs, playlists, ui)
  components/   reusable UI (layout, cards, song rows, modals, loading/empty states)
  pages/        one file per route/screen
  styles/       MUI theme + design tokens, kept out of the components themselves
  types/        TypeScript interfaces mirroring the backend DTOs exactly
  utils/        small pure helpers (duration formatting, genre lookup)
```

## Notes on the backend contract (so nothing feels "magic")

- `GET /api/songs` doesn't return `artistId`/`albumId`/`genreId` (only the *names*) — this is how
  `SongRepository.GetAsync` actually maps `SP_Songs_Get`'s output, so the Search page only ever
  displays names, never links off the song row.
- `GET /api/albums` (the list) doesn't include the artist name — `SP_Albums_Get`'s "all" branch
  selects it, but it's dropped by Dapper because `AlbumDto` has no `ArtistName` property. The
  Home page album grid shows title/year/cover only, to match what the API actually returns.
- There's no `GET /api/genres` — the 5 genres are hardcoded in `src/types/index.ts` to match the
  seeded `Genres` table (`Pop`, `Rock`, `HipHop`, `Electronic`, `Classical`).
- Playlist detail songs (`GET /api/playlists/{id}`) come back without a duration (the SP only
  selects `SongId`/`Title`/`ArtistName`/`AlbumName` for that branch), so those rows show `--:--`.
