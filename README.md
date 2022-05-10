<div align='center'>    
    <br/>
    <br/>
    <img src='./src/constants/icons/logo.svg' alt='ikinci-el-logo' width='250px' />
</div>

<br/>
<br/>

## Description

E-commerce application built with React.js, Axios, Context Api, Formik, Yup and SASS for the frontend; [Swagger API](https://bootcamp.akbolat.net/documentation/v1.0.0#/) for the backend. And we used Docker for containerization of the application. We triggered the GitHub Actions build process by pushing the code to the GitHub repository. Used DockerHub as container registry to push our Docker images. We used AWS CloudFormation as the Infrastructure as Code solution for deployment the application on AWS EC2 instance.

You can access the live demo from the link here: [ <b> Live Demo</b> ](https://protein-patika-graduation-burak-caniklioglu.netlify.app/)

## Content

- [About](#about)
- [Used Packages And Modules](#used-packages-and-modules)
- [Installation](#installation)
- [Previews](#previews)
- [App Performance](#app-performance)
  <br>

## About

- Second Hand Project is an e-commerce site that provides its users with the functionality to add, buy and sell products.

- Users can directly purchase the products, as well as bid on the products that are open to offers, or open the products they own to offer.

- In the bidding section, the highest bid was taken into consideration. If the seller approves the offer, the product becomes cannot be offered. In this way, the product is sold to the person with the direct price or the highest offer.

- If the seller rejects the highest bid, the product offer is shown as rejected in the vendor panel unless there is a higher bid than it. The purpose here is interpreted as the seller expects a higher offer.

- The product owner cannot buy or bid on her/his own product.

- If you already have an account, you can log in or use the site by registering.

- The application is designed for web and mobile. All UI designs are responsive.

## Used Packages And Modules

- React JS
- Context Api
- Axios
- Js-cookie
- Airbnb Eslint
- SASS
- Formik
- Yup
- Ant Design Upload
- Toastify
- Cypress
- Netlify

## Installation

- First, clone the project:

  ```
  git clone https://github.com/infraform/react-e-commerce-project.git
  ```

- Install dependencies with npm

  ```
  npm install
  ```

- or install dependencies with yarn

  ```
  yarn install
  ```

- Start the project on localhost port: 3000 with using npm or yarn

  ```
  npm start
  ```

  ```
  yarn start
  ```

- Test the project by running Cypress tests and clicking `ikinciElLoginRegister.test.js`

  ```
  yarn run cypress open
  ```

# Previews

<center>

## Web - Login Page

<img src='previews/login-page.webp' />

## Web - Register Page

<img src='previews/register-page.webp' />

## Web - Main Page

<img src='previews/main-page.webp' />

## Web - Detail Page

<img src='previews/detail-page.webp' />

## Web - Add Product Page

<img src='previews/add-product-page.webp' />

## Web - Account Page

<img src='previews/account-page.webp' />

## Mobile

<p align="center">
    <img src="previews/login-mobile.webp" alt="mobile-prew" width="220"/>
    <img src="previews/register-mobile.webp" alt="mobile-prew" width="220"/>
    <img src="previews/main-mobile.webp" alt="mobile-prew" width="220"/>
    <img src="previews/detay-mobile.webp" alt="mobile-prew" width="220"/>
    <img src="previews/addProduct-mobile.webp" alt="mobile-prew" width="220"/>
    <img src="previews/account-mobile.webp" alt="mobile-prew" width="220"/>
</p>
</center>

<br>
<br>

# App Performance

## Web

<p align="center">

  <img src="previews/web-performance.PNG" alt="mobile-prew" width="660"/>
</p>

## Mobile

<p align="center">

  <img src="previews/mobile-performance.PNG" alt="mobile-prew" width="660"/>
</p>
