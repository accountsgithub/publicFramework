FROM 10.65.4.2:5000/dolphin/nginx:1.13
ENV APP_ROOT_PATH /usr/share/nginx/html/
ENV CONFIG_HOT_RELOAD true
ADD dist /usr/share/nginx/html/dolphin-release
RUN mkdir -p /usr/share/nginx/html/dolphin-release/static/
RUN touch /usr/share/nginx/html/dolphin-release/static/_ping
RUN echo "OK" >> /usr/share/nginx/html/dolphin-release/static/_ping
WORKDIR /usr/share/nginx/html
RUN chmod -R 777 ./*
RUN mkdir -p /app_home/bin/
ADD config_generate /app_home/bin/
ADD start.sh /app_home/bin/
RUN chmod +x /app_home/bin/config_generate
RUN chmod +x /app_home/bin/start.sh

CMD bash /app_home/bin/start.sh
