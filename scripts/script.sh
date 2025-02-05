export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
nvm use 22

export PATH=$HOME/.nvm/versions/node/v22.13.1/bin:$PATH

cd ~/htdocs/www.weraw.fr
git pull origin main
cd app
pnpm install
pnpm build
cd build
pnpm i -P

cat > .env << 'EOL'
${{ secrets.ENV_CONTENT }}
EOL

node ace migration:run --force
pm2 restart ./bin/server.js