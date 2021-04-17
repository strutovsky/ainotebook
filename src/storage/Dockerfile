FROM tiangolo/uwsgi-nginx:python3.8

COPY nginx.conf /etc/nginx/nginx.conf

WORKDIR /app/static/

RUN mkdir profiles

WORKDIR /app

COPY . .

RUN python3 -m pip install --upgrade pip && python3 -m pip install -r requirements.txt

RUN chmod +x script.sh

EXPOSE 80