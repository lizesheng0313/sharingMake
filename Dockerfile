FROM registry.lanmaoly.com/nginx:1.15.1-alpine-1


COPY dist /usr/share/nginx/html

COPY mysite.template /etc/nginx/conf.d/mysite.template

CMD envsubst '$NGINX_PORT' < /etc/nginx/conf.d/mysite.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'


