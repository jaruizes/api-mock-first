docker build -t json-server .
docker run -p 9000:3000 --name json-server -v $(pwd)/mocks:/data json-server