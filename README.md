# 💰 Krypto.ro

[Krypto.ro](https://krypto.ro) is a website that provides insights into the cryptocurrency markets. It offers real-time data and analytics to help users make informed decisions about their cryptocurrency investments.

## 🚀 Features

- Real-time cryptocurrency data
- Cryptocurrency analytics and insights
- User-friendly interface

## 📦 Installation

Before running the app, you need to install the necessary dependencies. Navigate to the directory containing the app in your terminal and run the following command:

```bash
yarn install
```
## 🏃‍♀️ Running the App
To run the app, navigate to the directory containing the app in your terminal and run the following command:

```bash
yarn start
```
## 📚 Dependencies
This projects makes use of the CoinGecko Free API with a limitation of 100 requests a day.

## 🚀 Deployment
```bash
 firebase login:ci -> get $FIREBASE_TOKEN
 npm version patch
 ng build --prod
 firebase deploy --token $FIREBASE_TOKEN
 ```
