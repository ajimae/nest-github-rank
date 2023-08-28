FROM alpine

RUN apk add --update nodejs yarn
WORKDIR /home/app

COPY *.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .

EXPOSE 8085

CMD [ "yarn", "start" ]
