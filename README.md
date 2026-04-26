# Expo Router

## Architecture
<img width="1954" height="860" alt="expo-arch" src="https://github.com/user-attachments/assets/b64bffed-47d6-4841-a0f9-ee75d93bb85d" />

## How works
When comparing the setup experience of these two tools, the Developer Experience (DX) of the Expo Router is much easier, since it comes by default when creating a project using SDK 54. A file is added to the app directory, the file automatically becomes a route in your navigation.
All screens will be added to the `src/app` directory, rather than having to create a config file and import it as is done in React Navigation.

## Dynamic routes — `src/app/users`

This folder demonstrates **dynamic routes** in Expo Router using file-based conventions. Every file inside `src/app/` becomes a route; brackets in the filename (`[param].tsx`) mark a dynamic segment.

### Structure

```
src/app/users/
├── _layout.tsx   → Stack navigator for the /users group
├── index.tsx     → /users route         (list)
└── [id].tsx      → /users/:id route     (detail — dynamic segment)
```

### How it works

#### 1. `_layout.tsx` — groups the screens into a Stack

Defines that `/users` and `/users/:id` share a `Stack` navigator. Each `Stack.Screen` references a sibling file via its `name`.

#### 2. `index.tsx` — static `/users` route

Renders the list. Navigation to the detail screen is done with `<Link href={`/users/${item.id}`}>`, interpolating the `id` into the URL.

#### 3. `[id].tsx` — dynamic `/users/:id` route

The bracketed filename (`[id]`) creates the `id` parameter. Inside the component, it is read with:

```tsx
import { useLocalSearchParams } from 'expo-router';

const { id } = useLocalSearchParams<{ id: string }>();
```

Any value that appears at that URL position (`/users/1`, `/users/42`, `/users/abc`) hits this same file, with the value available in `id`.

### Navigation flow

1. User visits `/users` → `index.tsx` lists the users.
2. Taps an item → `Link` navigates to `/users/${item.id}`.
3. Expo Router matches the URL against `[id].tsx` and injects the parameter.
4. `useLocalSearchParams` retrieves the `id` and the screen fetches/renders the user.

### Related conventions

- `[param].tsx` — required dynamic segment.
- `[...param].tsx` — catch-all (multiple segments).
- `[[param]].tsx` — optional dynamic segment.
- `_layout.tsx` — layout shared by sibling routes (not a route itself).
- `index.tsx` — root route of the directory.
