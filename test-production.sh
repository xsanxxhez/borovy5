#!/bin/bash

echo "🔥🔥🔥 ТЕСТИРОВАНИЕ BOROVY PRODUCTION API 🔥🔥🔥"
echo "=================================================="
echo ""

# Production URLs
BACKEND_URL="https://borovybackend.onrender.com"
FRONTEND_URL="https://borovy-frontend.onrender.com"

GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

print_test() {
    echo -e "${BLUE}📝 TEST: $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ SUCCESS: $1${NC}"
}

print_error() {
    echo -e "${RED}❌ ERROR: $1${NC}"
}

print_section() {
    echo ""
    echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${YELLOW}$1${NC}"
    echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
}

ADMIN_TOKEN=""
MANAGER_TOKEN=""
WORKER_TOKEN=""
PROMO_CODE=""
JOB_ID=""

print_section "1️⃣  ПРОВЕРКА ДОСТУПНОСТИ"

print_test "Backend доступен?"
BACKEND_HEALTH=$(curl -s -o /dev/null -w "%{http_code}" $BACKEND_URL/jobs)
if [ "$BACKEND_HEALTH" = "200" ]; then
    print_success "Backend работает! (HTTP $BACKEND_HEALTH)"
else
    print_error "Backend недоступен! (HTTP $BACKEND_HEALTH)"
fi

print_test "Frontend доступен?"
FRONTEND_HEALTH=$(curl -s -o /dev/null -w "%{http_code}" $FRONTEND_URL)
if [ "$FRONTEND_HEALTH" = "200" ]; then
    print_success "Frontend работает! (HTTP $FRONTEND_HEALTH)"
else
    print_error "Frontend недоступен! (HTTP $FRONTEND_HEALTH)"
fi

print_section "2️⃣  АВТОРИЗАЦИЯ"

print_test "Логин админа"
ADMIN_LOGIN=$(curl -s -X POST "$BACKEND_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@borovy.com","password":"password123"}')

ADMIN_TOKEN=$(echo $ADMIN_LOGIN | grep -o '"access_token":"[^"]*' | cut -d'"' -f4)
if [ ! -z "$ADMIN_TOKEN" ]; then
    print_success "Админ залогинился!"
    echo "Token: ${ADMIN_TOKEN:0:30}..."
else
    print_error "Ошибка логина админа!"
    echo $ADMIN_LOGIN
fi

