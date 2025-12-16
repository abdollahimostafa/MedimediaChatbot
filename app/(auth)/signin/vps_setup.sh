#!/bin/bash
set -e

echo "🚀 VPS bootstrap starting..."

# -----------------------------
# Update system
# -----------------------------
echo "🔹 Updating system"
sudo apt update && sudo apt upgrade -y

# -----------------------------
# Minimal required packages
# -----------------------------
echo "🔹 Installing base packages"
sudo apt install -y \
  curl \
  git 

# -----------------------------
# Install latest Node.js (CURRENT)
# -----------------------------
echo "🔹 Installing latest Node.js"

sudo apt remove -y nodejs || true
curl -fsSL https://deb.nodesource.com/setup_current.x | sudo -E bash -
sudo apt install -y nodejs

echo "🔹 Node version:"
node -v
npm -v

# -----------------------------
# PM2
# -----------------------------
echo "🔹 Installing PM2"
sudo npm install -g pm2

pm2 startup systemd -u $USER --hp $HOME
pm2 save

# -----------------------------
# Nginx
# -----------------------------
echo "🔹 Installing Nginx"
sudo apt install -y nginx
sudo systemctl enable nginx
sudo systemctl start nginx

# -----------------------------
# App directory
# -----------------------------
echo "🔹 Preparing /var/www"
sudo mkdir -p /var/www
sudo chown -R $USER:$USER /var/www

echo "✅ VPS setup completed!"
