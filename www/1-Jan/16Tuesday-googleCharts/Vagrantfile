Vagrant.configure("2") do |config|
  config.vm.box = "yoobeeLAMPBox"

  config.vm.network "private_network", ip: "192.168.33.10"
  config.ssh.insert_key = false
  config.vm.synced_folder "www/", "/var/www/html" , create: true , owner: "www-data", group: "www-data", mount_options: ["dmode=775,fmode=664"]

end
