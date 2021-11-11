# Build step #1: build the React front end
FROM node:16-alpine as build-step
WORKDIR /app
COPY ./Frontend .
RUN yarn install
RUN yarn build

FROM python:3.8-slim-buster
WORKDIR /app
COPY --from=0 /app/dist ./src/dist
COPY ./Backend/requirements.txt requirements.txt
RUN pip3 install -r requirements.txt
COPY ./Backend .
CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0"]