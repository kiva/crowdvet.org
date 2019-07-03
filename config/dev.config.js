// Example dev.js config
module.exports = {
    googleClientID: "YOUR GOOGLE APP ID",
    googleClientSecret: "YOUR GOOGLE CLIENT SECRET",
    cookieKey: "123123123",
    accessKeyId: "YOUR AWS s3 datastore access key",
    secretAccessKey: "YOUR AWS s3 datastore secret",
    API_KEY: "the JOT FORM api key",
    EMAIL: "crowdvet@kiva.com",
    APP_URL_BASE: "localhost:3000",
    database: "crowdvet",
    username: "",
    password: "",
    SMTP_URL: "a smtp url to test email locally",
    jwtSecret: "MySecret",
    BUCKET_NAME: "crowdvet-store", //You need to create a bucket store for testing
    BUCKET_URL: "https://s3-us-west-1.amazonaws.com/",
    params: {
        dialect: "sqlite",
        storage: "crowdvet.sqlite",
        define: {
            underscored: true
        }
    }
};
