#!/bin/bash
set -e

# ==================================================
# CONFIG – CHANGE THESE
# ==================================================
APP_NAME=myapp
DOMAIN=biowave.ir
PORT=3000
REPO_URL=git@github.com:abdollahimostafa/MedimediaChatbot.git
BRANCH=main

APP_ROOT=/var/www/$APP_NAME
CURRENT_DIR=$APP_ROOT/current

# ==================================================
# PRECHECKS
# ==================================================
command -v node >/dev/null || { echo "❌ Node.js not installed"; exit 1; }
command -v pm2  >/dev/null || { echo "❌ PM2 not installed"; exit 1; }
command -v nginx >/dev/null || { echo "❌ Nginx not installed"; exit 1; }

# ==================================================
# APP SETUP
# ==================================================
echo "📁 Creating app structure"
sudo mkdir -p $APP_ROOT/{current,releases,shared}

if [ -d "$CURRENT_DIR/.git" ]; then
  echo "❌ App already exists in $CURRENT_DIR"
  exit 1
fi

echo "📥 Cloning repository"
sudo git clone -b $BRANCH $REPO_URL $CURRENT_DIR
cd $CURRENT_DIR

echo "📦 Installing dependencies"
sudo npm install

echo "🏗️ Building Next.js app"
sudo npm run build

echo "🚀 Starting app with PM2"
sudo pm2 start npm \
  --name "$APP_NAME" \
  -- start \
  -- --port $PORT

sudo pm2 save

# ==================================================
# NGINX CONFIG (ORIGIN)
# ==================================================
NGINX_SITE=/etc/nginx/sites-available/$APP_NAME

echo "🌐 Creating Nginx config"

sudo tee $NGINX_SITE > /dev/null <<EOF
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN;

    location / {
        proxy_pass http://127.0.0.1:$PORT;
        proxy_http_version 1.1;

        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto http;

        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
EOF

echo "🔗 Enabling site"
sudo ln -sf $NGINX_SITE /etc/nginx/sites-enabled/

echo "🧪 Testing Nginx config"
sudo nginx -t

echo "🔄 Reloading Nginx"
sudo systemctl reload nginx

echo "✅ First-time deployment completed successfully!"
echo "➡ App running at http://$DOMAIN (via ArvanCloud)"
