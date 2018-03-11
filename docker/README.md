# react-vr-pano-switch

Simple 360° panorama picture viewer.

## Usage

### Basic usage

1. `$ docker run --rm -it -p 8080:8080 hankei6km/react-vr-pano-switch:latest`
1. open browser at `http://localhost:8080/` 

### Customize

1. Save your 360° panorama pictures to `./panos/0[1-4].jpg`(it is not support to correct picture size automatically).
1. `$ docker run --rm -it -p 8080:8080 -v "${PWD}"/panos:/opt/react-vr-pano-switch/static_assets/panos hankei6km/react-vr-pano-switch:latest`
1. open browser at `http://localhost:8080/` 

## Credits

* `pano01.jpg`: [Welcome to "Akihabara DENKIGAI" by heiwa4126](https://flic.kr/p/Hod1q)
* `pano02.jpg`: [All trains are long by heiwa4126](https://flic.kr/p/4Y45Hz)
* `pano03.jpg`: [Alcatraz 360° by Stig Nygaard](https://flic.kr/p/DyaSQ7)
* `pano04.jpg`: [Copenhagen Botanical Garden (1) 360° by Stig Nygaard](https://flic.kr/p/QgEo4E)

## License

Copyright (c) 2018 hankei6km

Licensed under the MIT License. See LICENSE.txt in the project root.
