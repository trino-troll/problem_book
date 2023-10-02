FROM node:20

WORKDIR /app

COPY package*.json .
RUN npm ci
COPY . .
ENV APP_PORT=5000
ENV MYSQL_HOST_BOOK='localhost'
ENV MYSQL_USER_BOOK='troll'
ENV MYSQL_PASS_BOOK='pass776'
ENV MYSQL_DATABASE_BOOK='problem_book' 
ENV SECRET_KEY='secret troll secret'
EXPOSE 5000
# RUN npx next telemetry disable

CMD npm run start