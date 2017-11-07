var qiniu = require("qiniu");
class SiguoyaQiniu{
    constructor(ACCESS_KEY,SECRET_KEY,bucket){
        this.bucket=bucket
        this.initAuth(ACCESS_KEY,SECRET_KEY)
        this.initConfig()
        this.initFormUploader()
        this.initBucketManager()
    }
    initAuth(ACCESS_KEY,SECRET_KEY){
        this.mac = new qiniu.auth.digest.Mac(ACCESS_KEY, SECRET_KEY);
    }
    initConfig(){
        this.config = new qiniu.conf.Config();
    }
    initFormUploader(){
        this.formUploader = new qiniu.form_up.FormUploader(this.config);
    }
    initBucketManager(){
        this.bucketManager=new qiniu.rs.BucketManager(this.mac, this.config);
    }
    getToken(key){
        var scope=this.bucket
        if(key){
            scope=this.bucket+':'+key
        }
        var options={
            scope,
            returnBody:'{"key":$(key),"ext":$(ext),"filename": $(fname), "filesize": $(fsize), "fileinfo" : $(imageInfo),"bucket":$(bucket),"etag":$(etag),"avinfo":$(avinfo)}'
        }
        var putPolicy = new qiniu.rs.PutPolicy(options);
        var token = putPolicy.uploadToken(this.mac);
        return token;
    }
    ifExistFile(key,callback){
        this.bucketManager.stat(this.bucket, key, function(err, respBody, respInfo) {
            if (err) {
                console.log(err);
            } else {
                if (respInfo.statusCode == 200) {
                    console.log('文件已存在：',key);
                    return ;
                } else if(respInfo.statusCode==612){
                    callback();
                }else {
                    console.log(key,respBody)
                    return;
                }
            }
        });
    }

    /**
     * 文件上传
     * @param localFile
     * @param key 如果为空，则七牛会自动以hash值来对文件进行命名
     */
    uploadFile(localFile,key=''){
        this.ifExistFile(key,this.uploadNewFile.bind(this,localFile,key))
    }
    uploadNewFile(localFile,key){
        var extra = new qiniu.form_up.PutExtra();
        var uptoken=this.getToken(key);
        this.formUploader.putFile(uptoken, key, localFile, extra, function(err, ret) {
            if(!err) {
                console.log('上传成功:',ret['key']);
            } else {
                console.log('上传失败:',err);
            }
        });
    }
}
module.exports=SiguoyaQiniu