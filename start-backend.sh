#!/bin/bash

echo "🔥 BOROVY Backend Launcher 🔥"
echo "=============================="

# Убиваем все процессы на портах 3001
echo "🧹 Очищаем порт 3001..."
lsof -ti:3001 | xargs kill -9 2>/dev/null || true
pkill -f "nest start" 2>/dev/null || true
pkill -f "ts-node" 2>/dev/null || true

sleep 1

# Переходим в backend
cd backend

echo "📦 Проверяем зависимости..."
if [ ! -d "node_modules" ]; then
    echo "📥 Устанавливаем зависимости..."
    npm install
fi

echo "🗄️ Проверяем базу данных..."
npx prisma generate

echo "🚀 Запускаем Backend на порту 3001..."
echo "=============================="
npm run start:dev

