1.开发环境&工具
   nodeJs
   mongodb
   WebStorm
2.WebStorm 配置 Grunt
   由于 WebStorm 默认不会实时写入原文件，所以需要："File->Settings IDE Settings->General Synchronizition" 去掉 Use "safe write"
   2.1 install
        说明:导入package.json文件中配置的依赖包
        工具配置:
           webstorm -> file -> settings -> external tools
           name:任意(initGrunt)
           name:任意(install)
           Group:任意(grunt)
           Program:node
           D:\nodejs\node_modules\npm\bin\npm-cli install
           Working directory:$ProjectFileDir$

   2.2 grunt
        说明：grunt 完成项目CSS JS 的合并，混淆，发布等
        工具配置:
           webstorm -> file -> settings -> external tools
           name:任意(initGrunt)
           name:任意(grunt)
           Group:任意(grunt)
           Program:node
           C:\Users\Administrator\AppData\Roaming\npm\node_modules\grunt-cli\bin\grunt
           Working directory:$ProjectFileDir$

   2.3 grunt-watch
        说明: 监听文件的实时修改并自动完成任务
        工具配置:
           webstorm -> file -> settings -> external tools
           name:任意(initGrunt)
           name:任意(install)
           Group:任意(grunt-watch)
           Program:node
           C:\Users\Administrator\AppData\Roaming\npm\node_modules\grunt-cli\bin\grunt watch
           Working directory:$ProjectFileDir$
3.数据
   数据保存在db文件中，使用命令
   'mongorestore -d ThereAreFishes db/ThereAreFishes/*' 恢复到数据库中