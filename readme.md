# VD Site

This project allows users to bookmark and play videos. It is built with React and Koa.

![Home](https://github.com/user-attachments/assets/67d83403-03ad-4416-9756-1907da66e38e)
![Detail](https://github.com/user-attachments/assets/932d1499-441f-43df-9460-51204b178158)
![Links](https://github.com/user-attachments/assets/c67eb709-0c62-49a5-8b87-f8a65b2720a0)


## Structure

```plaintext
client/ 
server/
docker-compose.yml
.env
```

## Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/yourusername/vd-site.git
    cd vd-site
    ```

2. Create a `.env` file in the root directory and add the following environment variables:

    ```env
    DATABASE_NAME=your_database_name
    DATABASE_USER=your_database_user
    DATABASE_PASSWORD=your_database_password
    PORT=your_server_port
    ```

3. Start the application using Docker Compose:

    ```yml
    version: '3.8'

    services:
    db:
        restart: always
        image: postgres:15
        environment:
        POSTGRES_DB: ${DATABASE_NAME}
        POSTGRES_USER: ${DATABASE_USER}
        POSTGRES_PASSWORD: ${DATABASE_PASSWORD}
        ports:
        - "5432:5432"
        volumes:
        - db_data:/var/lib/postgresql/data

    server:
        restart: always
        build:
        context: ./server
        env_file:
        - .env
        ports:
        - "${PORT}:${PORT}"
        depends_on:
        - db
        volumes:
        - ./server:/usr/src/app
        - server_node_modules:/usr/src/app/node_modules

    client:
        restart: always
        build:
        context: ./client/videos-app
        ports:
        - "3001:3001"
        environment:
        - PORT=3001
        volumes:
        - ./client/videos-app:/usr/src/app
        - client_node_modules:/usr/src/app/node_modules

    volumes:
    db_data:
    server_node_modules:
    client_node_modules:
    ```

    ```sh
    docker-compose up --build
    ```

## License

This project is licensed under the MIT License.
