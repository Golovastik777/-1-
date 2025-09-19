# Инструкция по деплою

## 🌐 Варианты деплоя

### 1. GitHub Pages (Рекомендуется)
1. Загрузите проект в GitHub репозиторий
2. Перейдите в Settings → Pages
3. Выберите Source: Deploy from a branch
4. Выберите main branch и / (root)
5. Сохраните настройки
6. Ваш сайт будет доступен по адресу: `https://username.github.io/repository-name`

### 2. Netlify
1. Перейдите на [netlify.com](https://netlify.com)
2. Зарегистрируйтесь или войдите
3. Нажмите "New site from Git"
4. Подключите GitHub репозиторий
5. Настройки сборки:
   - Build command: (оставить пустым)
   - Publish directory: (оставить пустым или указать корневую папку)
6. Нажмите "Deploy site"

### 3. Vercel
1. Перейдите на [vercel.com](https://vercel.com)
2. Зарегистрируйтесь через GitHub
3. Нажмите "New Project"
4. Импортируйте ваш репозиторий
5. Настройки:
   - Framework Preset: Other
   - Build Command: (оставить пустым)
   - Output Directory: (оставить пустым)
6. Нажмите "Deploy"

### 4. Firebase Hosting
1. Установите Firebase CLI: `npm install -g firebase-tools`
2. Войдите: `firebase login`
3. Инициализируйте проект: `firebase init hosting`
4. Выберите существующий проект или создайте новый
5. Укажите public directory: `.` (текущая папка)
6. Deploy: `firebase deploy`

### 5. Локальный сервер
Для тестирования локально:
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (если установлен)
npx serve .

# PHP
php -S localhost:8000
```

Затем откройте http://localhost:8000

## 📝 Проверка перед деплоем

- [ ] Все файлы загружены в репозиторий
- [ ] README.md содержит описание проекта
- [ ] .gitignore настроен корректно
- [ ] История коммитов отражает процесс разработки
- [ ] Проект работает локально

## 🚀 Рекомендации

1. **GitHub Pages** - самый простой способ для статических сайтов
2. **Netlify** - отличный выбор с автоматическими деплоями
3. **Vercel** - быстрый деплой с хорошей производительностью
4. **Firebase** - если планируете расширение функциональности

Выберите любой удобный для вас способ деплоя!