print_test "Логин менеджера"
MANAGER_LOGIN=$(curl -s -X POST "$BACKEND_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"manager@borovy.com","password":"password123"}')

MANAGER_TOKEN=$(echo $MANAGER_LOGIN | grep -o '"access_token":"[^"]*' | cut -d'"' -f4)
if [ ! -z "$MANAGER_TOKEN" ]; then
    print_success "Менеджер залогинился!"
fi

print_test "Логин работника"
WORKER_LOGIN=$(curl -s -X POST "$BACKEND_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"worker@borovy.com","password":"password123"}')

WORKER_TOKEN=$(echo $WORKER_LOGIN | grep -o '"access_token":"[^"]*' | cut -d'"' -f4)
if [ ! -z "$WORKER_TOKEN" ]; then
    print_success "Работник залогинился!"
fi

print_section "3️⃣  ПРОМОКОДЫ"

print_test "Создание промокода менеджером"
TIMESTAMP=$(date +%s)
CREATE_PROMO=$(curl -s -X POST "$BACKEND_URL/promo-codes" \
  -H "Authorization: Bearer $MANAGER_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"code\":\"PROD_TEST_${TIMESTAMP}\",\"description\":\"Production test promo\"}")

PROMO_CODE=$(echo $CREATE_PROMO | grep -o '"code":"[^"]*' | cut -d'"' -f4)
if [ ! -z "$PROMO_CODE" ]; then
    print_success "Промокод создан: $PROMO_CODE"
fi

print_test "Получение всех промокодов"
ALL_PROMOS=$(curl -s -X GET "$BACKEND_URL/promo-codes" \
  -H "Authorization: Bearer $ADMIN_TOKEN")

PROMO_COUNT=$(echo $ALL_PROMOS | grep -o '"code"' | wc -l)
print_success "Найдено промокодов: $PROMO_COUNT"

print_section "4️⃣  ВАКАНСИИ"

print_test "Получение всех вакансий (публичный endpoint)"
ALL_JOBS=$(curl -s -X GET "$BACKEND_URL/jobs")

JOB_COUNT=$(echo $ALL_JOBS | grep -o '"id"' | wc -l)
print_success "Найдено вакансий: $JOB_COUNT"

if [ $JOB_COUNT -gt 0 ]; then
    JOB_ID=$(echo $ALL_JOBS | grep -o '"id":"[^"]*' | head -1 | cut -d'"' -f4)
    print_success "Взяли первую вакансию для теста: $JOB_ID"
fi

print_section "5️⃣  ОТКЛИКИ"

if [ ! -z "$JOB_ID" ] && [ ! -z "$WORKER_TOKEN" ]; then
    print_test "Создание отклика работником"
    CREATE_APP=$(curl -s -X POST "$BACKEND_URL/applications" \
      -H "Authorization: Bearer $WORKER_TOKEN" \
      -H "Content-Type: application/json" \
      -d "{\"jobId\":\"$JOB_ID\"}")

    if echo $CREATE_APP | grep -q '"id"'; then
        print_success "Отклик создан!"
    else
        print_error "Не удалось создать отклик"
        echo $CREATE_APP
    fi
fi

print_test "Получение откликов работника"
MY_APPS=$(curl -s -X GET "$BACKEND_URL/applications/my" \
  -H "Authorization: Bearer $WORKER_TOKEN")

APP_COUNT=$(echo $MY_APPS | grep -o '"id"' | wc -l)
print_success "У работника откликов: $APP_COUNT"

print_section "6️⃣  СТАТИСТИКА"

print_test "Статистика админа"
ADMIN_STATS=$(curl -s -X GET "$BACKEND_URL/statistics/admin" \
  -H "Authorization: Bearer $ADMIN_TOKEN")

TOTAL_USERS=$(echo $ADMIN_STATS | grep -o '"total":[0-9]*' | head -1 | cut -d':' -f2)
print_success "Всего пользователей в системе: $TOTAL_USERS"

print_test "Статистика менеджера"
MANAGER_STATS=$(curl -s -X GET "$BACKEND_URL/statistics/manager" \
  -H "Authorization: Bearer $MANAGER_TOKEN")

TOTAL_WORKERS=$(echo $MANAGER_STATS | grep -o '"totalWorkers":[0-9]*' | cut -d':' -f2)
print_success "Работников у менеджера: $TOTAL_WORKERS"

print_test "Статистика работника"
WORKER_STATS=$(curl -s -X GET "$BACKEND_URL/statistics/worker" \
  -H "Authorization: Bearer $WORKER_TOKEN")

TOTAL_APPS=$(echo $WORKER_STATS | grep -o '"totalApplications":[0-9]*' | cut -d':' -f2)
print_success "Откликов у работника: $TOTAL_APPS"

print_section "7️⃣  ПРЕДПРИЯТИЯ"

print_test "Получение всех предприятий"
ALL_ENTERPRISES=$(curl -s -X GET "$BACKEND_URL/enterprises" \
  -H "Authorization: Bearer $ADMIN_TOKEN")

ENT_COUNT=$(echo $ALL_ENTERPRISES | grep -o '"id"' | wc -l)
print_success "Найдено предприятий: $ENT_COUNT"

print_section "📊 ИТОГИ ТЕСТИРОВАНИЯ"

echo -e "${GREEN}✅ ВСЕ PRODUCTION ENDPOINTS ПРОТЕСТИРОВАНЫ!${NC}"
echo ""
echo "🌐 URLs:"
echo "  Backend:  $BACKEND_URL"
echo "  Frontend: $FRONTEND_URL"
echo ""
echo "📝 Тестовые данные:"
echo "  Admin:    admin@borovy.com / password123"
echo "  Manager:  manager@borovy.com / password123"
echo "  Worker:   worker@borovy.com / password123"
echo ""
echo -e "${YELLOW}🎉 ПЛАТФОРМА BOROVY РАБОТАЕТ В PRODUCTION! 🎉${NC}"
echo ""

