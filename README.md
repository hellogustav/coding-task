# Gustav Enroll

Frontend application is running on port 5005, access it at http://localhost:5005/

To log in use one of the following user/pass combinations.

| User | Password |
| ---- | -------- |
| sub_vendor.owner@candidate.ly | owner!1234 |
| sub_vendor.admin@candidate.ly | admin!1234 |
| sub_vendor.member@candidate.ly | member!1234 |
| prime_vendor.owner@candidate.ly | owner!1234 |
| prime_vendor.admin@candidate.ly | admin!1234 |
| prime_vendor.member@candidate.ly | member!1234 |

## Requirements

The things you need to get things running with instructions on how to set those things up.

- [__Git__](https://git-scm.com/doc) at an up-to-date version (>= 2.13)

- [__SSH__](https://www.openssh.com/) and a [SSH key configured](https://help.github.com/articles/connecting-to-github-with-ssh/) in your GitHub account

- [__Docker-compose__](https://docs.docker.com/compose/install/) for defining and running multi-container Docker applications

## Setup

- Clone this repo
  ```bash
  git clone --branch v2 git@github.com:hellogustav/coding-task.git
  ```

- Run the infrastructure script from the project root to set up and start a local development environment
  ```bash
   docker-compose up --build
  ```

- Create and seed the database. Ensure infrastructure is running prior to this.
  ```bash
  docker exec coding-task-backend-1 mix ecto.setup
  ```

- Run backend tests
  ```bash
  docker exec coding-task-backend-1 mix test
  ```
