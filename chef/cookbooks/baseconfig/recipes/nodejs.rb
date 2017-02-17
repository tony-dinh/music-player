# Add repository so apt-get can install latest Node (6.X) from NodeSource
execute "add_nodesource_repo" do
  command "curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -"
end

# Install node.js
package "nodejs"

# Install global package dependencies`
execute "npm_install_global" do
  cwd "/home/ubuntu/project/web-app"
  command "sudo npm install -g node-pre-gyp webpack"
end

# Install package dependencies and run npm install
execute "npm_install" do
  cwd "/home/ubuntu/project/web-app"
  command "npm install --no-bin-links"
end

# Post `npm install` commands
execute "build_project" do
  cwd "/home/ubuntu/project/web-app"
  command "npm run install-dep && npm run build"
end

# Populate the DB
execute "populate_db" do
  cwd "/home/ubuntu/project/web-app"
  command "node populateDb.js"
end
