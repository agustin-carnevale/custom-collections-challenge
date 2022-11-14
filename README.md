# Custom Collections Challenge

## Task

[See assignment](README_TASK.md)

## Instructions

### Development/Local Environment

1. Clone this repo
2. `cd` into project's dir
3. Run `yarn install`
4. Run `yarn start`

## Decisions and Notes

I used `Typescript` to ensure types and make it more realistic (as if it was a real project and not just an exercise).

### Folders structure

For this challenge, I decided to face it as a small project but with good practices. For this reason, I chose a clear and intuitive, folder/files structure, that would allow the project to scale, but without going with a more strictly strutured organization like Clean/Hexagonal arquitecture, etc.

### State Management

For state management, as it was a pretty small app, I only used the `Context API` which is a part of React (didn't install any additional libraries for this purpose). If the project grows, you could easily add redux (or other robust state management library).

### Persistency

In order to persist locally the collections created by the user I made use of `LocalStorage`.

### Data Fetching

For data fetching I used `SWR`, which makes it really easy to handle pagination and also has many benefits, like caching requests, etc.

### Pagination

I implemented pagination for both the list of collections in the dropdown and also for the list of NFTs retrieved for a certain collection (as they can both be very large).

### Features and Styling

I only implemented the required features. I used `react-beautiful-dnd` to implement the drag and drop functionality. I didn't pay too much attention to styles or visual details.
I made it fairly responsive but there is still a lot to improve, and it is not meant for mobile.

### Other clarifications

I managed the deletion and editing of the custom collections, just selecting by the index, in a more realistic context, the collections should have a unique id to handle them.

As this was just an exercise I created the project with create-react-app and didn't bother to setup webpack or other bundler manually myself. For a more realistic production project, I would also setup things like: prettier, eslint and husky.

## Contact

If any doubts or questions please feel free to contact me at: agustinc.jobs@gmail.com
