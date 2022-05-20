// app.js
App({
    onLaunch() {
        //云开发环境初始化
        wx.cloud.init({
            env: "wangdi-users-1g3wyjfy571b1140"
        })
        //获取openid 并依据数据库自动登录
        let that = this;
        wx.cloud.callFunction({   //这个云函数的作用是获取用户的openid 
            name: "login_getusear_openid",
            success(res) {
                that.globalData.openid = res.result.openid
                wx.cloud.database().collection('login_users').where({  //然后根据openid查询数据库用户信息
                    _openid: res.result.openid
                }).get({
                    success(result) {
                        // console.log(result);
                        if (result.data.length !== 0) {       //如果数据库有用户信息
                            console.log("数据库有信息，将数据库的信息赋值给全局对象");
                            that.globalData.username = result.data[0].nickName
                            that.globalData.uaseheadportrait = result.data[0].avatarUrl
                            that.globalData.userstate = true
                            that.globalData.backgroundMusic=result.data[0].backgroundMusic
                            // 回调
                            if (that.loginCallback) {
                                that.loginCallback(result.data)
                            }

                        } else {                             //如果数据库没有用户信息
                            console.log("数据库没有信息，全局对象赋值为未登录状态");
                            that.globalData.username = '未登录'
                            that.globalData.uaseheadportrait = '../../images/login.png'
                            that.globalData.backgroundMusic=true,
                            that.globalData.userstate = false
                            //未登录状态下播放音乐
                            that.backmusic()
                        }
                    }
                })
            }
        })
    },
    backmusic() {
        console.log('未登录状态下进行播放音乐')
            wx.getBackgroundAudioManager().title = "贴贴 "; // 必须要有一个title，音乐名字
            wx.getBackgroundAudioManager().src = "cloud://wangdi-users-1g3wyjfy571b1140.7761-wangdi-users-1g3wyjfy571b1140-1311648867/mp3/C400004AsmiX0aYdYs.m4a";
            wx.getBackgroundAudioManager().onEnded(() => {
                backmusic(); // 音乐循环播放
            })
    },

    //全局数据
    globalData: {
        userstate: null,
        username: '未登录', //用户姓名
        uaseheadportrait: '../../images/login.png', //用户头像
        openid: null,
        backgroundMusic:null
    }
})