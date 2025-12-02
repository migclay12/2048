FROM nginx:alpine

COPY ex00/ /usr/share/nginx/html/

EXPOSE 80