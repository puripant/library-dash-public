CURRENT_VERSION=$(cat .env | cut -d "=" -f2 | perl -pe 's/^((\d+\.)*)(\d+)(.*)$/$1.($3+1).$4/e')
printf "VITE_APP_VERSION=%s" $CURRENT_VERSION > ./.env

npm run build && firebase deploy
