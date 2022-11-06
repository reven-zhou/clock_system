import axios from "axios";
import { reqLogOut } from ".";
// import { useAlert } from "react-alert";


export default function ajax(url, data = {}, type = 'GET') {
    return new Promise((resolve, reject) => {
        let promise;
        /* 注意get参数需要放在配置下面，post要放在上面 */
        // 1. 执行异步ajax请求
        if (type === 'GET') { // 发GET请求
            promise = axios.get(url, {
                headers: { token: JSON.parse(localStorage.getItem('token')) }
            }, { params: data })
        } else { // 发POST请求
            promise = axios.post(url, JSON.stringify(data), {
                headers: {
                    token: JSON.parse(localStorage.getItem('token')),
                    "Content-Type": "application/json",
                }
            });
        }
        // 2. 如果成功了, 调用resolve(value)
        promise.then(response => {
            // if (response.data.msg) {
            //     if (response.data.status) {
            //         alert(response.data.msg);
            //     } else {
            //         alert(response.data.msg);
            //     }
            // }
            resolve(response.data);
            // 3. 如果失败了, 不调用reject(reason), 而是提示异常信息
        }).catch(error => {
            if (error.response.status) {
                if (error.response.status === 504 || error.response.status === 404) {
                    alert('服务器被吃了( ╯□╰ )')
                } else if (error.response.status === 403 || error.response.status === 401) {
                    // alert('权限不足，请联系管理员');
                    
                    localStorage.clear();
                    window.location = '/auth'
                } else {
                    if (error.response.data.msg) {
                        alert(error.response.data.msg)
                    } else {
                        alert('请求出错了: ' + error.message)
                    }
                }
            }
        })
    })
}