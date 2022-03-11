# Download stock firmware

```sh
wget https://builder.dontvacuum.me/pkg/firmwares/roborock/roborock.vacuum.s5/3.5.8_002034/v11_002034.fullos.55915876-2190-407a-9fcb-f1e760d9b623.pkg
```

# Download Valetudo

```sh
git https://github.com/Hypfer/Valetudo.git
cd Valetudo
git checkout 2022.03.1
wget https://github.com/Hypfer/Valetudo/releases/download/2022.03.1/valetudo-armv7 -O valetudo
```

# Build Image

```sh
git clone https://github.com/zvldz/vacuum.git
cd vacuum
nix-shell -p libguestfs ccrpypt
sudo ./builder_vacuum.sh --run-custom-script=ALL \
                         --timezone=Europe/Paris \
                         --ntpserver=pool.ntp.org \
                         --public-key=$HOME/.ssh/id_rsa.pub \
                         --enable-greeting \
                         --disable-logs \
                         --replace-adbd \
                         --valetudo-path=../Valetudo \
                         --replace-miio \
                         --enable-dns-catcher \
                         --fix-reset \
                         --resize-root-fs=522240 \
                         --hostname=rob \
                         --enable-local-ota \
                         -f v11_002034.fullos.55915876-2190-407a-9fcb-f1e760d9b623.pkg
```

# Flash

Use python-mirobo

```sh
sudo systemctl stop firewall
# mirobo pick the ip of vboxnet0 interface so we remove it
sudo VBoxManage hostonlyif remove vboxnet0 
mirobo --ip $IP --token $TOKEN update-firmware output/vacuum_2034_valetudo_UNK.pkg  
```
