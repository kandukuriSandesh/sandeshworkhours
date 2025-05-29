const AWS = require('aws-sdk');

const BUCKET_NAME = 'payslipbucketsandesh'

const REGION = 'us-east-1'

const s3 = new AWS.S3({
    region:REGION,
    accessKeyId:process.env.ACCESS_KEY_ID,
    secretAccessKey:process.env.SECRET_ACCESS_KEY
})

exports.handler = async function (event){
    const {passcode,filename} = JSON.parse(event.body);

    if(passcode !== process.env.PAYSLIP_PASS){
        return {
            statusCode:401,
            body:JSON.stringify({message:"Invalid Passcode"})
        }
    }

    const params = {
        Bucket:BUCKET_NAME,
        Key:filename,
        Expires:300
    }

    try{
        const url = await s3.getSignedUrlPromise('getObject',params)
        return {
            statusCode:200,
            body:JSON.stringify({url})
        }
    }catch(err){
        console.log(err)

        return {
            statusCode:500,
            body:JSON.stringify({message:'Error generating URL from AWS'})
        }
    }
}