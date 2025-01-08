## API 規格說明
### 登入系統(Auth)
#### 1. 登入(Login)
+ **URL**
    + `POST /api/v1/auth/login`
+ ###### Request
    Body:
    ```json
    {
        "email": "kevin083177@gmail.com",
        "password": "123456",
    }
    ```
+ ###### Response
    - 200
        ```json
        {
            "code": 200,
            "message": "登入成功",
            "body": {
                "user": {
                    "_id": "677cd89255d8cac11cde25d0",
                    "username": "Green_OuO",
                    "email": "kevin083177@gmail.com",
                    "userRole": "admin",
                    "points": 2986,
                    "clicked": 3000
                },
                "token": "token"
            }
        }
        ```
    - 401
        ```json
        {
            "code": 401,
            "message": "帳號或密碼錯誤"
        }
        ```
    - 500
        ```json
        {
            "code": 500,
            "message": "伺服器異常"
        }
        ```
#### 2. 註冊(Register)
+ **URL**
    + `POST /api/v1/auth/register`
+ ###### Request
    Body:
    ```json
    {
        "username": "testUser",
        "password": "123456",
        "email": "testUser@gmail.com",
        "userRole": "user"
    }
    ```
+ ###### Response
    - 200
        ```json
        {
            "code": 200,
            "message": "註冊成功",
            "body": {
                "_id": "677e9d5fd7ac847454a65b9b",
                "username": "testUser",
                "email": "testUser@gmail.com",
                "userRole": "user",
                "points": 0,
                "clicked": 0
            }
        }
        ```
    - 400
        ```json
        {
            "code": 400,
            "message": "缺少必要資料/Username已被使用/Email已被註冊/電子郵件格式錯誤/無效的userRole"
        }
        ```
    - 500
        ```json
        {
            "code": 500,
            "message": "伺服器異常"
        }
        ```
#### 3. 登出(Logout)
+ **URL**
    + `POST /api/v1/auth/logout`
+ ###### Request
    Headers:
    ```json
    {
        "Authorization": "Bearer {token}" 
    }
    ```
+ ###### Response
    - 200
        ```json
        {
            "code": 200,
            "message": "登出成功"
        }
        ```
    - 401
        ```json
        {
            "code": 401,
            "message": "未提供認證資訊"
        }
        ```
    - 500
        ```json
        {
            "code": 500,
            "message": "伺服器異常"
        }
        ```
### 管理員(Admin)
#### 1. 取得所有使用者資訊(getAllUser)
+ **URL**
    + `GET /api/v1/admin/getAllUser`
+ ###### Request
    Headers:
    ```json
    {
        "Authorization": "Bearer {token}" 
    }
    ```
+ ###### Response
    - 200
        ```json
        {
            "code": 200,
            "message": "已找到所有有效用戶積分與點擊次數",
            "body": [
                {
                    "_id": "677e4fff6068412796e8445d",
                    "username": "Amy",
                    "points": 0,
                    "clicked": 0
                },
                {
                    "_id": "677e4eb76068412796e8445a",
                    "username": "Jack",
                    "points": 8000,
                    "clicked": 10000
                },
            ]
        }
        ```
    - 401
        ```json
        {
            "code": 401,
            "message": "未提供認證資訊"
        }
        ```
    - 403
        ```json
        {
            "code": 403,
            "message": "權限不足"
        }
        ```
    - 500
        ```json
        {
            "code": 500,
            "message": "伺服器異常"
        }
        ```
#### 2. 重置使用者分數(resetUserPoints)
+ **URL**
    + `PUT /api/v1/admin/resetUserPoints`
+ ###### Request
    Headers:
    ```json
    {
        "Authorization": "Bearer {token}" 
    }
    ```

    Query:
    ```
        _id=677e4fff6068412796e8445d
    ```

+ ###### Response
    - 200
        ```json
        {
            "code": 200,
            "message": "分數重置成功",
            "body": {
                "_id": "677e50066068412796e8445f",
                "username": "Amy",
                "email": "amy@gmail.com",
                "userRole": "user",
                "points": 0,
                "clicked": 0
            }
        }
        ```
    - 400
        ```json
        {
            "code": 400,
            "message": "缺少必要資料"
        }
        ```
    - 401
        ```json
        {
            "code": 401,
            "message": "未提供認證資訊"
        }
        ```
    - 403
        ```json
        {
            "code": 403,
            "message": "權限不足"
        }
        ```
    - 404
        ```json
        {
            "code": 404,
            "message": "找不到使用者"
        }
        ```
    - 500
        ```json
        {
            "code": 500,
            "message": "伺服器異常"
        }
        ```
#### 3. 刪除使用者帳號(revokeUserById)
+ **URL**
    + `DELETE /api/v1/admin/revokeUserById`
+ ###### Request
    Headers:
    ```json
    {
        "Authorization": "Bearer {token}" 
    }
    ```

    Query:
    ```
        _id=677e4fff6068412796e8445d
    ```
+ ###### Response
    - 200
        ```json
        {
            "code": 200,
            "message": "刪除帳號成功"
        }
        ```
    - 400
        ```json
        {
            "code": 400,
            "message": "缺少必要資料"
        }
        ```
    - 401
        ```json
        {
            "code": 401,
            "message": "未提供認證資訊"
        }
        ```
    - 403
        ```json
        {
            "code": 403,
            "message": "權限不足"
        }
        ```
    - 404
        ```json
        {
            "code": 404,
            "message": "找不到使用者"
        }
        ```
    - 500
        ```json
        {
            "code": 500,
            "message": "伺服器異常"
        }
        ```
