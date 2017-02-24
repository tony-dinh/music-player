include_recipe "baseconfig::base"
include_recipe "baseconfig::ruby-gems"
include_recipe "baseconfig::nodejs"

# Add a service file for running the music app on startup
cookbook_file "musicapp.service" do
    path "/etc/systemd/system/musicapp.service"
end

# Start the music app
execute "start_musicapp" do
    command "sudo systemctl start musicapp"
end

# Start music app on VM startup
execute "startup_musicapp" do
    command "sudo systemctl enable musicapp"
end
