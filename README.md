# 🚀 BOROVY Platform

Платформа для вахтовиков с системой промокодов и управления откликами.

## 📋 Описание проекта

BOROVY - это платформа для работников вахт ("боровов"), где они могут находить проверенную работу через систему промокодов.

## 🎯 Основные роли

- **Работник (Worker)** - ищет работу на вахте, откликается на вакансии
- **Менеджер (Manager)** - создает промокоды, отслеживает статистику своих работников
- **Администратор (Admin)** - полный контроль над системой

## 💻 Технологический стек

### Backend
- NestJS 10
- PostgreSQL
- Prisma ORM
- JWT Authentication
- Nodemailer

### Frontend
- Next.js 15
- TypeScript
- TailwindCSS
- React 19

## 🚀 Установка и запуск

### Backend
cd backend
npm install
npx prisma generate
npx prisma migrate dev
npm run start:dev

text

### Frontend
cd frontend
npm install
npm run dev

text

## 📁 Структура проекта

borovy5/
├── backend/ # NestJS API
├── frontend/ # Next.js приложение
└── README.md

text
