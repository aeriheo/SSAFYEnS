# SSAFY Environment N Schedule
#### 일정 관리 도우미 웹 IoT 서비스

## 목차
1. [Tech Stack](#Tech-Stack)
2. [Feature Description](#Feature-Description)
3. [Database Structure](#Database-Structure)
4. [Getting Started](#Getting-Started)
5. [Contributor](#Contributor)

<br>
<br>

# Tech Stack
## Fronted
<img style="display: inline;" alt="HTML5" src ="https://img.shields.io/badge/html5-%23E34F26.svg?&style=for-the-badge&logo=HTML5&logoColor=white"/><img style="display: inline;" alt="CSS3" src ="https://img.shields.io/badge/CSS3-%231572B6.svg?&style=for-the-badge&logo=css3&logoColor=white"/><img style="display: inline;" alt="javascript" src ="https://img.shields.io/badge/JavaScript-%23F7DF1E.svg?&style=for-the-badge&logo=javascript&logoColor=white"/><img style="display: inline;" alt="react" src ="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=React&logoColor=%2361DAFB"/><img style="display: inline;" alt="meterialui" src ="https://img.shields.io/badge/materialui-%230081CB.svg?style=for-the-badge&logo=material-ui&logoColor=white"/><img style="display: inline;" alt="npm" src ="https://img.shields.io/badge/npm-%23CB3837.svg?&style=for-the-badge&logo=npm&logoColor=white"/><img style="display: inline;" alt="electron" src ="https://img.shields.io/badge/electron-%23a0ebf9.svg?&style=for-the-badge&logo=electron&logoColor=%272a37"/>
- HTML5, CSS3, JavaScript
- [React](https://ko.reactjs.org/)
- [Electron](https://www.electronjs.org/)
- [Material UI](https://mui.com/)
- npm
    - [react-slick](https://www.npmjs.com/package/react-slick)
    - [slick-carousel](https://www.npmjs.com/package/slick-carousel)
    - [axios](https://axios-http.com/kr/docs/intro)
    - [moment](https://momentjs.com/)

## Backend
<img style="display: inline;" alt="javascript" src ="https://img.shields.io/badge/JavaScript-%23F7DF1E.svg?&style=for-the-badge&logo=javascript&logoColor=white"/><img style="display: inline;" alt="jwt" src ="https://img.shields.io/badge/jwt-%23000000.svg?&style=for-the-badge&logo=JSON Web Tokens&logoColor=white"/><img style="display: inline;" alt="mysql" src ="https://img.shields.io/badge/mysql-%234479A1.svg?&style=for-the-badge&logo=mysql&logoColor=white"/><img style="display: inline;" alt="node.js" src ="https://img.shields.io/badge/node.js-%23569A31.svg?&style=for-the-badge&logo=node.js&logoColor=white"/><img style="display: inline;" alt="mariaDB" src ="https://img.shields.io/badge/mariaDB-%23003545.svg?&style=for-the-badge&logo=mariaDB&logoColor=white"/>
- javascript
- [node.js](https://nodejs.org/ko/)
- [JWT](https://jwt.io/)
- [MySQL](https://www.mysql.com/)
- [MariaDB](https://mariadb.org/)

## Embedded
<img style="display: inline;" alt="javascript" src ="https://img.shields.io/badge/JavaScript-%23F7DF1E.svg?&style=for-the-badge&logo=javascript&logoColor=white"/><img style="display: inline;" alt="node.js" src ="https://img.shields.io/badge/node.js-%23569A31.svg?&style=for-the-badge&logo=node.js&logoColor=white"/><img style="display: inline;" alt="electron" src ="https://img.shields.io/badge/electron-%23a0ebf9.svg?&style=for-the-badge&logo=electron&logoColor=%272a37"/><img style="display: inline;" alt="react" src ="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=React&logoColor=%2361DAFB"/><img style="display: inline;" alt="express" src ="https://img.shields.io/badge/express-%23ffffff.svg?style=for-the-badge&logo=express&logoColor=black"/><img style="display: inline;" alt="python" src ="https://img.shields.io/badge/python-%232f6c9d.svg?style=for-the-badge&logo=python&logoColor=white"/><img style="display: inline;" alt="linux" src ="https://img.shields.io/badge/linux-%23edb70d.svg?style=for-the-badge&logo=linux&logoColor=black"/>
- javascript
- [Python](https://www.python.org/)
- [node.js](https://nodejs.org/ko/)
- [Express](https://expressjs.com/ko/)
- [MariaDB](https://mariadb.org/)
- [Linux](https://www.linux.org/)
- [GCP](https://console.cloud.google.com/welcome?project=ssafy-embedded-aeri&hl=ko)
- [OpenCV](https://opencv.org/)


## Deploy
<img style="display: inline;" alt="aws" src ="https://img.shields.io/badge/aws-%23232F3E.svg?&style=for-the-badge&logo=amazon aws&logoColor=white"/><img style="display: inline;" alt="nginx" src ="https://img.shields.io/badge/nginx-%23009639.svg?&style=for-the-badge&logo=nginx&logoColor=white"/>
- [AWS](https://aws.amazon.com/ko/?nc2=h_lg)
- [NginX](https://www.nginx.com/)

<br>
<br>

# Feature Description
## Sign Up/In

|Sign Up            |  Sign In | 
|:-------------------------:|:-------------------------: | 
|![](https://i.imgur.com/Qlv79ZD.png) |  ![](https://i.imgur.com/bVJw9Yt.png)|


## Monthly Schedule
월 별 일정  
<img src="https://i.imgur.com/ZodmtDz.png" width="600">

## Schedule Registration
일정 등록  
<img src="https://i.imgur.com/Dog2INk.png" width="600">

## Daily Schedule
하루 일정 관리  
<img src="https://i.imgur.com/3XeKu6k.png" width="600">

## Group List, My Group
전체 그룹 확인 및 내가 가입한 그룹 확인  
|GROUP LIST         |  MY GROUP | 
|:-------------------------:|:-------------------------: | 
|![](https://i.imgur.com/vtWBR2Z.png)  | ![](https://i.imgur.com/JUiPTmX.png)| 

## Group Information
그룹 소개 및 그룹의 챌린지  
<img src="https://i.imgur.com/tvPLoX5.png" width="600">

## Group Management
그룹 관리 및 그룹 신청 승인  
|GROUP MANAGEMENT      | NEW MEMBER | 
|:-------------------------:|:-------------------------: |
|![](https://i.imgur.com/jF1LADJ.png)|![](https://i.imgur.com/sw4dhLj.png)|

## My Page
정보 수정 및 일정 평가 통계  
|MY PAGE      | SCHEDULE STATISTICS | 
|:-------------------------:|:-------------------------: |
|![](https://i.imgur.com/PjAhrcX.png)|![](https://i.imgur.com/M0lHQ3I.png)|




<br>
<br>



# Database Structure
![](https://github.com/aeriheo/SSAFYEnS/blob/master/docs/ERD.png?raw=true)


<br>
<br>


# Getting Started
## Frontend
```
./frontend
```
```
npm install
```
```
npm start
```
## Backend
```
./backend/src
```
```
npx nodemon index.js
```
## Embedded
```
./embedded
```
```
. ./device_start.sh
```
```
cd frontend_rpi
```
```
npm run electron // Other Terminal
```
<br>
<br>


# Contributor

| **김지환** <a href="https://github.com/Bure5kzam"><img src="https://i.imgur.com/SBDd7pE.png" width="20"></a> <br> Jihwan Kim | **신은지** <a href="https://github.com/devejs"><img src="https://i.imgur.com/SBDd7pE.png" width="20"></a> <br> Eunjee Shin | **이태용** <img src="https://i.imgur.com/SBDd7pE.png" width="20"></a> <br> TaeYong Lee | **장범진** <a href="https://github.com/wony5248"><img src="https://i.imgur.com/SBDd7pE.png" width="20"></a> <br> Beomjin Jang| **허애리** <a href="https://github.com/aeriheo"><img src="https://i.imgur.com/SBDd7pE.png" width="20"></a> <br> Aeri Heo|
| :--------: | :--------: | :--------: | :--------: |:--------: |
|Backend<br>Server|Embedded<br>|Backend<br>|Frontend<br> Scenario|Web Frontend<br> Scenario|
