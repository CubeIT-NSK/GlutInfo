#!/bin/bash

echo "🚀 Запуск проекта в режиме разработки..."

# Останавливаем текущие контейнеры
echo "⏹️  Останавливаем текущие контейнеры..."
docker compose -f docker-compose.dev.yml down --remove-orphans

# Запускаем в режиме разработки
echo "🔄 Запускаем в режиме разработки с hot reload..."
docker compose -f docker-compose.dev.yml up --build

echo "✅ Проект запущен в режиме разработки!"
echo "🌐 Frontend (Vite): http://localhost:5173"
echo "🔧 Gateway: http://localhost:8000"
echo "📚 Backend API Docs: http://localhost:8000/docs"
