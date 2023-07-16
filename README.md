# README
## wizards

---
### in /api
1. >npm init -y
2. >npm install express
3. >npm install sucrase nodemon -D
4. Create nodemon.json:
        
```json
{
    "execMap":{
        "js":"sucrase-node"
    }
}
```

5. Add section scripts in package.json:

``` json
"scripts":{
    "dev":"nodemon src/server.js"
}
```
6. Create a folder /api/src and create file server.js

    - To initiate server in api folder: `npm run dev`

1. npm install kafkajs


---
### in /certifications

1. > npm init -y
2. Create /src folder
   2.1. Create a file index.js
3. > npm install kafkajs

Code Challenge: https://www.youtube.com/watch?v=-H8pD7sMcfo
