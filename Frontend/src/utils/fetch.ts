const api_base = import.meta.env.VITE_API_URL;

/**
 * 執行異步 GET 請求函數
 * @param api - API_URL
 * @param options - 請求配置選項
 * @param {HeadersInit} [options.headers={}] - 可選的請求標頭，預設為空物件
 * @returns {Promise<any>} 返回解析後的 JSON 數據，如果發生錯誤則返回錯誤物件
 * 
 * @example
 * // 基本使用
 * const response = await asyncGet('https://api.example.com/users')
 * 
 * // 使用自定義標頭
 * const response = await asyncGet('https://api.example.com/users', {
 *   headers: {
 *     'Authorization': 'Bearer token'
 *   }
 * })
 * 
 * @throws {Error} 可能在網路請求或 JSON 解析過程中拋出錯誤
 */
export async function asyncGet(api: string, { headers = {} }: {headers?: HeadersInit}):Promise<any>{
    try {
        const res: Response = await fetch(api, {
            headers: {
                'Access-Control-Allow-Origin': api_base,
                'Content-Type': 'application/json',
                ...headers,
            },
        })
        try {
            return await res.json()
        } catch (error) {
            return error
        }
    } catch (error) {
        return error
    }
}

/**
 * 執行異步 POST 請求函數
 * @param api - API_URL
 * @param options - 請求配置選項
 * @param {any} [options.body] - 可選的請求主體，可以是一般物件或 FormData
 * @param {HeadersInit} [options.headers={}] - 可選的請求標頭，預設為空物件
 * @returns {Promise<Response>} 返回原始的 Response 物件
 * @throws {Error} 當請求失敗時拋出錯誤
 * 
 * @example
 * // 更新用戶密碼
 * const response = await asyncPost('https://api.example.com/users/updatePassword', {
 *   headers: {
 *     'Authorization': 'Bearer token'
 *   }
 *   body: {
 *     _id: 'updated id',
 *     password: "old password",
 *     new_password: "new_password"
 *   }
 * });
 */
export async function asyncPost(api: string, { body, headers = {} }: { body?: any, headers?: HeadersInit }): Promise<Response> {
    try {
        const res: Response = await fetch(api, {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': api_base,
                'Content-Type': 'application/json',
                ...headers,
            },
            body: body instanceof FormData ? body : JSON.stringify(body),
            mode: 'cors',
        });
        
        return res;
    } catch (error) {
        console.error('Request failed:', error);
        throw error;
    }
}

/**
 * 執行異步 PUT 請求函數
 * @param api - API_URL
 * @param options - 請求配置選項
 * @param {any} [options.body] - 可選的請求主體，可以是一般物件或 FormData
 * @param {HeadersInit} [options.headers={}] - 可選的請求標頭，預設為空物件
 * @returns {Promise<Response>} 返回原始的 Response 物件
 * @throws {Error} 當請求失敗時拋出錯誤
 * 
 * @example
 * // 更新用戶分數
 * const response = await asyncPut('https://api.example.com/users/updatePoints', {
 *   headers: {
 *     'Authorization': 'Bearer token'
 *   }
 *   body: {
 *     _id: 'updated id',
 *     points: 30,
 *     clicked: 50
 *   }
 * });
 */
export async function asyncPut(api: string, { body, headers = {} }: { body?: any, headers?: HeadersInit }): Promise<Response> {
    try {
        const res: Response = await fetch(api, {
            method: 'PUT',
            headers: {
                'Access-Control-Allow-Origin': api_base,
                'Content-Type': 'application/json',
                ...headers,
            },
            body: body instanceof FormData ? body : JSON.stringify(body),
            mode: 'cors',
        });
        
        return res;
    } catch (error) {
        console.error('Request failed:', error);
        throw error;
    }
}

/**
 * 執行異步 DELETE 請求函數
 * @param api - API_URL
 * @param options - 請求配置選項
 * @param {any} [options.body] - 請求主體，可以是一般物件或 FormData
 * @param {HeadersInit} [options.headers={}] - 可選的請求標頭，預設為空物件
 * @returns {Promise<Response>} 返回原始的 Response 物件
 * @throws {Error} 當請求失敗時拋出錯誤
 * 
 * @example
 * // 刪除用戶帳號
 * const response = await asyncDelete('https://api.example.com/users/deleteByUserId', {
 *   headers: {
 *     'Authorization': 'Bearer token'
 *   }
 *   body: {
 *     _id: 'deleted account id',
 *     password: 'password'
 *   }
 * });
 */
export async function asyncDelete(api: string, { body, headers = {} }: { body?: any, headers?: HeadersInit }): Promise<Response> {
    try {
        const res: Response = await fetch(api, {
            method: 'DELETE',
            headers: {
                'Access-Control-Allow-Origin': api_base,
                'Content-Type': 'application/json',
                ...headers,
            },
            body: body instanceof FormData ? body : JSON.stringify(body),
            mode: 'cors',
        });
        
        return res;
    } catch (error) {
        console.error('Request failed:', error);
        throw error;
    }
}
