# 42WarsawHacks 1. edition (team **jak_chcesz**)

## Running

To run the project in the development mode you can use `dev-server.sh` script. It will start the server as a docker container and expose it on port `3000`

To run the project in production mode you can use `docker compose up`.

## Project structure

Dashboard layout is implemented in `app/layout.tsx` file. All the different panels are implemented in `app/<module>` as a separate dynamic slot.

## Environment variables

Before running the project you need to set up the following environment variables:

| Variable | Description       |
|----------|-------------------|
| `UID`    | 42 API app UID    |
| `SECRET` | 42 API app SECRET |

Those should be set in `.env` file in the root of the project.

## Dependencies

The project is written in TypeScript with React. 
It runs on Next.js framework and uses TailwindCSS for styling.  
Additionally it uses `shadcn/ui` for UI components.  
The project uses *Remix Icon* library for icons.

Additionally `prettier` and `eslint` are used for code formatting and linting.

## Modules

* `clusters` - fully implemented
* `coalitions` - fully implemented
* `events` - fully implemented
* `leaderboards` - currently only partially implemented, missing some features
* `projects` - fully implemented

> [!NOTE]
> Currently the correct ordering of the modules is not implemented. The layout is a subject to change
