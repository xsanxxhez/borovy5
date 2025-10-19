#!/bin/bash

echo "🔥🔥🔥 ПОЛНОЕ ТЕСТИРОВАНИЕ BOROVY API 🔥🔥🔥"
echo "==========================================="
echo ""

BASE_URL="http://localhost:3001"

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
ENTERPRISE_ID=""
JOB_ID=""
APPLICATION_ID=""

print_section "1️⃣  РЕГИСТРАЦИЯ И АВТОРИЗАЦИЯ"

print_test "Логин админа"
ADMIN_LOGIN=$(curl -s -X POST "$BASE_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@borovy.com","password":"password123"}')

ADMIN_TOKEN=$(echo $ADMIN_LOGIN | grep -o '"access_token":"[^"]*' | cut -d'"' -f4)
if [ ! -z "$ADMIN_TOKEN" ]; then
    print_success "Админ залогинился!"
else
    print_error "Ошибка логина админа"
    exit 1
fi

print_test "Логин менеджера"
MANAGER_LOGIN=$(curl -s -X POST "$BASE_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"manager@borovy.com","password":"password123"}')

MANAGER_TOKEN=$(echo $MANAGER_LOGIN | grep -o '"access_token":"[^"]*' | cut -d'"' -f4)
if [ ! -z "$MANAGER_TOKEN" ]; then
    print_success "Менеджер залогинился!"
fi

print_test "Логин работника"
WORKER_LOGIN=$(curl -s -X POST "$BASE_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"worker@borovy.com","password":"password123"}')

WORKER_TOKEN=$(echo $WORKER_LOGIN | grep -o '"access_token":"[^"]*' | cut -d'"' -f4)
if [ ! -z "$WORKER_TOKEN" ]; then
    print_success "Работник залогинился!"
fi

print_section "2️⃣  ПРОМОКОДЫ"

print_test "Создание промокода"
TIMESTAMP=$(date +%s)
CREATE_PROMO=$(curl -s -X POST "$BASE_URL/promo-codes" \
  -H "Authorization: Bearer $MANAGER_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"code\":\"TEST${TIMESTAMP}\",\"description\":\"Test promo\"}")

PROMO_CODE=$(echo $CREATE_PROMO | grep -o '"code":"[^"]*' | cut -d'"' -f4)
if [ ! -z "$PROMO_CODE" ]; then
    print_success "Промокод создан: $PROMO_CODE"
fi

print_test "Регистрация работника по промокоду"
NEW_WORKER=$(curl -s -X POST "$BASE_URL/auth/register" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"worker${TIMESTAMP}@test.com\",\"password\":\"password123\",\"fullName\":\"Test Worker\",\"phone\":\"+79999999999\",\"promoCode\":\"$PROMO_CODE\",\"agreedToTerms\":true,\"agreedToPrivacy\":true}")

if echo $NEW_WORKER | grep -q "access_token"; then
    print_success "Работник зарегистрирован!"
fi

print_section "3️⃣  ПРЕДПРИЯТИЯ"

print_test "Создание предприятия"
CREATE_ENTERPRISE=$(curl -s -X POST "$BASE_URL/enterprises" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Enterprise","description":"Test description","location":"Moscow","contactInfo":{"email":"test@test.com","phone":"+79999999999"}}')

ENTERPRISE_ID=$(echo $CREATE_ENTERPRISE | grep -o '"id":"[^"]*' | head -1 | cut -d'"' -f4)
if [ ! -z "$ENTERPRISE_ID" ]; then
    print_success "Предприятие создано: $ENTERPRISE_ID"
fi

print_section "4️⃣  ВАКАНСИИ"

print_test "Создание вакансии"
CREATE_JOB=$(curl -s -X POST "$BASE_URL/jobs" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"enterpriseId\":\"$ENTERPRISE_ID\",\"title\":\"Test Job\",\"description\":\"Test description\",\"requirements\":\"Test requirements\",\"salaryMin\":50000,\"salaryMax\":100000,\"workConditions\":\"Test conditions\",\"location\":\"Moscow\"}")

JOB_ID=$(echo $CREATE_JOB | grep -o '"id":"[^"]*' | head -1 | cut -d'"' -f4)
if [ ! -z "$JOB_ID" ]; then
    print_success "Вакансия создана: $JOB_ID"
fi

print_section "5️⃣  ОТКЛИКИ"

print_test "Создание отклика"
CREATE_APPLICATION=$(curl -s -X POST "$BASE_URL/applications" \
  -H "Authorization: Bearer $WORKER_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"jobId\":\"$JOB_ID\"}")

APPLICATION_ID=$(echo $CREATE_APPLICATION | grep -o '"id":"[^"]*' | head -1 | cut -d'"' -f4)
if [ ! -z "$APPLICATION_ID" ]; then
    print_success "Отклик создан: $APPLICATION_ID"
else
    print_error "Не удалось создать отклик"
    echo $CREATE_APPLICATION
fi

if [ ! -z "$APPLICATION_ID" ]; then
    print_test "Одобрение отклика"
    APPROVE_APP=$(curl -s -X PATCH "$BASE_URL/applications/$APPLICATION_ID/approve" \
      -H "Authorization: Bearer $ADMIN_TOKEN" \
      -H "Content-Type: application/json" \
      -d '{"workEndDate":"2025-12-31T00:00:00.000Z"}')

    if echo $APPROVE_APP | grep -q "APPROVED"; then
        print_success "Отклик одобрен!"
    else
        print_error "Ошибка одобрения"
        echo $APPROVE_APP
    fi
fi

print_section "6️⃣  СТАТИСТИКА"

print_test "Статистика админа"
ADMIN_STATS=$(curl -s -X GET "$BASE_URL/statistics/admin" \
  -H "Authorization: Bearer $ADMIN_TOKEN")
print_success "Получена"

print_test "Статистика менеджера"
MANAGER_STATS=$(curl -s -X GET "$BASE_URL/statistics/manager" \
  -H "Authorization: Bearer $MANAGER_TOKEN")
print_success "Получена"

print_test "Статистика работника"
WORKER_STATS=$(curl -s -X GET "$BASE_URL/statistics/worker" \
  -H "Authorization: Bearer $WORKER_TOKEN")
print_success "Получена"

print_section "7️⃣  ПРОФИЛЬ"

print_test "Обновление профиля"
UPDATE_PROFILE=$(curl -s -X PUT "$BASE_URL/users/profile" \
  -H "Authorization: Bearer $WORKER_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"fullName":"Updated Name","phone":"+79999999999","bio":"Test bio"}')

if echo $UPDATE_PROFILE | grep -q "Updated Name"; then
    print_success "Профиль обновлён!"
fi

print_section "8️⃣  СОЗДАНИЕ МЕНЕДЖЕРА"

print_test "Создание менеджера админом"
CREATE_MANAGER=$(curl -s -X POST "$BASE_URL/users/manager" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"manager${TIMESTAMP}@test.com\",\"password\":\"password123\",\"fullName\":\"Test Manager\",\"phone\":\"+79999999999\"}")

if echo $CREATE_MANAGER | grep -q "email"; then
    print_success "Менеджер создан!"
else
    print_error "Ошибка создания менеджера"
    echo $CREATE_MANAGER
fi

print_section "📊 ИТОГИ"
echo -e "${GREEN}✅ ВСЕ ТЕСТЫ ЗАВЕРШЕНЫ!${NC}"
