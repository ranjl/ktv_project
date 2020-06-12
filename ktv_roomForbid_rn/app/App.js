/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @format
 * @flow
**/

// 引入路由组件
import {DrawerNavigator,TabNavigator,StackNavigator} from 'react-navigation'
// 加载动画组件
import StackViewStyleInterpolator from 'react-navigation/src/views/StackView/StackViewStyleInterpolator.js'


// 加载欢迎页面
import Welcome from './pages/Welcome/Welcome.js'

// 加载密码输入组件
import Pwd from './pages/Pwd/Pwd.js'


// 使用中
// 加载使用中的开放页面
import Dispark from './pages/Use/Dispark.js'
// 加载服务人员选择页面
import Select from './pages/Use/Select.js'


// 清洁
// 加载待清洁页面
import Clean from './pages/Clean/Clean.js'


// 设置
// 加载设置页面
import Setindex from './pages/Set/Index.js'
// 加载修改页面
import Amend from './pages/Set/Amend.js'


// 定义路由
const RootStack = StackNavigator(
    {   
        // 欢迎页面
        Welcome: {  
            screen: Welcome,
        },

        // 输入密码
        Pwd: {  
            screen: Pwd,
        },

       
        // 使用中
        Dispark: {
            screen: Dispark,
        },
        Select: {
            screen: Select,
        },

        // 保洁页面
        Clean: {
            screen: Clean,
        },


        // 设置
        Setindex: {
            screen: Setindex,
        },
        Amend: {
            screen: Amend,
        },
    },

    //定义配置
    {
        initialRouteName: 'Welcome', 
        headerMode: 'none', // 头部导航样式
        transitionConfig: () => ({ screenInterpolator: StackViewStyleInterpolator.forHorizontal }),
    }
);


// adb shell input keyevent 82 
// react-native log-android 
// "react-native-filesystem": "^0.1.0",
// "react-native-gesture-handler": "^1.3.0",
// let { width, height } = Dimensions.get('window')


// 导出
export default RootStack


