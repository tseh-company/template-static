# template-static

Шаблон статического сайта для `<name>.gevorg.space`.

## Что внутри

- `index.html`, `404.html` — стартовая страница.
- `.github/workflows/deploy.yml` — деплой в Object Storage по push в `main`.

## Использование

Не клонируйте напрямую. Создавайте проект через фабрику:

```bash
~/gevorg-space-setup/gevorg-infra/scripts/new-project.sh my-project --type=static
```

Скрипт создаст репо из этого шаблона, проставит секреты, поднимет инфраструктуру (bucket + DNS), и первый push задеплоит `my-project.gevorg.space`.

## Структура

| Что | Куда |
|---|---|
| Статика (репо или `dist/`, `build/`, `public/`) | bucket `<name>.gevorg.space` |
| DNS `<name>.gevorg.space` | CNAME → `<name>.gevorg.space.website.yandexcloud.net` |
| HTTPS | через wildcard `*.gevorg.space` (Yandex CDN/ALB) |

## Сборка

Если у вас есть build-step (например, React/Vite):
- добавьте `npm ci && npm run build` в workflow перед deploy step;
- workflow автоматически возьмёт папку `dist/`, `build/` или `public/`.
