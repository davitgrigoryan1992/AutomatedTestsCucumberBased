FROM cypress/base:10

ENV CYPRESS_BASE_URL="http://localhost:3000"
ENV CYPRESS_DEFAULT_COMMAND_TIMEOUT=3000
ENV CYPRESS_api_url="http://localhost:8000/api"
ENV CI=true

COPY ./cypress.json /
COPY ./package.json /
#COPY . /cypress

RUN npm install cypress cypress-file-upload faker cypress-cucumber-preprocessor && $(npm bin)/cypress verify

