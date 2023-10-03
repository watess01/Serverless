FROM amazon/dynamodb-local:1.18.0

WORKDIR /home/dynamodblocal

RUN mkdir ./db && chown -R 1000 ./db

CMD ["-jar", "DynamoDBLocal.jar", "-dbPath", "./db", "-sharedDb"]
VOLUME ["./db"]