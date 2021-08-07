import http from 'superagent'

export default class UserService {

    constructor() {
        this.baseUrl = this.getBaseUrl()
    }

    login(email, password) {
        const model = {
            user: {
                email: email,
                password: password
            }
        };

        return new Promise((resolve, reject) => {
            http.post(this.baseUrl + '/api/v1/login')
                .send(model)
                .set('Accept', 'application/json')
                .end((error, response) => {

                    if (response.status === 200 || response.status === 201) {
                        const user = JSON.parse(response.text);
                        resolve(user)
                    }
                    else {
                        reject(JSON.parse(response.text))
                    }

                })
        })
    }

    logout() {
        let authToken = window.localStorage.getItem('STARTER_SYSTEM_ID')

        return new Promise((resolve, reject) => {
            http.get(this.baseUrl + '/api/v1/logout')
                .set('x-api-token', authToken)
                .end(function (error, response) {
                    if (response.status === 204) {
                        resolve()
                    } else {
                        reject(response.statusText)
                    }
                })
        })
    }

    getBaseUrl() {
        if (process.env.NODE_ENV === 'development' || window.location.href.indexOf('localhost') > -1) {
            return 'http://localhost:3000'
        }

        let rootUrl = 'example.com'

        if (window.location.hostname.indexOf(rootUrl) > -1 || window.location.hostname.indexOf('ngrok') > -1) {
            return '' // make URLs relative
        }

        return 'https://' + rootUrl
    }

    // current() {
    //     let authToken = webase.model.auth_token
    //
    //     return new Promise((resolve, reject) => {
    //         http.get(this.baseUrl + '/api/v1/users/current.json')
    //             .set('x-api-token', authToken)
    //             .end( (error, response) => {
    //
    //                 if (error) {
    //                     console.log('error')
    //                     console.log(error)
    //                     reject(error)
    //                     return
    //                 }
    //
    //                 if (response.status === 200) {
    //                     const user = JSON.parse(response.text)
    //                     webase.model.user_id = user.id
    //                     webase.model.currentUser = user
    //                     webase.utils.user = new UserUtil(user)
    //                     resolve(user)
    //                 } else {
    //                     reject(response.statusText)
    //                 }
    //             })
    //     })
    // }
}