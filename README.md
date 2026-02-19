# GlutInfo

Медицинская информационно-консультативная платформа для пациентов с глютен-ассоциированными заболеваниями.

## Авторы
- [Павел](https://github.com/R1Sen007)
- [Егор](https://github.com/Depays)
- [Григорий](https://github.com/SadForeverAlone)
- [Аркадий](https://github.com/larhatdreen)

## Технологии

### Frontend
- React 18
- Vite
- React Router
- Axios
- CSS Modules
- Многоязычность (Русский/Английский)

### Backend
- FastAPI
- SQLAlchemy
- PostgreSQL
- FastAPI-Users
- FastAPI-Mail
- Alembic

### Infrastructure
- Docker & Docker Compose
- Nginx (Gateway)
- S3 Storage

## Описание

Первая в России медицинская информационно-консультативная платформа для пациентов и консультантов, специализирующаяся на глютен-ассоциированных заболеваниях.

## Быстрый старт

### Режим разработки (с hot reload)
```bash
./dev.sh
```

### Продакшн режим
```bash
docker-compose up --build -d
```

## Доступные сервисы

- **Frontend**: http://localhost:8000
- **Backend API**: http://localhost:8000/api/v1
- **API Documentation**: http://localhost:8000/docs
- **Admin Panel**: http://localhost:8000/admin

## Особенности

- ✅ Полная многоязычность (Русский/Английский)
- ✅ Адаптивный дизайн для всех устройств
- ✅ Мобильное меню с анимациями
- ✅ Hot reload для разработки
- ✅ Docker контейнеризация
- ✅ Современный UI/UX

## Структура проекта

```
GlutInfo/
├── frontend/          # React приложение
├── backend/           # FastAPI сервер
├── gateway/           # Nginx конфигурация
├── docker-compose.yml # Продакшн конфигурация
├── docker-compose.dev.yml # Разработка конфигурация
└── dev.sh            # Скрипт для разработки
```