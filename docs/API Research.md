# 42 API Research Documentation

42 Intra API is a RESTful API.  
It uses Oauth2 for authentication and authorization.

Unfortunately, the API documentation lacks a lot of details.  
It also tends to be inconsistent.

## Endpoints

### `oauth`

The first endpoint to call is the `oauth` endpoint.

It is a `POST` request that returns an access token, which is used later as a Bearer token in the `Authorization` header for all other requests.

### `projects_users`

Endpoint that allows to acquire a list of projects and teams.

It mainly returns information about the project, like its name, and basic information about the team, like its name and members. Unfortunately, it does not return full information about the team members, which necessitates additional calls to the `users` endpoint.

It's used for the `projects` module.

### `locations`

This endpoint allows to acquire information about current and historical locations of a user.

It allows to acquire information about currently active users and their logtimes.

It returns information about a location (a computer in Clusters), logtime, and the user that was logged in at that time. Additionally, the data about user is detailed therefore reducing the need to call the `users` endpoint.

It is used for the `leaderbords` & `clusters` modules.

### `events`

This simple endpoint can be used to acquire information about events that happened in the system.

It is the backbone of the `events` module.

### `blocs` / `coalitions`

Blocs are special containers for coalitions.  
Basically a bloc holds all coalitions that are part of a specific tournament.

Therefore the `blocs` and `coalitions` are used together to acquire information about tournaments and their coalitions.

The endpoints don't return much information, but the basic stuff (like current score, name and color) are enough for the `coalitions` module.

### `users`

This endpoint returns full information about a given user. It is not used as a sole endpoint, but rather as a helper endpoint to acquire additional information whenever the other endpoints return only partial information about a user.

## Rate limit awareness/ Refresh strategy

The API has a rate limit of `1200` requests per hours and `2` requests per second. While the general rate limit is not a problem, the per-second limit can be a problem when trying to acquire a lot of data in a short time (i.e. when refreshing the dashboard).

This forced us to implement a queue based system to handle the API requests. Instead of sending all requests at once, we send them in batches of `2` requests per second. This allows us to stay within the rate limit and avoid getting blocked by the API.  
The queue system works on a basic loop, sending one request every `500ms`. The loop is stopped when the queue is empty and restarted when new requests are added to the queue.  
The queue system uses basic JS `Array` as a FIFO queue. It is also promise based, whenever a request is added to the queue, a promise is returned that resolves when the request is completed.

### Refresh strategy

The system doesn't refresh itself automatically. It only fetches data during the initial load or page refresh. This is done to avoid unnecessary API calls and to stay within the rate limit.

To update the data a simple browser refresh is enough. The system will fetch the data again and update the dashboard.

## Data quirks

The API request can return some fields as `null` for example `user` in `locations`. The possibility of that happening is assessed and checks that either ignore or do a specific action in such cases are implemented.

There is no possibility to filter users in `locations` API requests in a way that would return all sessions that started today and sessions from yesterday that are still ongoing, adding a need to filter for that manually.

There is a page[size] limit of `100` making a need for multiple calls for biger datasets. It is implemented using `apiPagedRequest<T>(path: string,params: Record<string, string> = {}): Promise<Array<T> | ErrorResponse>`, that returnes all pages from the requested endpoint.

## Error handling

The possible errors in the response from an API requests are checked using a `isErrorResponse(response: unknown): response is ErrorResponse` function. This function is called after each API request and when it returns `true` an error message is displayed.
