FROM node:18-alpine

WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm ci

# Копируем исходный код
COPY . .

# Собираем приложение
RUN npm run build

# Создаем папку для статики
RUN mkdir -p /static

# Копируем собранные файлы в папку static
CMD ["sh", "-c", "cp -r /app/dist/. /static/ && tail -f /dev/null"]