### 使用者(User)
#### 1. 取得所有使用分數(getAllUserPoints)
+ **URL**
    + `GET /api/v1/user/getAllUserPoints`
+ ###### Request
    Headers:
    ```json
    {
        "Authorization": "Bearer {token}" 
    }
    ```

    Query:
    ```
        _id=677e4fff6068412796e8445d
    ```
+ ###### Response
    - 200
        ```json
        {
            "code": 200,
            "message": "已找到所有有效用戶積分",
            "body": [
                {
                    "_id": "677d2921fbd97dea2bcceaf1",
                    "username": "huddy",
                    "points": 54452
                },
                {
                    "_id": "677d291bfbd97dea2bcceaee",
                    "username": "cindy1106",
                    "points": 10056
                },
            ]
        }
        ```
    - 500
        ```json
        {
            "code": 500,
            "message": "伺服器異常"
        }
        ```
#### 2. 更新使用者資訊(updateByUserId)
+ **URL**
    + `PUT /api/v1/user/updateByUserId`
+ ###### Request
    Headers:
    ```json
    {
        "Authorization": "Bearer {token}" 
    }
    ```

    Body:
    ```json
        {
            "_id": "677e50066068412796e8445f",
            "username": "amy1234",
            "email": "amy1234@gmail.com"
        }
    ```
+ ###### Response
    - 200
        ```json
        {
            "code": 200,
            "message": "更新資料成功",
            "body": {
                "_id": "677e50066068412796e8445f",
                "username": "amy1234",
                "email": "amy1234@gmail.com",
                "userRole": "user",
                "points": 0,
                "clicked": 0
            }
        }
        ```
    - 304
        ```json
        {
            "code": 304,
            "message": "資料並未有更新"
        }
        ```
    - 400
        ```json
        {
            "code": 400,
            "message": "缺少必要資料"
        }
        ```
    - 401
        ```json
        {
            "code": 401,
            "message": "未提供認證資訊"
        }
        ```
    - 403
        ```json
        {
            "code": 403,
            "message": "權限不足"
        }
        ```
    - 404
        ```json
        {
            "code": 404,
            "message": "找不到使用者"
        }
        ```
    - 500
        ```json
        {
            "code": 500,
            "message": "伺服器異常"
        }
        ```
#### 3. 更新使用者分數(updatePoints)
+ **URL**
    + `PUT /api/v1/user/updatePoints`
+ ###### Request
    Headers:
    ```json
    {
        "Authorization": "Bearer {token}" 
    }
    ```

    Body:
    ```json
        {
            "_id": "677e50066068412796e8445f",
            "points": 20,
            "click": 30,
        }
    ```
+ ###### Response
    - 200
        ```json
        {
            "code": 200,
            "message": "點數更新成功",
            "body": {
                "_id": "677e50066068412796e8445f",
                "username": "amy1234",
                "email": "amy1234@gmail.com",
                "userRole": "user",
                "points": 20,
                "clicked": 30
            }
        }
        ```
    - 400
        ```json
        {
            "code": 400,
            "message": "缺少必要資料"
        }
        ```
    - 401
        ```json
        {
            "code": 401,
            "message": "未提供認證資訊"
        }
    - 403
        ```json
        {
            "code": 403,
            "message": "權限不足"
        }
        ```
    - 404
        ```json
        {
            "code": 404,
            "message": "找不到使用者"
        }
        ```
    - 500
        ```json
        {
            "code": 500,
            "message": "伺服器異常"
        }
        ```
#### 4. 刪除自身帳號(deleteByUserId)
+ **URL**
    + `DELETE /api/v1/user/deleteByUserId`
+ ###### Request
    Headers:
    ```json
    {
        "Authorization": "Bearer {token}" 
    }
    ```

    Body:
    ```json
        {
            "_id": "677e50066068412796e8445f",
            "password": "123456"
        }
    ```
+ ###### Response
    - 200
        ```json
        {
            "code": 200,
            "message": "刪除帳號成功",
        }
        ```
    - 400
        ```json
        {
            "code": 400,
            "message": "缺少必要資料"
        }
        ```
    - 401
        ```json
        {
            "code": 401,
            "message": "未提供認證資訊/密碼錯誤"
        }
    - 403
        ```json
        {
            "code": 403,
            "message": "權限不足"
        }
        ```
    - 404
        ```json
        {
            "code": 404,
            "message": "找不到使用者"
        }
        ```
    - 500
        ```json
        {
            "code": 500,
            "message": "伺服器異常"
        }
        ```
#### 4. 修改密碼(updatePassword)
+ **URL**
    + `POST /api/v1/user/updatePassword`
+ ###### Request
    Headers:
    ```json
    {
        "Authorization": "Bearer {token}" 
    }
    ```

    Body:
    ```json
        {
            "_id": "677e50066068412796e8445f",
            "password": "123456",
            "new_password": "123456789"
        }
    ```
+ ###### Response
    - 200
        ```json
        {
            "code": 200,
            "message": "密碼修改成功",
            "body": {
                "_id": "677e50066068412796e8445f",
                "username": "amy1234",
                "email": "amy1234@gmail.com",
                "userRole": "user",
                "points": 20,
                "clicked": 30
            }
        }
        ```
    - 400
        ```json
        {
            "code": 400,
            "message": "缺少必要資料"
        }
        ```
    - 401
        ```json
        {
            "code": 401,
            "message": "未提供認證資訊/密碼錯誤"
        }
    - 403
        ```json
        {
            "code": 403,
            "message": "權限不足"
        }
        ```
    - 404
        ```json
        {
            "code": 404,
            "message": "找不到使用者"
        }
        ```
    - 500
        ```json
        {
            "code": 500,
            "message": "伺服器異常"
        }
        ```
