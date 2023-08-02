FROM python:3.9

# Устанавливаем переменную окружения для Python, чтобы выводить данные в консоль без буферизации
# ENV PYTHONUNBUFFERED 1
RUN mkdir /app
WORKDIR /app
# Устанавливаем зависимости проекта
COPY requirements.txt .
RUN python -m pip install --no-cache-dir --upgrade pip
RUN pip install gunicorn

RUN pip install -r requirements.txt

COPY ./vinsteam /app/
RUN python manage.py collectstatic --no-input
CMD ["gunicorn", "vinsteam.wsgi:application", "--bind", "0:8000" ] 